<template lang="html">
  <div class="container">
    <Note v-for="(item, index) in stackNotes" :name="item.name" :index="index" :todos="item.todos" v-on:delete="deleteNote" v-on:change="changeNote"/>
    <dialogWindowSure v-if="dialogTurn" v-on:apply="applyDelete" v-on:discard="discardDelete" />
  </div>
</template>

<script>
import Note from "@/components/Note.vue"
import dialogWindowSure from "@/components/dialogWindowSure.vue"
export default {
  components: {
    Note,
    dialogWindowSure
  },
  data() {
    return {
      stackNotes: [],
      dialogTurn: false,
      deletingIndex: ''
    }
  },
  mounted() {
    this.reloadData(this.$store.getters.getNotesStorage)
    console.log(this.$store)
  },
  methods: {
    // deleteNote: function(name) {
    //   this.stackNotes.find(note => {
    //     note.name === name
    //
    //   })
    // }
    showDialog: function() {
      this.dialogTurn = true
    },
    hideDialog: function() {
      this.dialogTurn = false
    },
    applyDelete: function() {
      this.hideDialog()
      this.$store.commit('deleteNote', this.deletingIndex)
      this.reloadData(this.$store.getters.getNotesStorage)
    },
    discardDelete: function() {
      this.hideDialog()
    },
    deleteNote: function(index) {
      this.showDialog()
      this.deletingIndex = index
    },
    changeNote: function(index) {
      this.$router.push({ path: `editnote/${index}` })
    },
    reloadData: function(array) {
      // for (var i = 0; i < this.$store.getters.getCountNotes; i++) {
      //   let buf = this.$store.getters.getNotesStorageById(i)
      //   this.stackNotes.push(Object.assign({}, buf, {
      //   name: buf.name,
      //   todos: JSON.parse(JSON.stringify(buf.todos)) // 3 параметр - конструктор копирования
      //   }))
      // }
      // this.stackNotes = this.copyArrayObjects(array)
      this.stackNotes = this.copyArrayObjects(array)
    },
    copyArrayObjects: function(array) { //убедиться что оно работает
      let newArray = []
      let copyParams = {}
      newArray = array.map(object => {
        copyParams = {}
        for (let key in object) {
          if (object.hasOwnProperty(key)) {
            if (typeof(object[key]) == 'Array') {
              copyParams[key] = JSON.parse(JSON.stringify(object[key]))
            }
            else {
              copyParams[key] = object[key]
            }
          }
        }
        // newArray.push(Object.assign({}, object, copyParams))
        return copyParams
      })
      return newArray
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
</style>
