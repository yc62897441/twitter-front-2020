import { apiHelper } from '../utils/helpers'

export default {
  signIn({ email, password }) {
    return apiHelper.post('/signin', {
      email,
      password
    })
  },
  signUp({ account, name, email, password, checkPassword }) {
    return apiHelper.post('/users', {
      account, name, email, password, checkPassword
    })
  }
}
