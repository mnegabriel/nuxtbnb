<template>
    <div class="app-container">
        <PropertyGallery :images="home.images" />
        <PropertyDetails :home="home" />
        <PropertyDescription :home="home" />
        <PropertyMap :home="home" />
        <PropertyReviews :reviews="reviews" />
        <PropertyHost :user="user" />
    </div>
</template>

<script>
import formatDate from '@/utils/formatDate'

export default {
    head() {
        return {
            title: this.home.title,
        };
    },
    async asyncData({ params, $dataApi, error }) {
        const responses = await Promise.all([
            $dataApi.getHome(params.id),
            $dataApi.getReviewsByHomeId(params.id),
            $dataApi.getUserByHomeId(params.id),
        ]);

        const badResponse = responses.find((response) => !response.ok);
        if (badResponse) {
            return error({
                statusCode: homeResponse.status,
                message: homeResponse.statusText,
            });
        }

        return {
            home: responses[0].json,
            reviews: responses[1].json.hits,
            user: responses[2].json.hits[0],
        };
    },
};
</script>

<style scoped>
.home {
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
    gap: 10px;
}

.review__text {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

#map {
    height: 800px;
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

    .home__images {
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