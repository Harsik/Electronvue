<template>
  <div id="app">
    <v-app dark>
      <v-navigation-drawer
        fixed
        v-model="drawer"
        app
      >
        <v-list>
          <v-list-tile
            router
            :to="navMenu.to"
            :key="i"
            v-for="(navMenu, i) in navMenus"
          >
            <v-list-tile-action>
              <v-icon v-html="navMenu.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="navMenu.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar fixed app :clipped-left="clipped">
        <v-toolbar-side-icon @click.native.stop="drawer = !drawer" v-if='isAuthenticated'></v-toolbar-side-icon>
        <v-toolbar-title v-text="appTitle"></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items v-if='!isAuthenticated'>
          <v-btn flat to='/login'>Login</v-btn>
          <v-btn flat to='/signup'>Sign up</v-btn>
        </v-toolbar-items>
        <v-toolbar-items v-if='isAuthenticated'>
          <v-layout align-center justify-space-between>
          <!-- <v-icon large>notification_important</v-icon> -->
          <!-- <v-icon large>more_vert</v-icon> -->
          <v-menu offset-y>
            <v-btn slot="activator" icon>
              <v-icon large>more_vert</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile v-for="(subMenu, i) in subMenus" :key='i' :to='subMenu.to'>
                <v-list-tile-title>{{ subMenu.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
          </v-layout>
          <!-- <v-btn flat to='/logout'>Logout</v-btn>
          <v-btn flat to='/profile'>Profile</v-btn> -->
        </v-toolbar-items>
      </v-toolbar>
      <v-content>
        <v-container fluid fill-height>
          <v-slide-y-transition mode="out-in">
            <router-view :isAuthenticated='isAuthenticated' @sendAuthenticated="getAuthenticated"></router-view>
          </v-slide-y-transition>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
  export default {
    // props: ['currentUser'],
    name: 'Charlie',
    data: () => ({
      appTitle: 'AppTitle',
      isAuthenticated: false,
      currentUser: false,
      clipped: false,
      drawer: false,
      navMenus: [
        { icon: 'apps', title: 'Welcome', to: '/' },
        { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' },
        { icon: 'title', title: 'test', to: '/test' }
      ],
      subMenus: [
        { title: 'Profile', to: '/profile' },
        { title: 'Setting', to: '/setting' },
        { title: 'Logout', to: '/logout' }
      ]
    }),
    methods: {
      getAuthenticated (text) {
        this.isAuthenticated = text
      },
      on () {}
    }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
  /* Global CSS */
</style>