<template lang="html">
  <div class="container">
    <h1>{{this.name}}</h1>

    <div v-for="(task, index) in this.todos" class="input-group mb-3">
      <div class="input-group-prepend">
        <div class="input-group-text">
          <input type="checkbox" :id="index" v-model="task.done" aria-label="Checkbox for following text input">
        </div>
      </div>
      <input type="text" class="form-control" v-model="task.text" aria-label="Text input with checkbox">
    </div>
    <div class="buttons">
      <button type="button" @click="addTodo" class="close">
        <b-icon icon="plus" aria-hidden="true"></b-icon>
      </button>
      <button type="button" @click="deleteTodo" class="close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="panel">
      <button type="button" @click="save" class="btn btn-success">Save</button>
      <button type="button" @click="close" class="btn btn-danger">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      name: '',
      todos: []
    }
  },

  mounted() {
    // this.name = this.autoload(this.$route.params.id).name // геттеры все равно образуют реактивные связи
    let buf = this.$store.getters.getNotesStorageById(this.$route.params.id)
    buf = Object.assign({}, buf, {
    name: buf.name,
    todos: JSON.parse(JSON.stringify(buf.todos)) // 3 параметр - конструктор копирования
    })
    // let buf = this.reloadData(this.$route.params.id)
    this.name = buf.name
    this.todos = buf.todos
  },

  methods: {
    reloadData: function(index) {
      // console.log('buffer ' + index)
      // let buffer = this.$store.getters.getNotesStorage
      // console.log(this.$store.getters.getNotesStorage)
      // // console.log(this.$store.getters.getNotesStorageById(1))
      // console.log('buffer ' + buffer[index])
      // return buffer[index]
      return this.copyObject(this.$store.getters.getNotesStorageById(index))
    },
    close: function() {
      this.$router.push({path: `/`})
    },
    save: function() {
      this.$store.commit('saveNote', [this.$route.params.id, {name: this.name, todos: this.todos}])
      this.$router.push({path: `/`})
    },
    addTodo: function() {
      this.todos.push({
        text: '',
        done: false
      })
    },
    deleteTodo: function() {
      this.todos.splice(this.todos.length - 1, 1)
    }
    // copyObject: function(object) {
    //   let copyParams = {}
    //   for (let key in object) {
    //     if (object.hasOwnProperty(key)) {
    //       if (typeof(object[key]) == 'Array') {
    //         copyParams[key] = JSON.parse(JSON.stringify(object[key]))
    //       }
    //       else {
    //         copyParams[key] = object[key]
    //       }
    //     }
    //   }
    //   console.log(copyParams)
    //   return Object.assign({}, object, copyParams)
    // }
    //end methods
  }
}
</script>

<style lang="css" scoped>
.buttons{
  display: flex;
  justify-content: space-around;
  padding-left: 45%;
  padding-right: 45%;
  padding-bottom: 200px;
}
.panel {
  display: flex;
  justify-content: space-around;
  padding-left: 40%;
  padding-right: 40%;
}
</style>
