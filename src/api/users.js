import { apiHelper } from '../utils/helpers'

export default {
  getUser: ({ userId }) => {
    return apiHelper.get(`users/${userId}`)
  },
  putUser: ({ userId, formData }) => {
    return apiHelper.put(`users/${userId}`, formData)
  },
  getUserRepliedTweets: ({ userId }) => {
    return apiHelper.get(`users/${userId}/replied_tweets`)
  }
}