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
      <button type="button" @click="undo" class="btn btn-link">Undo</button>
      <!-- <button type="button" @click="redo" class="btn btn-link">Redo</button> -->
    </div>
    <dialogWindowSure v-if="dialogTurn" v-on:apply="applyDelete" v-on:discard="discardDelete" />
  </div>
</template>

<script>
import dialogWindowSure from "@/components/dialogWindowSure.vue"

export default {

  components: {
    dialogWindowSure
  },

  data() {
    return {
      name: '',
      todos: [],
      todosBackup: [],
      dialogTurn: false
    }
  },

  mounted() {
    // this.name = this.autoload(this.$route.params.id).name // геттеры все равно образуют реактивные связи
    let buf = this.reloadData()
    // let buf = this.reloadData(this.$route.params.id)
    this.name = buf.name
    this.todos = buf.todos
  },

  methods: {
    reloadData: function() {
      let buf = this.$store.getters.getNotesStorageById(this.$route.params.id)
      buf = Object.assign({}, buf, {
      name: buf.name,
      todos: JSON.parse(JSON.stringify(buf.todos)) // 3 параметр - конструктор копирования
      })
      return buf
    },
    showDialog: function() { // как исправить дублирование
      this.dialogTurn = true
    },
    hideDialog: function() {
      this.dialogTurn = false
    },
    backupData: function() {
      this.todosBackup = this.reloadData().todos
    },
    close: function() {
      this.$router.push({path: `/`})
    },
    save: function() {
      this.backupData()
      this.$store.commit('saveNote', [this.$route.params.id, {name: this.name, todos: this.todos}])
      // this.$router.push({path: `/`})
    },
    addTodo: function() {
      this.todos.push({
        text: '',
        done: false
      })
    },
    applyDelete: function() {
      this.hideDialog()
      this.todos.splice(this.todos.length - 1, 1)
    },
    discardDelete: function() {
      this.hideDialog()
    },
    deleteTodo: function() {
      this.showDialog()
    },
    undo: function() {
      if (this.todosBackup.length != 0) {
        let buf = this.todos.concat()
        this.todos = this.todosBackup.concat()
        this.todosBackup = buf.concat()
        this.$store.commit('saveNote', [this.$route.params.id, {name: this.name, todos: this.todosBackup}])
      }
    },

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
.container {
  position: relative;
}
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
  padding-left: 30%;
  padding-right: 30%;
}
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
