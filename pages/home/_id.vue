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

        <section class="home__host">
            <img :src="user.image" :alt="user.name" :title="user.name">
            <h5>{{user.name}}</h5>
            <p>joined {{ user.joined | formatDate }}</p>
            <span>Grade: {{user.reviewCount}}</span>
            <p>{{user.description}}</p>
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
        const responses = await Promise.all([
            $dataApi.getHome(params.id),
            $dataApi.getReviewsByHomeId(params.id),
            $dataApi.getUserByHomeId(params.id)
        ])

        const badResponse = responses.find(response => !response.ok)
        if(badResponse) {
            return error({ 
                statusCode: homeResponse.status,
                message: homeResponse.statusText    
            })
        }

        return {
            home: responses[0].json,
            reviews: responses[1].json.hits,
            user: responses[2].json.hits[0],
        }
    },
    mounted() {
        this.$maps.showMap(this.$refs.map, this.home._geoloc.lat, this.home._geoloc.lng)
    }
}
</script>

<style scoped>
.home{
    min-height: 100vh;
    width: 100%;
    padding: 0 40px;
    margin: 0 auto;    
}

.home > * {
    margin-bottom: 20px;
}

.home__images img {
    width: 200px;
    max-height: 133px;
    object-fit: cover;
}

.side-note {
    background-color: rgb(255, 255, 212);
    border-left: 4px solid rgb(245, 219, 73);
    padding: 10px;
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

@media (min-width: 800px) {
    .home {
        display: grid;
        grid-template-columns: 1fr 260px;
        column-gap: 80px;
        row-gap: 30px;
        align-items: start;
        max-width: 1200px;
    }
    
    .home * {
        grid-column: 1 / -2;
    }

    .home__advert {
        grid-row: span 2;
    }

    .home__images{
        grid-column: 1 / -1;
    }

    .side-note, 
    .home__ratings {
        grid-column: -2 / -1;
    }

    .home__reviews {
        grid-column: 1 / -1;
    }
}

</style>