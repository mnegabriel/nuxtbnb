export default {
    components: true,
    head: {
        titleTemplate:"NuxtBnb - %s",
        htmlAttrs:{
            lang:'en'
        },
        meta: [{
            charset: 'utf-8',
        }]
    },
    plugins: [
        '~/plugins/maps.client',
        '~/plugins/dataApi',
    ],
    env: {
        placesApiKey: process.env.PLACES_API_KEY,
        dbApiId: process.env.DB_API_ID,
        dbApiKey: process.env.DB_API_KEY,
    }
}