<template>
  <v-container>
    <v-row>
      <v-col>
        <!-- Login Module -->
        <v-card width="400" class="mx-auto mt-5" elevation="24">
          <v-form v-model="isFormValid">
            <v-card-title>
              <h1 class="display-1 mx-auto">Login</h1>
            </v-card-title>
            <v-card-text>
              <v-text-field
                label="E-mail"
                prepend-icon="mdi-account-circle"
                v-model="email"
                type="email"
                name="email"
                :rules="emailRules"
              />
              <v-text-field
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                v-model="password"
                name="password"
                :rules="[(v) => !!v || 'Password is required']"
              />
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                id="register"
                color="success"
                v-on:click="register"
                :disabled="!isFormValid"
                >Register</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn
                id="login"
                color="info"
                v-on:click="login"
                :disabled="!isFormValid"
                >Login</v-btn
              >
            </v-card-actions>
          </v-form>
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
      password: '',
      isFormValid: false,
      emailRules: [
        (value) => value.indexOf('@') !== 0 || 'Email should have a username.',
        (value) => value.includes('@') || 'Email should include an @ symbol.',
        (value) =>
          value.indexOf('.') - value.indexOf('@') > 1 ||
          'Email should contain a valid domain.',
        (value) =>
          value.includes('.') || 'Email should include a period symbol.',
        (value) =>
          value.indexOf('.') <= value.length - 3 ||
          'Email should contain a valid domain extension.',
      ],
    }
  },
  methods: {
    register: function () {
      this.$store.dispatch('register', {
        email: this.email,
        password: this.password,
        router: this.$router,
      })
    },
    login: function () {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password,
        router: this.$router,
      })
    },
  },
}
</script>
