<template>
  <p class="root">
    <span class="text">{{text}}{{loading}}</span>
  </p>
</template>

<script>
export default {
  props: {
    text: String
  },
  data() {
    return {
      loading: '.'
    }
  }
}
</script>

<style scoped lang="scss">
.root {

}
</style>
