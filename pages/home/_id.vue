<template>
    <article class="home">
        <section class="home__images">
            <img v-for="(image, k) in home.images" :key="k" :src="image"/>
        </section>

        <section class="home__advert">
            <h1>{{ home.title }}</h1>
            <span class="adress"> 
                {{home.location.address}} - {{home.location.city}}, {{home.location.state}}, {{home.location.country}}
            </span>
            <p>{{ home.description }}</p>
        </section>
        <p class="side-note">{{home.note}}</p>

        <section class="home__ratings">
            <p>Raitings</p>
            <div><p>{{home.reviewCount}} reviews </p></div>
            <div><p>{{home.reviewValue}}/5 </p></div>
        </section>

        <section class="home_data">
            <p> {{home.bedrooms}} bedrooms </p>
            <p> {{home.beds}} beds </p>
            <p> {{home.bathrooms}} </p>
            <div>
                <p>Features</p>
                <ul>
                    <li v-for="(feature, k) in home.features" :key="k">{{feature}}</li>
                </ul>
            </div>            
        </section>

        <div id="map" ref="map"></div>

        <nuxt-link to="/">Back to home</nuxt-link>
    </article>
</template>

<script>
import homes from '@/data/homes'

export default {
    head(){
        return {
            title: this.home.title,
            script: [
                { 
                    src:`https://maps.googleapis.com/maps/api/js?key=${process.env.placesApiKey}&libraries=places&callback=initMap`,
                    hid:"map",
                    async:true,
                    skip: process.client && window.mapLoaded
                },
                {
                    innerHTML: 'window.initMap = function(){ window.mapLoaded = true }',
                    hid: 'map-init'
                }
            ],
        }
    },
    data() {
        return {
            home: null,
        }
    },
    methods: {
        showMap() {

            const mapOptions = {
                zoom: 18,
                center: new window.google.maps.LatLng(this.home._geoloc.lat, this.home._geoloc.lng),
                disableDefaultUI: true,
                zoomControl: true,
            } 
            const map = new window.google.maps.Map(this.$refs.map, mapOptions)
            const position = new window.google.maps.LatLng(this.home._geoloc.lat, this.home._geoloc.lng)
            const marker = new window.google.maps.Marker({position})
            marker.setMap(map)
        },
    },
    created() {
        this.home = homes.find( home => home.objectID === this.$route.params.id )
    },
    mounted() {
        const timer = setInterval( () => {
            if(window.mapLoaded) {
                clearInterval(timer)
                this.showMap()
            }
        }, 200)
    }
}
</script>

<style scoped>
.home{
    display: grid;
    min-height: 100vh;
    width: 100%;
    grid-template-columns: 1fr 260px;
    column-gap: 80px;
    row-gap: 30px;
    padding: 0 40px;
    align-items: start;
    margin: 0 auto;
    max-width: 1200px;
    border: 1px solid red
}
.home * {
    grid-column: 1 / -2;
}

.home__images{
grid-column: 1 / -1;
}
.home__images img {
    width: 200px;
    max-height: 133px;
    object-fit: cover;
}

.side-note, 
.home__ratings {
    grid-column: -2 / -1;
}

.side-note {
    background-color: rgb(255, 255, 212);
    padding: 10px;
    border-left: 4px solid rgb(245, 219, 73);
}

#map{
    height:800px;
    width: 100%;
    grid-column: span 2;
}

</style>