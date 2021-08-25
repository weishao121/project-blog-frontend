import Api from '@/services/api'

export default {
  show(userId) {
    return Api().get(`user/${userId}`)
  }
}
