<template>
  <v-row>
    <v-col>
      <v-row align="center" justify="center">
        <v-alert
          border="top"
          colored-border
          color="light-green darken-1"
          elevation="5"
          dense
          icon="mdi-alert-circle-outline"
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
      default: 'light-green darken-1'
    },
    icon: {
      type: String,
      default: 'mdi-alert-circle-outline'
    },
    message: {
      type: String,
      required: true
    }
  }
}
</script>

<style></style>
