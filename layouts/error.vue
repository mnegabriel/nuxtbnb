<template>
  <div>
      <h1>Error!</h1>
      <p><strong>Error {{error.statusCode}}:</strong> {{error.message}}</p>
  </div>
</template>

<script>
export default {
    head() {
        title: this.error.statusCode
    },
    props: {
        error: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
div {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;    
}
</style>