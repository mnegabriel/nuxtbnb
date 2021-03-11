<template>
    <div class="app-padded-vertical">
        <div class="app-wrapper">
            <div class="app-testimonials">
                <div v-for="(review, idx) of reviews" :key="idx">
                    <div class="app-testimonial-header">
                        <div><img :src="review.reviewer.image" /></div>
                        <div>
                            <p class="app-testimonial-name">
                                {{ review.reviewer.name }}
                            </p>
                            <p class="app-testimonial-date">
                                {{ formatDate(review.date) }}
                            </p>
                        </div>
                    </div>
                    <div class="app-testimonial-body">
                        <UtilShortText :text="review.comment" :target="150" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import formatDate from "@/utils/formatDate";

export default {
    name: "PropertyReviews",

    props: {
        reviews: {
            type: Array,
            required: true,
        },
    },

    methods: {
        formatDate,
    },
};
</script>