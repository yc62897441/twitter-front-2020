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
  getUserTweets: ({ userId, tweetsOffset }) => {
    const searchParams = new URLSearchParams({ tweetsOffset })
    return apiHelper.get(`users/${userId}/tweets?${searchParams.toString()}`)
  },
  getUserRepliedTweets: ({ userId, repliesOffset }) => {
    const searchParams = new URLSearchParams({ repliesOffset })
    return apiHelper.get(`users/${userId}/replied_tweets?${searchParams.toString()}`)
  },
  getUserLikes: ({ userId, likesOffset }) => {
    const searchParams = new URLSearchParams({ likesOffset })
    return apiHelper.get(`users/${userId}/likes?${searchParams.toString()}`)
  },
  getUserFollowings: ({ userId }) => {
    return apiHelper.get(`users/${userId}/followings`)
  },
  getUserFollowers: ({ userId }) => {
    return apiHelper.get(`users/${userId}/followers`)
  }
}