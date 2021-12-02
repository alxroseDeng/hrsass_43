import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'
const state = {
  token: getToken() // 设置token为共享状态，初始化vuex的时候，就先从缓存中读取
}
const mutations = {
  setToken(state, token) {
    state.token = token
    // 同步给缓存
    setToken(token)
  },
  removeToken(state) {
    state.token = null
    removeToken() // 同步给缓存
  }
}
const actions = {
  async login(context, data) {
    // 调用api接口
    const result = await login(data)
    if (result.data.success) {
      context.commit('setToken', result.data.data)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
