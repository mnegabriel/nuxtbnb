<template>
    <div>
        <h1>NuxtBnB</h1>
        <ul>
            <li v-for="(home, k) in homes" :key="k" >
                <HomeCard :home='home'/>
            </li>
        </ul>
    </div>
</template>

<script>
import homes from '@/data/homes'
import HomeCard from '@/components/HomeCard'

export default {
    components: {
        HomeCard
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

ul {
    list-style: none;
}
</style>