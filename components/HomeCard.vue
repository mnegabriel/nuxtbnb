<template>
  <article class="card">
      <img :src="home.images[0]" alt="">
      <h3>{{home.title}}</h3>
      <span>{{home.location.adress}}</span>
      <span>{{home.location.city}}</span>
      <span>{{home.location.state}}</span>
      <p>{{home.guests}} guests</p>
      <p>{{home.price}} / night</p>
  </article>
</template>

<script>
export default {
    props: {
        home: {
            type: Object,
            required: true,
        }
    }
}
</script>

<style>
img {
    max-width: 200px;
}
</style>