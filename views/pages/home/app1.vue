<template lang="pug">
  div(class="vue1")
    span Vue slot 1s234
    my-input
    span
      #{test}
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
input::placeholder {
  color: red;
}
</style>
