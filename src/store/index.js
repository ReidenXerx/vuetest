import Vue from 'vue'
import Vuex from 'vuex'

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
  changeDataSlowly(context, object) {
    return new Promise((resolve) => {
      setTimeout(() => {
        context.commit('changeData', object) // мутация
        resolve('Изменение случилось!')
      }, 1000)
    })
  }
},
getters: {
  getNotesStorage: (state) => {
    return state.notesStorage
  },

  getCountNotes: (state) => {
    return state.notesStorage.length
  },

  getNotesStorageById: (state) => (id) => {
    return state.notesStorage.length > 0 ? state.notesStorage[id] : {} //задокументировать
  }

}

})
