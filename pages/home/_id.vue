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

        <section class="home__reviews">
            <article class="review" v-for="review of reviews" :key="review.objectID">
                <img :src="review.reviewer.image" :alt="review.reviewer.name" :title="review.reviewer.name">
                <div class="review__text">
                    <h5 class="review__name">{{ review.reviewer.name }}</h5>
                    <span class="review__date">{{ review.date | formatDate }}</span>
                    <UtilShortText :text="review.comment" :target="150"/>
                </div>
            </article>
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
    filters: {
        formatDate(dateStr) {
            let date = new Date(dateStr)
            return date.toLocaleString(undefined, { month: 'long', year: 'numeric' })
        }
    },
    async asyncData({ params, $dataApi, error }) {
        const homeResponse = await $dataApi.getHome(params.id)
        if(!homeResponse.ok){ 
            return error({ 
                statusCode: homeResponse.status,
                message: homeResponse.statusText    
            })        
        }

        const reviewResponse = await $dataApi.getReviewsByHomeId(params.id)
        if(!reviewResponse.ok){ 
            return error({ 
                statusCode: reviewResponse.status,
                message: reviewResponse.statusText    
            })        
        }

        return {
            home: homeResponse.json,
            reviews: reviewResponse.json.hits,
        }
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

.home__reviews {
    grid-column: 1 / -1;
}

.review {
    margin-bottom: 20px;
    display: flex;
    align-items: flex-start;
    gap: 10px
}

.review__text {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

#map{
    height:800px;
    width: 100%;
    grid-column: span 2;
}

</style>