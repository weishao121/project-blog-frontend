import Api from '@/services/api'

export default {
  show(userId) { // Show user detail
    return Api().get(`user/${userId}`)
  },
  edit(user) { // Edit user detail
    return Api().put(`user/${user.id}`, user)
  }
}
