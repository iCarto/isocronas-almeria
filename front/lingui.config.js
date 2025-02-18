const config = {
    locales: ["es-ES"],
    catalogs: [
        {
            path: "<rootDir>/src/app/l10n/locales/{locale}",
            include: ["src"],
        },
    ],
};

export default config;
