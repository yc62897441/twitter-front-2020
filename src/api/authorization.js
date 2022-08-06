import { apiHelper } from '../utils/helpers'

export default {
  signIn({ email, password }) {
    return apiHelper.post('/users/signin', {
      email,
      password
    })
  },
  signUp({ account, name, email, password, checkPassword }) {
    return apiHelper.post('/users', {
      account, name, email, password, checkPassword
    })
  },
  signInAdmin({ email, password }) {
    return apiHelper.post('/admin/users/signin', {
      email,
      password
    })
  },
  getTweets() {
    return apiHelper.get('/admin/tweets')
  },
  deleteTweet({tweetId}) {
    return apiHelper.delete(`/admin/tweets/${tweetId}`)
  },
}
