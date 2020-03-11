<template>
  <v-app>
    <v-app-bar app color="green" dark>
      <v-toolbar-title>Minesweeper Game</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-for="link in links"
        :key="`${link.label}-header-link`"
        color="white"
        text
        rounded
        class="my-2"
        :to="link.url"
      >
        {{ link.label }}
      </v-btn>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer color="green" padless>
      <v-layout justify-center wrap>
        <v-btn
          v-for="link in links"
          :key="`${link.label}-footer-link`"
          color="white"
          text
          rounded
          class="my-2"
          :to="link.url"
        >
          {{ link.label }}
        </v-btn>
        <v-flex green darken-4 lighten-2 py-4 text-center white--text xs12>
          {{ new Date().getFullYear() }} —
          <strong
            ><a href="mailto:jeroig@gmail.com">jeroig@gmail.com</a></strong
          >
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      links: [
        {
          label: "Home",
          url: "/"
        },
        {
          label: "Login",
          url: "/login"
        }
      ]
    };
  }
};
</script>
