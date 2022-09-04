<template>
  <div class="hello">
    <h1>{{ object.msg }}</h1>
  </div>
</template>

<script setup lang="ts">
import {PropType} from 'vue'
type ObjectType = {msg: string, count: number}
const props = defineProps({
  object: {
    type: Object as PropType<ObjectType>,
    default: () => ({
      msg: "abc",
      count: 0
    })
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
