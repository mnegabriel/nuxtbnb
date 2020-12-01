<template>
  <header>
      <nuxt-link to="/">Home</nuxt-link>
  </header>
</template>

<script>
export default {
    name: 'TheHeader'
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