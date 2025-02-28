import argparse
import re
import shutil
from collections import defaultdict
from pathlib import Path

import odt2docx
import pandas as pd
from docx_contents import process_docx
from docx_utils import get_docx_stats
from file_info import FileInfo


def find_files(folder_path: str) -> list[FileInfo]:
    return [
        FileInfo(path=file_path.resolve())
        for file_path in Path(folder_path).rglob("*")
        if file_path.is_file()
    ]


def check_depth(folder_path: str, max_depth: int = 1):
    for file_path in Path(folder_path).rglob("*"):
        if (
            file_path.is_file()
            and len(file_path.relative_to(folder_path).parts) - 1 > max_depth
        ):
            msg = f"Folder tree depth exceeds the maximum allowed depth of {max_depth}"
            raise ValueError(msg)


def check_stats(stats):
    EXPECTED_STATS = {".docx": 72, ".odt": 5, ".pdf": 1, ".ods": 1, ".db": 1}
    if stats != EXPECTED_STATS:
        msg = f"Actual count of files {stats} if different than the expected {EXPECTED_STATS}"
        raise ValueError(msg)


def calculate_stats(files: list[FileInfo]):
    extension_count = defaultdict(int)
    for file in files:
        extension_count[file.extension] += 1

    return extension_count


def print_stats(stats):
    print(f"Total number of files: {sum(stats.values())}")
    print("Count of files per extension:")
    for ext, count in stats.items():
        print(f"{ext}: {count}")


def convert_odt_files(files: list[FileInfo]):
    odt_files = [file for file in files if file.extension == ".odt"]

    if Path("/tmp/odt_files").exists():
        shutil.rmtree("/tmp/odt_files")

    odt2docx.call([f.path for f in odt_files], "/tmp/odt_files")
    for f in odt_files:
        Path(f"/tmp/odt_files/{f.parent_folder_name}/{f.folder_name}").mkdir(
            parents=True, exist_ok=True
        )
        shutil.move(
            f"/tmp/odt_files/{f.name_without_extension}.docx",
            f"/tmp/odt_files/{f.parent_folder_name}/{f.folder_name}",
        )

    return find_files("/tmp/odt_files")


def normalize_keywords(text):
    if not text:
        return None
    text = text.lower()
    # Replace ',' and '.' with a common delimiter
    text = re.sub(r"\s*[,.]\s*", ";", text)
    keywords = [keyword.strip() for keyword in text.split(";") if keyword]
    keywords = sorted(set(keywords))
    return "; ".join(keywords)


def count_and_print_keywords(df: pd.DataFrame, column_name: str) -> pd.DataFrame:
    # Count the number of times each individual keyword appears in "categoria_icarto"
    keyword_counts = defaultdict(int)
    for keywords in df[column_name]:
        if not keywords:
            continue
        for keyword in keywords.split("; "):
            keyword_counts[keyword] += 1

    # print(f"Count of individual keywords in '{column_name}':")
    # for keyword, count in keyword_counts.items():
    #     print(f"{keyword}: {count}")

    return pd.DataFrame(list(keyword_counts.items()), columns=["Keyword", "Count"])


def count_and_print_column(df: pd.DataFrame, column_name: str) -> pd.DataFrame:
    result = df[column_name].value_counts(dropna=False).reset_index()
    # print(f"Count of values in column '{column_name}':")
    # print(result)
    result.columns = ["value", "value_count"]

    return result


def count_na_values(df: pd.DataFrame) -> pd.DataFrame:
    na_counts = df.isna().sum().reset_index()
    na_counts.columns = ["Column", "NA Count"]
    # print(na_counts)
    return na_counts


def count_rows_grouped_by_filename_and_tipo(df: pd.DataFrame) -> pd.DataFrame:
    grouped_df = df.groupby(["FILENAME", "TIPO"]).size().reset_index(name="Count")
    totals = grouped_df.groupby("FILENAME")["Count"].sum().reset_index(name="Total")
    result = grouped_df.merge(totals, on="FILENAME")
    # mean = grouped_df.groupby("FILENAME")["Count"].mean().reset_index(name="Mean")
    # result = result.merge(mean, on="FILENAME")
    # mean = grouped_df.groupby("FILENAME")["Count"].median().reset_index(name="Median")
    # result = result.merge(mean, on="FILENAME")
    return result


def main():
    parser = argparse.ArgumentParser(
        description="Find all files in a folder recursively."
    )
    parser.add_argument("folder_path", type=str, help="Path to the folder")
    args = parser.parse_args()

    check_depth(args.folder_path)
    files = find_files(args.folder_path)
    stats = calculate_stats(files)
    # check_stats(stats)
    print_stats(stats)

    odt_files = convert_odt_files(files)
    files.extend(odt_files)

    docx_files = [file for file in files if file.extension == ".docx"]
    for doc in docx_files:
        docx_stats = get_docx_stats(doc.path)
        if (
            docx_stats["num_images"] != 0
            or docx_stats["num_sections"] != 1
            or docx_stats["num_tables"] != 2
            or docx_stats["num_paragraphs_not_empty"] != 2
        ):
            print("/".join(doc.path.parts[-2:]))
            print(docx_stats)

    df = pd.DataFrame()
    for doc in docx_files:
        docx_stats = get_docx_stats(doc.path)
        print("/".join(doc.path.parts[-2:]))
        print(docx_stats)
        df = pd.concat([df, process_docx(doc.path)], ignore_index=True)

    print(df)
    print(df.shape)

    # Apply the normalization function to the columns and create a new column
    df["categoria_icarto"] = df.apply(
        lambda row: normalize_keywords(row["CATEGORIAS / DESCRIPCIÓN"]), axis=1
    )
    df["ambito_icarto"] = df.apply(
        lambda row: normalize_keywords(row["ÁMBITO"]), axis=1
    )

    df["categoria_y_ambito_icarto"] = df.apply(
        lambda row: normalize_keywords(
            f"{row['ÁMBITO']} {row['CATEGORIAS / DESCRIPCIÓN']}"
        ),
        axis=1,
    )

    with pd.ExcelWriter("/tmp/output_normalized.xlsx") as writer:
        pd.DataFrame(
            (
                ("POIs", "El listado completo de POIs"),
                (
                    "categoria_icarto",
                    "Conteo de la columna categoría tras haber sido procesada",
                ),
                (
                    "ambito_icarto",
                    "Conteo de la columna ámbito tras haber sido procesada",
                ),
                (
                    "categoria_y_ambito_icarto",
                    "Conteo de las columnas categoría y ámbito unidas tras haber sido procesadas",
                ),
                ("DIRIGIDO  A", "Conteo de esta columna"),
                (
                    "NA Values",
                    "Conteo de los valores en blanco para cada columna de los POIs",
                ),
                ("Rows per File and Tipo", "Número de POIs por fichero"),
                (
                    "Proveedores Categorías",
                    "Posibles categorías en base a varios proveedores",
                ),
            ),
            columns=("Hoja", "Descripción"),
        ).to_excel(writer, sheet_name="Descripción", index=False)

        df.to_excel(writer, sheet_name="POIs", index=False)

        for column in (
            "categoria_icarto",
            "ambito_icarto",
            "categoria_y_ambito_icarto",
        ):
            count_and_print_keywords(df, column).to_excel(
                writer, sheet_name=column, index=False
            )

        for column in ("DIRIGIDO A",):
            count_and_print_column(df, column).to_excel(
                writer, sheet_name=column, index=False
            )
        count_na_values(df).to_excel(writer, sheet_name="NA Values", index=False)
        count_rows_grouped_by_filename_and_tipo(df).to_excel(
            writer, sheet_name="Rows per File and Tipo", index=False
        )
        pd.read_excel("../.cache/fixtures/proveedores_categorias.xlsx").to_excel(
            writer, sheet_name="Proveedores Categorías", index=False
        )


if __name__ == "__main__":
    main()
