<template>
  <div>
    dsfklsjdkl
    <button @click="goLogin()">서비스 이용하기</button>
  </div>
</template>

<script>
export default {
  methods: {
    goLogin() {
      this.$router.push('/login').catch(() => {})
    }
  }
}
</script>

<style>
/* dleks */
</style>
