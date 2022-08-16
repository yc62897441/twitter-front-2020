import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getUser: ({ userId }) => {
    return apiHelper.get(`users/${userId}`)
  },
  getCurrentUser: () => {
    return apiHelper.get('get_current_user', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  putUser: ({ userId, formData }) => {
    return apiHelper.put(`users/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  putSetting: ({ formData }) => {
    return apiHelper.put('users/setting', formData)
  },
  getUserTweets: ({ userId }) => {
    return apiHelper.get(`users/${userId}/tweets`)
  },
  getUserRepliedTweets: ({ userId }) => {
    return apiHelper.get(`users/${userId}/replied_tweets`)
  },
  getUserLikes: ({ userId }) => {
    return apiHelper.get(`users/${userId}/likes`)
  },
  getUserFollowings: ({ userId }) => {
    return apiHelper.get(`users/${userId}/followings`)
  },
  getUserFollowers: ({ userId }) => {
    return apiHelper.get(`users/${userId}/followers`)
  },
}