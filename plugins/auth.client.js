import Cookie from "js-cookie";

export default ({ $config }, inject) => {
    window.initAuth = initAuth;
    addScript();

    inject("auth", {
        singOut
    });

    function addScript() {
        const script = document.createElement("script");
        script.src = `https://apis.google.com/js/platform.js?onload=initAuth`;
        script.async = true;
        document.head.appendChild(script);
    }

    function initAuth() {
        window.gapi.load("auth2", async function() {
            const auth2 = await window.gapi.auth2.init({
                client_id: $config.auth.clientId
            });

            auth2.currentUser.listen(parseUser);
        });

        window.gapi.signin2.render("googleButton", {
            onsuccess: parseUser
        });
    }

    function parseUser(user) {
        const profile = user.getBasicProfile();
        const idToken = user.getAuthResponse().id_token;

        if (!user.isSignedIn()) {
            Cookie.remove($config.auth.cookieName);
            return;
        }

        Cookie.set($config.auth.cookieName, idToken, {
            expires: 1 / 24,
            sameSite: "lax"
        });
    }

    function singOut() {
        const auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signOut();
    }
};
