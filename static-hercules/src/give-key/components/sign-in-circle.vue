<template>
    <li class="circle-list">
        <div class="circle-image" :style="'background-image:url(' + getValue + ')'"></div>
    </li>
</template>

<script>

export default {
  name: 'sign-in-circle',
  props: {
    image: {
      type: String,
      default: "https://assets.2dfire.com/frontend/75a73c4cb194621b9c1998c2eba1a353.png"
    }
  },
  computed: {
      getValue() {
        return this.image
      }
  },
  methods: {
  },
}
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
    .circle-list {
        position: relative;
        float: left;
        width: 33%;
        text-align: center;

        .circle-image {
            content: '';
            display: block;
            margin: auto;
            width: 176px;
            height: 207px;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: 50%;
        }
    }
</style>
