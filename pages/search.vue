<template>
    <div>
        <h2>{{lat}} / {{lng}} / {{label}}</h2>
        <article v-for="home of homes" :key="home.objectID">
            <h3>{{home.title}}</h3>
        </article>
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
    }
}
</script>