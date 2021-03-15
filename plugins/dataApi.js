import { unwrap, getErrorResponse } from "~/utils/fetchUtils";

export default function({ $config }, inject) {
    const baseUrl = `https://${$config.algolia.appId}-dsn.algolia.net/1/indexes`;
    const headers = {
        "X-Algolia-API-Key": $config.algolia.key,
        "X-Algolia-Application-Id": $config.algolia.appId
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
                await fetch( baseUrl + `/homes/${homeId}`, { headers })
            );
        } catch (err) {
            return getErrorResponse(err);
        }
    }

    async function getReviewsByHomeId(homeId) {
        try {
            return unwrap(
                await fetch( baseUrl + "/reviews/query", {
                    headers,
                    method: "POST",
                    body: JSON.stringify({
                        filters: `homeId:${homeId}`,
                        hitsPerPage: 6,
                        attributesToHighlight: []
                    })
                })
            );
        } catch (err) {
            return getErrorResponse(err);
        }
    }

    async function getHomesByLocation(lat,lng,radiusInMeters = 1500) {
        try {
            return unwrap(
                await fetch( baseUrl + "/homes/query", {
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
                await fetch( baseUrl + "/users/query", {
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
}
