<template>
  <Header></Header>
  <pre-loader />
  <router-view/>
</template>
<script>
import Header from './components/Header.vue'
export default {
  components:{
    Header,
  }
}
</script>
<style lang="scss">
@import "./fonts.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #C4C4C4;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #C4C4C4;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>
