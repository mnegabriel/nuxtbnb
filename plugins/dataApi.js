export default function (context, inject) {
    const apiId = process.env.dbApiId;
    const apiKey = process.env.dbApiKey;

    const baseUrl = `https://${apiId}-dsn.algolia.net/1/indexes`;
    const headers = {
        "X-Algolia-API-Key": apiKey,
        "X-Algolia-Application-Id": apiId,
    };

    inject("dataApi", {
        getHome,
        getReviewsByHomeId,
        getUserByHomeId,
        getHomesByLocation
    });

    async function getHome(homeId) {
        try {
            return unwrap(
                await fetch(baseUrl + `/homes/${homeId}`, { headers })
            );
        } catch (err) {
            return getErrorResponse(err);
        }
    }

    async function getReviewsByHomeId(homeId) {
        try {
            return unwrap(
                await fetch(baseUrl + "/reviews/query", {
                    headers,
                    method: "POST",
                    body: JSON.stringify({
                        filters: `homeId:${homeId}`,
                        hitsPerPage: 6,
                        attributesToHighlight: [],
                    }),
                })
            );
        } catch (err) {
            return getErrorResponse(err);
        }
    }

    async function getHomesByLocation(lat, lng, radiusInMeters = 1500) {
        try {
            return unwrap(
                await fetch(baseUrl + "/homes/query", {
                    headers,
                    method: "POST",
                    body: JSON.stringify({
                        aroundLatLng: `${lat},${lng}`,
                        aroundRadius: radiusInMeters,
                        hitsPerPage: 10,
                        attributesToHighlight: []
                    })
                })
            );
        } catch (err) {
            return getErrorResponse(err);
        }
    }
    async function getUserByHomeId(homeId) {
        try {
            return unwrap(
                await fetch(baseUrl + "/users/query", {
                    headers,
                    method: "POST",
                    body: JSON.stringify({
                        filters: `homeId:${homeId}`,
                        attributesToHighlight: []
                    })
                })
            );
        } catch (err) {
            return getErrorResponse(err);
        }
    }

    async function unwrap(response) {
        const json = await response.json();
        const { ok, status, statusText } = response;
        return {
            json,
            ok,
            status,
            statusText,
        };
    }

    function getErrorResponse(error) {
        return {
            ok: false,
            status: 500,
            statusText: error.message,
            json: {},
        };
    }
}
