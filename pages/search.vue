<template>
    <div>
        <h4>Results for {{label}}</h4>
        <section class="search-list">
            <HomeColumn :homes="homes"/>
        </section>
        <section class="map-view">
            <div id="map" ref="map"></div>
        </section>
    </div>
</template>

<script>
export default {
    async beforeRouteUpdate(to, from, next) {
        const { label, lat, lng } = to.query

        const data = await this.$dataApi.getHomesByLocation(lat, lng)

        this.homes = data.json.hits
        this.label = label
        this.lat = lat
        this.lng = lng
        this.updateMap()

        console.log(data)
        next()
    },
    async asyncData({ query, $dataApi }){
        const { label, lat, lng } = query

        const data = await $dataApi.getHomesByLocation(lat, lng)
        
        return { homes: data.json.hits, label, lat, lng }
    },
    data() {
        return {
            homes: [],
            label: '',
            lat: '',
            lng: '',            
        }
    },
    mounted() {
        this.updateMap()
    },
    methods: {
        updateMap() {
            this.$maps.showMap(this.$refs.map, this.lat, this.lng)
        }
    }
}
</script>

<style scoped>
.search-list {
    width: 300px;
}

.map-view{
    position: fixed;
    right: 0;
    bottom: 0;
    height: calc(100% - 60px);
    width: calc(100% - 350px);
}

.map-view > * {
    height: 100%;
}
</style>