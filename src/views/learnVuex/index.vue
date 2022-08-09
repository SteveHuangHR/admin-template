<template>
  <div>
    <!-- <div>{{ $store.state.count }}</div> -->
    <!-- <div>{{ $store.state.age }}</div> -->
    <div>{{ count }}</div>
    <div>{{ age }}</div>
    <div>{{ name }}</div>
    <!-- <button @click="$store.commit('add')">点击</button> -->
    <!-- <button @click="$store.commit('addN',5)">点击5</button> -->
    <button @click="add">点击</button>
    <button @click="addN(5)">点击5</button>
    <!-- <button @click="$store.dispatch('addSync')">点击6</button> -->
    <button @click="addSync">点击</button>
    <button @click="addSyncN(10)">点击</button>
    <div>{{ showCount }}</div>
    <!-- 访问模块当中的数据和方法 -->
    <!-- <div>num={{ $store.state.test.num }}</div> -->
    <!-- <button @click="$store.commit('addNum',5)">点击</button> -->
    <!-- 调用时加模块名前缀 -->
    <!-- <button @click="$store.commit('test/addNum', 6)">点击</button> -->
    <div>num={{ num }}</div>
    <button @click="addNum(6)">点击</button>
    <button @click="addNumSync(10)">点击</button>
    <button @click="addNumSync(15)">点击</button>
    <!-- 图标使用 -->
    <div>
      <svg-icon icon-class="eye" class-name="color-red"></svg-icon>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions, mapGetters } from 'vuex'
export default {
  name: '',
  props: {},
  data() {
    return {}
  },
  // 通过映射的方式使用state
  computed: {
    ...mapState(['count', 'age', 'name']),
    ...mapGetters(['showCount']),
    ...mapState('test', ['num'])
  },
  methods: {
    ...mapMutations(['add', 'addN']),
    ...mapActions(['addSync', 'addSyncN']),
    ...mapMutations('test', ['addNum']),
    ...mapActions('test', ['addNumSync'])
  }
}
</script>

<style lang="scss" scoped>
.color-red {
  color: red;
}
</style>
