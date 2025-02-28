import json
import random
from pathlib import Path

import pandas as pd


def prepare_columns(df: pd.DataFrame, matchtable_path: str) -> pd.DataFrame:
    with Path(matchtable_path).open("r", encoding="utf-8") as f:
        matchtable = json.load(f)

    df["code"] = df.apply(lambda row: matchtable[row["MUNICIPIO"]]["code"], axis=1)
    df = df.drop(
        columns=[
            "FILENAME",
            "ÁMBITO",
            "CATEGORIAS / DESCRIPCIÓN",
            "categoria_icarto",
            "ambito_icarto",
        ]
    )
    rename_columns = {
        "TIPO": "poi_type",
        "NOMBRE": "name",
        "MUNICIPIO": "municipality",
        "WEB": "web",
        "DIRECCIÓN": "address",
        "CATEGORIAS / DESCRIPCIÓN": "description",
        "DIRIGIDO A": "people_targetr",
        "TELEFONO": "phone",
        "categoria_y_ambito_icarto": "tags",
    }
    df = df.rename(columns=rename_columns)
    return df


def create_category_column(df: pd.DataFrame) -> pd.DataFrame:
    category_list = (
        "Actividades al aire libre",  # : parques, paseos, picnics...
        "Aprendizaje",  # : escuelas, universidades...
        "Aprovisionamiento",  # : supermercados, tiendas de alimentación...
        "Comida",  # : restaurantes, bistros, cafeterías...
        "Movilidad",  # : estaciones de autobuses, estaciones de tren, taxis...
        "Actividades culturales",  # : museos, teatros, cines...
        "Ejercicio físico",  # : gimnasios, polideportivos...
        "Servicios",  # : oficinas, bancos, correos, ayuntamientos...
        "Asistencia sanitaria",  # : hospitales, médicos, farmacias...
    )

    df["category"] = df.apply(lambda _: random.choice(category_list), axis=1)
    return df


def create_category_column2(df: pd.DataFrame) -> pd.DataFrame:
    category_list = (
        "Automoción",
        "Empresas",
        "Cultura",
        "Educación",
        "Entretenimiento y ocio",
        "Instalaciones",
        "Finanzas",
        "Alimentación y bebidas",
        "Áreas geográficas",
        "Gobierno",
        "Salud y bienestar",
        "Alojamiento",
        "Espacios naturales",
        "Lugares de culto",
        "Servicios",
        "Compras",
        "Deportes",
        "Transporte",
    )

    df["category"] = df.apply(lambda _: random.choice(category_list), axis=1)
    return df


def create_extra_column(df: pd.DataFrame) -> pd.DataFrame:
    df["extra"] = df.apply(
        lambda row: json.dumps(
            {
                "name": row["name"],
                "category": row["category"],
                "tags": row["tags"].split("; "),
            },
            ensure_ascii=False,
        ),
        axis=1,
    )
    return df
