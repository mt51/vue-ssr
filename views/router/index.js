import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter() {
  return new Router({
    modes: 'history',
    routes: [{
      path: '/', component: () => import('@/components/Foo.vue')
    }]
  })
}
