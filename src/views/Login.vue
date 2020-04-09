<template>
  <v-container>
    <v-row>
      <v-col>
        <!-- Login Module -->
        <v-card width="400" class="mx-auto mt-5" elevation="24">
          <v-card-title>
            <h1 class="display-1 mx-auto">Login</h1>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                label="E-mail"
                prepend-icon="mdi-account-circle"
                v-model="email"
                type="email"
                name="email"
              />
              <v-text-field
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                v-model="password"
                name="password"
              />
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="success" v-on:click="register">Register</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="info" v-on:click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      showPassword: false,
      email: '',
      password: ''
    }
  },
  methods: {
    register: function() {
      this.$store.dispatch('register', {
        email: this.email,
        password: this.password,
        router: this.$router
      })
    },
    login: function() {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password,
        router: this.$router
      })
    }
  }
}
</script>
