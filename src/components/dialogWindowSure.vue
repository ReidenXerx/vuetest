<template>
  <div id="" class="window">
    <h1>Are you sure?</h1>
    <div class="panel">
      <button type="button" @click="apply" class="btn btn-success">Yes</button>
      <button type="button" @click="discard" class="btn btn-danger">Not</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  data: () => ({

  }),
  methods: {
    apply() {
      this.$emit('apply', true)
    },
    discard() {
      this.$emit('discard', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.window {
  height: 50%;
  width: 50%;
  position: absolute;
  margin: 0 auto;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid black;
}
</style>
