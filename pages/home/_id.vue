<template>
    <article>
        <section class="home__images">
            <img v-for="(image, k) in home.images" :key="k" :src="image"/>
        </section>

        <section class="home__advert">
            <h1>{{ home.title }}</h1>
            <span class="adress"> 
                {{home.location.address}} - {{home.location.city}}, {{home.location.state}}, {{home.location.country}}
            </span>
            <p>{{ home.description }}</p>
            <p class="side-note">{{home.note}}</p>
        </section>

        <section class="home__ratings">
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

        <nuxt-link to="/">Back to home</nuxt-link>
    </article>
</template>

<script>
import homes from '@/data/homes'

export default {
    data() {
        return {
            home: null,
        }
    },
    created() {
        this.home = homes.find( home => home.objectID === this.$route.params.id )
    }
}
</script>

<style scoped>
.home__images img {
    width: 200px;
    max-height: 133px;
    object-fit: cover;
}

</style>