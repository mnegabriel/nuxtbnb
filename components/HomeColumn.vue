<template>
    <ul class="column">
        <li v-for="(home, k) in homes" :key="k" >
            <nuxt-link :to="`/home/${home.objectID}`">
                <HomeRow :home='home'>
                    <!-- <template #details>{{home.features.join(", ")}}</template> -->
                </HomeRow>
            </nuxt-link>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'HomeColumn',
    props: ['homes']
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