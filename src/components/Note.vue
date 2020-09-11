<template lang="html">
  <div class="list-group">
    <h1>{{name}}</h1>
    <a href="#" v-for="taskText in this.todos" v-bind:class="{'completed':taskText.done}" class="list-group-item list-group-item-action">{{taskText.text}}</a>
    <div class="container">
      <button type="button" @click="deleteEvent" class="close">
        <span aria-hidden="true">&times;</span>
      </button>
      <button type="button" @click="changeEvent" class="close">
        <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    todos: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
    }
  },
  methods: {
    deleteEvent: function () {
      console.log('delete')
      this.$emit('delete', this.index)
    },
    changeEvent: function () {
      console.log('changing')
      this.$emit('change', this.index)
    }
  }
}
</script>

<style lang="scss" scoped>
  .list-group {
    display: flex;
    width: 50%;
    margin-top: 5vh;
    justify-content: center;
    .close {
      display: none;
      margin-top: 10px;
      margin-bottom: 10px;
      align-self: center;
    }
    &:hover .close {
      display: flex;
    }
  }
  .close:hover {
    color: #e53935;
  }
  .container {
    display: flex;
    padding-left: 40%;
    padding-right: 40%;
    justify-content: space-around;
  }
  .completed {
    background-color: #a5d6a7;
  }
  // .list-group::after {
  //   display: none;
  //   justify-content: center;
  //   align-self: center;
  //   content: 'X';
  //   color: black;
  //   width: 30px;
  //   height: 30px;
  //   font-size: 20px;
  //   margin-top: 10px;
  //   margin-bottom: 10px;
  //   border-radius: 10px;
  //   background-color: #d32f2f;
  // }
  //
  // .list-group:hover::after {
  //   display: flex;
  // }

</style>
