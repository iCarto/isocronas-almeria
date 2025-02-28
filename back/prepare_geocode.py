import pandas as pd
from utils import (
    check_column_ends_with_another,
    check_sufix,
    remove_columns_ends_with_another,
    remove_sufix,
    remove_trailing_commas,
    remove_trailing_dots,
)


def review_stats(title, stats, golden_stats):
    print(title, stats)
    if stats != golden_stats:
        raise ValueError(f"Stats are not the same: {stats} != {golden_stats}")


def analyze_ends_with_almeria(df: pd.DataFrame) -> pd.DataFrame:
    almeria_sufixes = ("almería", "almeria", "(almeria)", "(almería)", "amería", "alme")
    golden_stats = {
        "total_rows": 4907,
        "rows_withtout_value": 52,
        "ends_with_sufix": 4512,
        "not_ends_with_sufix": 395,
        "suffixes": almeria_sufixes,
    }

    stats, not_ends_with_almeria_values = check_sufix(df, "address", almeria_sufixes)
    review_stats("analyze_ends_with_almeria", stats, golden_stats)
    print("Values of rows that do not end with 'Almería':")
    # print("\n".join(not_ends_with_almeria_values))

    df["processed_address"] = remove_sufix(df, "address", almeria_sufixes)
    stats, _ = check_sufix(df, "processed_address", almeria_sufixes)
    print(stats)
    df["processed_address"] = df["processed_address"].apply(remove_trailing_dots)
    df["processed_address"] = df["processed_address"].apply(remove_trailing_commas)
    return df


def analyze_ends_with_municipality(df: pd.DataFrame) -> pd.DataFrame:
    golden_stats = {
        "total_rows": 4907,
        "rows_withtout_value": 52,
        "ends_with_sufix": 4186,
        "not_ends_with_sufix": 721,
    }

    stats, extra_data = check_column_ends_with_another(
        df, "processed_address", "municipality"
    )
    review_stats("analyze_ends_with_municipality", stats, golden_stats)

    df["processed_address2"] = remove_columns_ends_with_another(
        df, "processed_address", "municipality"
    )["processed_address"]
    stats, _ = check_column_ends_with_another(df, "processed_address2", "municipality")
    print(stats)
    df["processed_address"] = remove_sufix(
        df, "address", ("Santa Fé", "Partaola", "VélezBlanco")
    )

    extra_data["processed_address2"] = df["processed_address2"]

    extra_data.to_excel("/tmp/foo2.xlsx")

    # print(
    #     tabulate(
    #         df[true_false_column][["municipality", "processed_address", "foo"]],
    #         # ends_with_sufix[["municipality", "processed_address"]],
    #         headers="keys",
    #         tablefmt="psql",
    #         showindex=False,
    #     )
    # )

    return df


def prepare_geocode(df: pd.DataFrame) -> pd.DataFrame:
    df = analyze_ends_with_almeria(df)
    df = analyze_ends_with_municipality(df)

    return df
