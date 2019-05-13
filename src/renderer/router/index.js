import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome-view',
      component: require('@/components/WelcomeView').default
    },
    {
      path: '/inspire',
      name: 'inspire',
      component: require('@/components/InspireView').default
    },
    {
      path: '/test',
      name: 'test',
      component: require('@/components/test').default
    },
    {
      path: '/testFile',
      name: 'testFile',
      component: require('@/components/testFile').default
    },
    {
      path: '/login',
      name: 'Login',
      component: require('@/components/Login').default
    }, {
      path: '/logout',
      name: 'Logout',
      component: require('@/components/Logout').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
