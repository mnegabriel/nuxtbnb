<template>
    <div class="app">
        <header class="app-header">
            <div class="app-logo"><img src="/images/logo.svg" /></div>
            <div class="app-search">
                <input
                    type="text"
                    ref="citiesSearch"
                    @changed="changed"
                    placeholder="Enter the desired location"
                />
                <input type="text" class="datepicker" placeholder="Check in" />
                <input type="text" class="datepicker" placeholder="Check out" />
                <button><img src="/images/icons/search.svg" /></button>
            </div>
            <div class="app-user-menu">
                <template v-if="isLoggedIn">
                    <img src="/images/icons/house.svg" />
                    <div class="name">Host</div>
                    <img :src="user.profileUrl" class="avatar" />
                </template>
                <div v-if="!isLoggedIn" id="googleButton"></div>
            </div>
        </header>
    </div>
</template>

<script>
export default {
    name: "TheHeader",
    computed: {
        user() {
            return this.$store.state.auth.user;
        },
        isLoggedIn() {
            return this.$store.state.auth.isLoggedIn;
        },
    },
    mounted() {
        this.$maps.makeAutoComplete(this.$refs.citiesSearch);
    },
    methods: {
        changed(event) {
            const place = event.detail;
            if (!place.geometry) return;
            this.$router.push({
                name: "search",
                query: {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                    label: this.$refs.citiesSearch.value,
                },
            });
        },
    },
};
</script>