<template>
    <ul class="deck">
        <li v-for="(home, k) in homes" :key="k" >
            <HomeCard :home='home'/>
        </li>
    </ul>
</template>

<script>
import HomeCard from '@/components/HomeCard'

export default {
    name: 'HomeCardDeck',
    components: {
        HomeCard
    },
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