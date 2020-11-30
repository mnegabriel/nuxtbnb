<template>
    <div>
        <h1>NuxtBnB</h1>
        <HomeCardDeck :homes='homes' />
    </div>
</template>

<script>
import homes from '@/data/homes'

export default {
    head() {
        return {
            title: "Homepage",
            meta: [{
                hid:'description',
                name:'description',
                content: "Check our catalog for your next trip - NuxtBnB"
            }]
        }
    },
    data(){
        return {
            homes: homes.slice(0,3)
        }
    }
}
</script>

<style>
* {
    margin:0;
    padding:0;
    box-sizing: border-box;
}

a {
    text-decoration: none;
    color: inherit;
}
</style>