<template>
  <div class = "vue1">
    Vue slot 1s234
    <my-input />
    <span>{{ test }}</span>
  </div>
</template>

<script>
import MyInput from '../../components/input';
export default {
  components: {
    MyInput
  },
  data() {
    return {
      test: 12311
    }
  }
}
</script>

<style scoped>
.vue1 {
  margin-top: 30px;
}
</style>
