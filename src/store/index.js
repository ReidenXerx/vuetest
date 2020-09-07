import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
// vuex store подключается также как и router, в main.js, который в src
export default new Vuex.Store({

state: {
  notesStorage: []
},

mutations: {
  addNote(state, object) {
    state.notesStorage.push(object)
  },

  deleteNote(state, index) {
    state.notesStorage.splice(index, 1)
  },

  saveNote(state, params) {
    state.notesStorage[params[0]] = params[1]
  }

},

actions: {
  // changeDataSlowly(context, object) {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       context.commit('changeData', object) // мутация
  //       resolve('Изменение случилось!')
  //     }, 1000)
  //   })
  // }
  // loadDataServer(context, id) {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //     axios.get('https://jsonplaceholder.typicode.com/todos', {
  //       params: {
  //         userId: id
  //       }
  //     }).then((response) => {resolve(response)})
  //     }, 1)
  //   })
  // }
  loadDataServer(context, [from, to]) {
    axios.get('https://jsonplaceholder.typicode.com/todos').then((response) => {
        for (var i = from; i < to; i++) {
          context.commit('addNote', {
            name: `name ${i}`,
            todos: response.data.filter((element) => {
              if (element.userId == i) {
                return true
              }
            }).map(element => {
              return { text: element.title, done: element.completed }
            }).concat()
          })
        }
    })
  }
},
getters: {
  getNotesStorage: (state) => state.notesStorage,

  getCountNotes: (state) => state.notesStorage.length,

  getNotesStorageById: (state) => (id) => {
    return state.notesStorage.length > 0 ? state.notesStorage[id] : {} //задокументировать
  }

}

})
