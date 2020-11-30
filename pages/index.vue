<template>
    <div>
        <h1>NuxtBnB</h1>
        <HomeCardDeck :homes='homes' />
    </div>
</template>

<script>
import homes from '@/data/homes'
import HomeCardDeck from '@/components/HomeCardDeck'

export default {
    components: {
        HomeCardDeck
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
</style>