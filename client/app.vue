<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <!-- <p>{{fullName}} {{count}}  -->
      <!-- {{testA}} -->
    <!-- </p> -->
    <!-- <router-link to="app">app</router-link> -->
    <router-link to="test">test</router-link>

    <!-- <Todo></Todo> -->
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Header,
    Footer
  },
  mounted () {
    // (function (doc, win) {
    //   console.log('rem.js')
    //   let docEl = doc.documentElement
    //   let resizeEvt =
    //     'orientationchange' in window ? 'orientationchange' : 'resize'
    //   let recalc = function () {
    //     var clientWidth = docEl.clientWidth
    //     if (!clientWidth) return
    //     docEl.style.fontSize = 20 * (clientWidth / 375) + 'px'
    //   }
    //   if (!doc.addEventListener) return
    //   recalc() // 这里要先执行一次
    //   win.addEventListener(resizeEvt, recalc, false)
    //   doc.addEventListener('DOMContentLoaded', recalc, false)
    // })(document, window)
  },
  computed: {
    ...mapGetters(['fullName']),
    // ...mapGetters({   getters想修改数据不能这么写
    //   fullName: (state) => state.fullName + ' burgess'
    // }),
    // ...mapState(['count'])
    // 下面这种方式更利于修改数据
    ...mapState({
      count: state => state.count + 5
    })
    // testA () {
    //   return this.$store.state.a.text
    // }
  },
  created () {
    this.updateAsync({
      num: 100,
      time: 2000
    })
    // let count = 0
    // console.log(this.$store)
    // setInterval(() => {
    //   this.aa = this.$store.commit('updateCount', count++)
    // }, 1000)
  },
  methods: {
    // 引入actions中的方法，在created里面去调用这个方法
    ...mapActions(['updateAsync'])
  }
}
</script>

<style lang="stylus" scoped>
#app {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

#cover {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #999;
  opacity: 0.9;
  z-index: -1;
}
</style>


