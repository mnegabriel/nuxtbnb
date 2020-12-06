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
        '~/plugins/maps.client'
    ],
    env: {
        placesApiKey: process.env.PLACES_API_KEY
    }
}