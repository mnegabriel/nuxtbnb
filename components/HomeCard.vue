<template>
    <article class="card">

            <header>
                <img class="card__thumb" :src="home.images[0]" alt="">
            </header>

            <section class="card__info">
                <h3 class="">{{home.title}}</h3>
                <span>{{home.location.adress}}</span>
                <span>{{home.location.city}}</span>
                <span>{{home.location.state}}</span>
                <p>{{home.guests}} guests</p>
                <p>{{home.pricePerNight}} / night</p>
                <p class="card__details">
                    <slot name='details'></slot>
                </p>
            </section>     

    </article>
</template>

<script>
export default {
    props: {
        home: {
            type: Object,
            required: true,
        }
    }
}
</script>

<style scoped>
.card {
    max-width: 250px;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 1px 1px 18px 0 #00000022;
}

.card__thumb {
    width: 100%;
}

.card__info {
    padding: 5px 12px 8px;
}

.card__details {
    margin-top: 12px;
    padding-top: 8px;
    border-top: 1px solid #eee;
    font-size: .8rem;
    color: #888;
}
</style>