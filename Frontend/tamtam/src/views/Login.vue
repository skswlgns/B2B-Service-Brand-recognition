<template>
  <div class="background">
    <div class="Logo">TamTam</div>
    <div class="signup">
      <div class="signup-classic">
        <h1>Log in to your account</h1>
        <div class="form">
          <fieldset class="email">
            <input v-model="loginData.company_email" type="email" placeholder="useremail" />
          </fieldset>
          <fieldset class="password">
            <input
              v-model="loginData.company_pwd"
              type="password"
              placeholder="password"
              @keypress.enter="login(loginData)"
            />
          </fieldset>
          <button class="btn" @click="login(loginData)">Log In</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
const userStore = 'userStore'

export default {
  name: 'Login',
  data() {
    return {
      loginData: {
        company_email: '',
        company_pwd: ''
      }
    }
  },
  methods: {
    ...mapActions(userStore, ['login'])
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/login.scss';
</style>
