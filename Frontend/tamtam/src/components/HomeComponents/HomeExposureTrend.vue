<template>
  <div>
    {{}}
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import axios from 'axios'
// import cookies from 'vue-cookies'

export default {
  name: 'HomeChannelRanking',
  data() {
    return {
      tamtamRecommandChannel: {}
    }
  },
  async created() {},
  computed: {
    ...mapState('chartDataStore', ['companyData'])
  },
  methods: {
    subScribeCnt(count) {
      if (count < 1000) return count + '명'
      else if (count < 10000) {
        count = parseInt(count / 1000)
        return count + '천명'
      } else {
        count = parseInt(count / 10000)
        return count + '만명'
      }
    },
    videoCnt(count) {
      if (count < 1000) return count + '개'
      else if (count < 10000) {
        count = parseInt(count / 1000)
        return count + '천개'
      } else {
        count = parseInt(count / 10000)
        return count + '만개'
      }
    },
    videoAvgCnt(count) {
      if (count < 1000) return count + '명'
      else if (count < 10000) {
        count = parseInt(count / 1000)
        return count + '천명'
      } else {
        count = parseInt(count / 10000)
        return count + '만명'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.today-recommand {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.today-recommand-title {
  margin-top: 8px;
  font-size: 1.5rem;
  font-weight: 500;
}

.today-recommand-category {
  font-weight: 300;
  margin-bottom: 16px;
}

.today-recommand-main {
  display: flex;
}

.today-recommand-leftbox {
  display: flex;
  flex-direction: column;
}

.today-recommand-rightbox {
  display: flex;
  flex-direction: column;
}

.today-recommand-subtitle {
  font-weight: 300;
  margin-right: 16px;
}
</style>
