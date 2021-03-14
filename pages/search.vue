<template>
    <div class="app-search-results-page">
        <div class="app-search-results">
            <div class="app-search-results-listing">
                <h2 class="app-title">Stays in {{ label }}</h2>
                <nuxt-link
                    v-for="home in homes"
                    :key="home.objectID"
                    :to="`/home/${home.objectID}`"
                >
                    <HomeRow
                        class="app-house"
                        :home="home"
                        @mouseover.native="highlightMarker(home.objectID, true)"
                        @mouseout.native="highlightMarker(home.objectID, false)"
                    />
                </nuxt-link>
            </div>
            <div class="app-search-results-map">
                <div class="app-map" ref="map"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    async beforeRouteUpdate(to, from, next) {
        const { label, lat, lng } = to.query;

        const data = await this.$dataApi.getHomesByLocation(lat, lng);

        this.homes = data.json.hits;
        this.label = label;
        this.lat = lat;
        this.lng = lng;
        this.updateMap();

        console.log(data);
        next();
    },

    async asyncData({ query, $dataApi }) {
        const { label, lat, lng } = query;

        const data = await $dataApi.getHomesByLocation(lat, lng);

        return { homes: data.json.hits, label, lat, lng };
    },

    data() {
        return {
            homes: [],
            label: "",
            lat: "",
            lng: "",
        };
    },

    mounted() {
        this.updateMap();
    },

    methods: {
        updateMap() {
            this.$maps.showMap(
                this.$refs.map,
                this.lat,
                this.lng,
                this.getHomeMarkers()
            );
        },

        getHomeMarkers() {
            return this.homes.length === 0
                ? null
                : this.homes.map((home) => ({
                      ...home._geoloc,
                      pricePerNight: home.pricePerNight,
                      id: home.objectID,
                  }));
        },
        highlightMarker(homeId, isHighlighted) {
            document
                .querySelector(`.home-${homeId}`)
                ?.classList?.toggle("marker-highlight", isHighlighted);
        },
    },
};
</script>

<style>

.marker {
    background-color: white;
    border: 1px solid gray;
    font-weight: bold;
    border-radius: 20px;
    padding: 3px 8px;
}

.marker-highlight {
    color: white !important;
    background-color: black !important;
    border-color: black !important;
}
</style>