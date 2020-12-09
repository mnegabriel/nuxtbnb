<template>
  <div id='whole'>
      <TheHeader/>
      <Nuxt/>
  </div>
</template>

<script>
export default {

}
</script>

<style>
:root{
    --col-main-dark: rgb(16, 94, 16);
    --col-main-light: rgb(184, 255, 200);
}
#whole {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}
</style>