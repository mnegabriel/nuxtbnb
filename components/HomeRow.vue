<template>
    <div>
        <div
            class="app-house-header"
            :style="`background-image: url(${home.images[0]})`"
        ></div>
        <div class="app-house-body">
            <img src="/images/icons/heart.svg" class="app-fav" />
            <h2>{{ home.title }}</h2>
            <div class="app-address">
                <p>
                    {{ home.location.address }} {{ home.location.city }},
                    {{ home.location.state }}
                </p>
            </div>
            <div class="app-amenities">
                <p>
                    {{ pluralize(home.guests, "guest") }},
                    {{ pluralize(home.bedrooms, "bedroom") }},
                    {{ pluralize(home.beds, "bed") }},
                    {{ pluralize(home.bathrooms, "bathroom") }}.
                </p>
                <p>{{ features }}</p>
            </div>
            <div class="app-flex">
                <div class="app-rating">
                    {{ home.reviewValue }} <span>{{ home.reviewCount }}</span>
                </div>
                <div class="app-price">
                    ${{ home.pricePerNight }} <span>/ night </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import pluralize from "~/utils/pluralize";
export default {
    name: "HomeRow",
    props: {
        home: {
            type: Object,
            required: true,
        },
    },
    computed: {
        features() {
            return this.home.features.slice(0, 3).join(", ");
        },
    },
    methods: {
        pluralize,
    },
};
</script>

<style scoped>
/* .card {
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 1px 1px 18px 0 #00000022;
    max-height: 400px;
    display: flex;
}

.card__figure {
    width: 30%;
}

.card__thumb {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.card__info,
.card__title {
    padding: 5px 12px 8px;
}
.card__title {
    font-size: 0.8rem;
    color: #888;
}
.card__title::first-line {
    font-size: 1rem;
    color: #888;
}

.card__infoAddress,
.card__infoCity,
.card__details {
    grid-column: 1 / -1;
}
.card__infoAddress,
.card__infoCity {
    color: #aaa;
    font-size: 0.8rem;
}

.card__details {
    padding-top: 8px;
    border-top: 1px solid #eee;
    font-size: 0.8rem;
    color: #888;
} */
</style>