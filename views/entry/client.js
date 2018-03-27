import Vue from 'vue'
import { createApp } from './main.js'
const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

Vue.mixin({
  brforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      })
      .then(nexr).catch(next)
    } else {
      next()
    }
  }
})

router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diff = false
    const activated = matched.filter((c, i) => {
      return diff || (diff = (prevMatched[i] !== c))
    })
    if (!activated.length) {
      next()
    }
    Promise.all(activated.map(c => {
      if (c.asyncData) {
        return c.asyncData({store, route: to})
      }
    })).then(() => {
      next()
    })
    .catch(next)
  })
  app.$mount('#app')
})