<template>
    <ul class="column">
        <li v-for="(home, k) in homes" :key="k" >
            <nuxt-link :to="`/home/${home.objectID}`">
                <HomeRow 
                    :home='home' 
                    @mouseover.native="highlightMarker(home.objectID, true)" 
                    @mouseout.native="highlightMarker(home.objectID, false)"
                />
            </nuxt-link>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'HomeColumn',

    props: ['homes'],

    methods: {
        highlightMarker(homeId, isHighlighted) {
            document.querySelector(`.home-${homeId}`)?.classList?.toggle('marker-highlight', isHighlighted)
        },
    }
}
</script>

<style>
.column {
    list-style: none;
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: center;
}


</style>