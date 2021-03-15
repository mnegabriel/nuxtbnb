export default {
    components: true,
    head: {
        titleTemplate: "NuxtBnb - %s",
        htmlAttrs: {
            lang: "en"
        },
        meta: [
            {
                charset: "utf-8"
            }
        ]
    },
    plugins: [
        "~/plugins/maps.client",

        "~/plugins/dataApi",

        "~/plugins/auth.client.js"
    ],
    modules: ["~/modules/auth.js", "~/modules/algolia.js"],
    buildModules: ["@nuxtjs/tailwindcss"],
    css: ["~/assets/sass/app.scss"],
    build: {
        extractCSS: true,
        loaders: {
            limit: 0
        }
    },
    env: {
        placesApiKey: process.env.PLACES_API_KEY,
        dbApiId: process.env.DB_API_ID,
        dbApiKey: process.env.DB_API_KEY
    },
    publicRuntimeConfig: {
        auth: {
            cookieName: "idToken",
            clientId: process.env.OAUTH_CLIENT_ID
        },
        algolia: {
            appId: process.env.DB_API_ID,
            key: process.env.DB_API_KEY
        }
    },
    privateRuntimeConfig: {
        algolia: {
            appId: process.env.DB_API_ID,
            key: process.env.DB_API_KEY_WITH_PRIVILEDGE
        }
    }
};
