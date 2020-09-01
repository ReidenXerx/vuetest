<template>
  <div id="app">
    <router-view/>
    <!-- роутер-вью - это объект в котором отображается компонент согласно маршруту -->
    <!-- то есть, внутри апп.вью по маршруту / рисуется компонент хоум.вью и т.п. -->
    <!-- а еще при переходе на другой маршрут значения переменных в компоненте текущего маршрута сбрасываются -->
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  mounted() {
    for (var i = 0; i < 10; i++) {
      // this.stackNotes.push({
      //   name: `name ${i}`,
      //   todos: [
      //     { text: `text-1 for ${i}'s note`, done: false },
      //     { text: `text-2 for ${i}'s note`, done: false },
      //     { text: `text-3 for ${i}'s note`, done: false }
      //   ]
      // })
      this.$store.commit('addNote', {
        name: `name ${i}`,
        todos: [
          { text: `text-1 for ${i}'s note`, done: false },
          { text: `text-2 for ${i}'s note`, done: false },
          { text: `text-3 for ${i}'s note`, done: false }
        ]
      })
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
