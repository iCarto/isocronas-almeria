import re
from unicodedata import normalize

import pandas as pd
from constants import MINIMUN_LENGTH_EXCEPTION


def normalice_string(text: str) -> str:
    if not text or not isinstance(text, str):
        return text
    return normalize("NFKD", text).encode("ascii", "ignore").decode("utf-8")


def remove_columns_ends_with_another(
    df: pd.DataFrame, column_to_check: str, column_with_values: str
):
    def ends_with_value(row):
        v1 = normalice_string(str(row[column_to_check])).lower()
        v2 = normalice_string(str(row[column_with_values])).lower()
        return v1.endswith(v2)

    def apply_remove_suffix(row):
        if ends_with_value(row):
            row[column_to_check] = row[column_to_check][
                : -len(row[column_with_values])
            ].strip()
            return row
        return row

    return df.apply(apply_remove_suffix, axis=1)


def check_column_ends_with_another(
    df: pd.DataFrame, column_to_check: str, column_with_values: str
):
    def ends_with_value(row):
        v1 = normalice_string(str(row[column_to_check]))
        v2 = normalice_string(str(row[column_with_values]))
        return v1.endswith(v2)

    true_false_column = df.apply(ends_with_value, axis=1)

    total_rows = len(df)
    rows_withtout_value = int(df[column_to_check].isna().sum())
    ends_with_sufix = df[true_false_column]
    not_ends_with_sufix = df[~true_false_column]
    stats = {
        "total_rows": total_rows,
        "rows_withtout_value": rows_withtout_value,
        "ends_with_sufix": len(ends_with_sufix),
        "not_ends_with_sufix": len(not_ends_with_sufix),
    }

    extra_data = df[["municipality", "processed_address"]]
    extra_data["true_false_column"] = true_false_column

    return stats, extra_data


def obj_has_method(obj, key):
    return hasattr(obj, key) and callable(getattr(obj, key))


def check_sufix(df: pd.DataFrame, column: str, sufixes: list[str]):
    """Check if column has any of the sufixes in the list.

    returns a count of the results
    """
    total_rows = len(df)
    rows_withtout_value = int(df[column].isna().sum())
    true_false_column = df[column].str.lower().str.endswith(sufixes, na=False)
    ends_with_sufix = df[true_false_column]
    not_ends_with_sufix = df[~true_false_column]
    stats = {
        "total_rows": total_rows,
        "rows_withtout_value": rows_withtout_value,
        "ends_with_sufix": len(ends_with_sufix),
        "not_ends_with_sufix": len(not_ends_with_sufix),
        "suffixes": sufixes,
    }
    return (stats, not_ends_with_sufix[column].dropna().to_list())


def remove_sufix(df: pd.DataFrame, column: str, sufixes: list[str]):
    """Returns a new column without the suffixes."""

    def apply_remove_suffix(value):
        if not obj_has_method(value, "lower"):
            return value
        for suffix in sufixes:
            if value.lower().endswith(suffix):
                return value[: -len(suffix)].strip()
        return value

    return df[column].apply(apply_remove_suffix)


def remove_trailing_dots(text: str) -> str:
    """Remove any trailing dots with any number of spaces before and after it."""
    if not text or not isinstance(text, str):
        return text
    return re.sub(r"\s*\.+\s*$", "", text)


def remove_trailing_commas(text: str) -> str:
    """Remove any trailing dots with any number of spaces before and after it."""
    if not text or not isinstance(text, str):
        return text
    return re.sub(r"\s*\,+\s*$", "", text)


def replace_middle_end_of_line(text: str | None) -> str | None:
    """Replace end of line characters in the middle of a tex with ". ".

    If there is a dot or any number of spaces before the end of line character, they are removed.
    """
    if not text:
        return None
    return re.sub(r"\.*\s*\n\s*(.+)", r". \1", text)


def raise_error_for_minimum_length(text, minimun_length=5, exceptions=None):
    if len(text) < minimun_length and text.upper() not in exceptions:
        msg = f"Cell text is too short: '{text}'"
        raise ValueError(msg)


def get_cell_text(cell, minimun_length=5):
    text = cell.text.strip()
    if text == "-":
        text = text.replace("-", "")
    text = replace_middle_end_of_line(text)
    if not text:
        return None
    if text.endswith("."):
        text = text[:-1].rstrip()
    if not text:
        return None

    raise_error_for_minimum_length(
        text, minimun_length, exceptions=MINIMUN_LENGTH_EXCEPTION
    )
    return text
