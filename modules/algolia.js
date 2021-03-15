import fetch from "node-fetch";
import { unwrap, getErrorResponse } from "../utils/fetchUtils";

export default function() {
    const algoliaConfig = this.options.privateRuntimeConfig.algolia;

    const baseUrl = `https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes`;

    const headers = {
        "X-Algolia-API-Key": algoliaConfig.key,
        "X-Algolia-Application-Id": algoliaConfig.appId
    };

    this.nuxt.hook("render:setupMiddleware", app => {
        app.use("/api/user", getUserRoute);
    });

    function getUserRoute(req, res, next) {
        console.log(req.identity);
        createUser(req.identity);
        next();
    }

    async function createUser(identity) {
        try {
            return unwrap(
                await fetch(baseUrl + `/users/${identity.id}`, {
                    headers,
                    method: "PUT",
                    body: JSON.stringify(makeUserPayload(identity))
                })
            );
        } catch (err) {
            return getErrorResponse(err);
        }
    }

    function makeUserPayload(identity) {
        return {
            name: identity.name,
            email: identity.email,
            image: identity.image,
            description: "",
            joined: new Date().toISOString,
            homeId: [],
            reviewCount: 0
        };
    }
}
