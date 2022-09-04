<template>
  <transition>
    <div v-show="show" class="preloader">
      <img src="../assets/Loader.png" alt="" />
    </div>
  </transition>
</template>
<script>
export default {
    name:'preloader',
    data(){
        return{
            show:true
        }
    },
    mounted(){
        this.showToggle()
    },
    methods:{
        showToggle(){
            setTimeout(()=>{
                this.show = false
            },100)
        }
    }
}
</script>

<style lang="scss" scoped>
.preloader {
  position: absolute;
  display: flex;
  vertical-align: middle;
  align-items: center;
  justify-content: center;
  left: 0;
    top: 0;
    bottom: 0;
    right: 0;
  z-index: 20;
}
</style>
