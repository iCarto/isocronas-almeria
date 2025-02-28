# Definir categorías generales y asignar etiquetas a cada una
categorias = {
    "Finanzas": [
        "agencia de préstamos",
        "banco de inversión",
        "caja de ahorros",
        "financiero banco",
        "institución financiera",
    ],
    "Salud y bienestar": [
        "hospital",
        "clínica",
        "farmacia",
        "centro de salud",
        "gimnasio",
        "spa",
    ],
    "Alimentación y bebidas": [
        "restaurante",
        "cafetería",
        "bar",
        "supermercado",
        "panadería",
    ],
    "Compras": ["tienda", "centro comercial", "mercado", "ferretería"],
    "Entretenimiento y ocio": ["cine", "teatro", "museo", "parque de atracciones"],
    "Cultura y educación": ["biblioteca", "escuela", "universidad", "academia"],
    "Gobierno e instituciones": ["ayuntamiento", "embajada", "juzgado", "comisaría"],
    "Transporte": ["estación de tren", "parada de autobús", "aeropuerto", "puerto"],
    "Alojamiento": ["hotel", "hostal", "apartamento turístico"],
    "Lugares de culto": ["iglesia", "mezquita", "sinagoga", "templo"],
    "Espacios naturales": ["parque", "reserva natural", "playa", "montaña"],
    "Automoción": ["taller mecánico", "gasolinera", "concesionario de coches"],
    "Servicios": ["peluquería", "lavandería", "agencia de viajes", "asesoría"],
    "Deportes": ["campo de fútbol", "pista de tenis", "polideportivo"],
    "Turismo": ["monumento", "punto de información turística", "museo"],
}

# Crear un diccionario para mapear cada etiqueta a su categoría
mapeo_categorias = {}
for categoria, etiquetas in categorias.items():
    for etiqueta in etiquetas:
        mapeo_categorias[etiqueta] = categoria

# Aplicar el mapeo a la columna "Keyword"
df["Categoría"] = df["Keyword"].map(mapeo_categorias)

# Mostrar las primeras filas con la nueva categorización
df.head()
