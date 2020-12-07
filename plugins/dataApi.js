export default function(context, inject) {
    const apiId = process.env.dbApiId
    const apiKey = process.env.dbApiKey

    inject('dataApi', {
        getHome
    })

    async function getHome(homeId) {
        const response = await fetch(`https://${apiId}-dsn.algolia.net/1/indexes/homes/${homeId}`, {
            headers: {
                'X-Algolia-API-Key': apiKey,
                'X-Algolia-Application-Id': apiId
            }
        })

        const json = response.json()
        return json
    }

}