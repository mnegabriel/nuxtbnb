<template>
  <header>
      <nuxt-link to="/">Home</nuxt-link>
      <input type="text" ref="citiesSearch" @changed="changed">
  </header>
</template>

<script>
export default {
    name: 'TheHeader',
    mounted() {
        this.$maps.makeAutoComplete(this.$refs.citiesSearch)
    },
    methods: {
        changed(event) {
            const place = event.detail
            if(!place.geometry) return
            this.$router.push({
                name: 'search',
                query: {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                    label: this.$refs.citiesSearch.value,
                }
            })
        }
    }
}
</script>

<style scoped>
header {
    width: 100%;
    background-color: var(--col-main-light);
    padding: 20px;
}

a {
    color: rgb(16, 94, 16);
    font-weight: bold;
    position: relative;
}

a::after{
    content:'';
    position: absolute;
    width:0;
    height: 2px;
    background-color: var(--col-main-dark);
    bottom: -5px;
    right: 0;
    transition: .1s ease-in-out;
}

a:hover::after {
    width: 100%;
}

</style>