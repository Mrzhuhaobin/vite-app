<template>
  <img alt="Vue logo" src="./assets/logo.png"  class="logo"/>
  <HelloWorld msg="123"/>
  <router-link to="/home">home</router-link>
  <div></div>
  <router-link to="/about">about</router-link>
  <div></div>
  <router-link to="/list">list</router-link>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue';

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  }
})
</script>

<style lang="scss">
@import './style/mixins.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>