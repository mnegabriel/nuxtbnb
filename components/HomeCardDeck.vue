<template>
    <ul class="deck">
        <li v-for="(home, k) in homes" :key="k" >
            <nuxt-link :to="`/home/${home.objectID}`">
                <HomeCard :home='home'>
                    <!-- <template #details>{{home.features.join(", ")}}</template> -->
                </HomeCard>
            </nuxt-link>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'HomeCardDeck',
    props: ['homes']
}
</script>

<style>
.deck {
    list-style: none;
    padding: 30px 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    row-gap: 30px;
    justify-items: center;
}


</style>