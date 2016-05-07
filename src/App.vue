<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
//  testList, testDetails,
export default {
  name: 'App',
  data () {
    return {
      str: '1234',
    }
  },
  created () {

  },
  methods: {}
}
</script>

<style>
html,
body {
  height: 100%;
}
body {
  margin: 0;
}
p {
  margin: 0;
}
#app {
  height: 100%;
}
</style>
