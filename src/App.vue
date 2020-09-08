<template>
  <v-app>
    <v-app-bar app color="green" dark>
      <v-toolbar-title>Minesweeper</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-for="link in availableLinks"
        :key="`${link.label}-header-link`"
        color="white"
        text
        rounded
        class="my-2"
        :to="link.url"
        >{{ link.label }}</v-btn
      >
      <v-btn @click="toggleTheme" text rounded>
        Toggle Theme
      </v-btn>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer color="green" padless>
      <v-layout justify-center wrap>
        <v-btn
          v-for="link in availableLinks"
          :key="`${link.label}-footer-link`"
          color="white"
          text
          rounded
          class="my-2"
          :to="link.url"
          >{{ link.label }}</v-btn
        >
        <v-flex green darken-4 lighten-2 py-4 text-center white--text xs12>
          {{ new Date().getFullYear() }} —
          <strong>
            <a href="mailto:jeroig@gmail.com">jeroig@gmail.com</a>
          </strong>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import store from '@/vuex/store'
//import { authComputed } from "@/vuex/helpers.js";

export default {
  name: 'App',
  data() {
    return {
      links: [
        {
          label: 'Login',
          url: '/',
        },
        {
          label: 'Logout',
          url: '/logout',
        },
        {
          label: 'Game',
          url: '/minesweeper',
        },
      ],
    }
  },
  computed: {
    availableLinks() {
      return this.links.filter((link) =>
        store.getters.loggedId
          ? link.label != 'Login'
          : link.label != 'Logout' && link.label != 'Game'
      )
    },
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.themes.dark.anchor = '#41B883'
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
  },
}
</script>
