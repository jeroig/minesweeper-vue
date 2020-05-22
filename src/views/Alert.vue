<template>
  <v-row>
    <v-col>
      <v-row align="center" justify="center">
        <v-alert
          border="top"
          colored-border
          :color="this.color"
          elevation="5"
          dense
          :icon="this.icon"
        >
          {{ this.message }}
        </v-alert>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    color: {
      type: String,
      default: 'light-blue darken-3',
    },
    icon: {
      type: String,
      default: 'mdi-gamepad',
    },
    message: {
      type: String,
      required: true,
    },
  },
}
</script>

<style></style>
