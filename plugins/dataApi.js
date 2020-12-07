export default function(context, inject) {
    const apiId = process.env.dbApiId
    const apiKey = process.env.dbApiKey
    const headers = {
        'X-Algolia-API-Key': apiKey,
        'X-Algolia-Application-Id': apiId
    }

    inject('dataApi', {
        getHome
    })

    async function getHome(homeId) {
        try{
            return unwrap( await fetch(`https://${apiId}-dsn.algolia.net/1/indexes/homes/${homeId}`, { headers }))

        } catch(err) {
            return getErrorResponse(err)
        }
    }

    async function unwrap(response) {
        const json = await response.json()
        const { ok, status, statusText } = response
        return {
            json,
            ok,
            status,
            statusText
        }
    }

    function getErrorResponse( error ) {
        return {
            ok: false,
            status: 500,
            statusText: error.message,
            json: {}
        }
    }

}