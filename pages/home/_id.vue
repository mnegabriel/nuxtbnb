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
export default {
    head(){
        return {
            title: this.home.title,
        }
    },
    async asyncData({ params, $dataApi, error }) {
        const response = await $dataApi.getHome(params.id)
        if(!response.ok){ 
            return error({ 
                statusCode: response.status,
                message: response.statusText    
            })
        
        }
        return { home: response.json }
    },
    mounted() {
        this.$maps.showMap(this.$refs.map, this.home._geoloc.lat, this.home._geoloc.lng)
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