<template>
    <article class="card">

            <figure class="card__figure">
                <img class="card__thumb" :src="home.images[0]" alt="">
            </figure>

            <section class="card__info">
                <h3 class="card__title">{{home.title}}</h3>
                <p class="card__infoAddress">{{home.location.address}}</p>
                <p class="card__infoCity">{{home.location.city}}, {{home.location.state}}</p>                
                <p class="card__infoGuest">
                    {{home.guests}} guests, {{home.bedrooms}} bedrooms, {{home.beds}} beds, {{home.bathrooms}} bathrooms
                </p>
                <p class="card__infoPrice">{{home.pricePerNight}} / night</p>
                <p>{{home.reviewValue}}/5  {{home.reviewCount}} reviews </p>
                <p class="card__details">
                    <slot name='details'></slot>
                </p>
            </section>     

    </article>
</template>

<script>
export default {
    name: 'HomeRow',
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
.card__title{
    font-size:.8rem;
    color: #888;
}
.card__title::first-line{
    font-size:1rem;
    color: #888;
}

.card__info {
    /* display:grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 10px; */
}

.card__infoAddress,
.card__infoCity,
.card__details {
    grid-column: 1 / -1;
}
.card__infoAddress,
.card__infoCity {
    color: #aaa;
    font-size:.8rem;
}

.card__details {
    padding-top: 8px;
    border-top: 1px solid #eee;
    font-size: .8rem;
    color: #888;
}
</style>