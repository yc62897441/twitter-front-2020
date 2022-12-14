import { apiHelper } from '../utils/helpers'

export default {
  getRecommendedFollowings: () => {
    return apiHelper.get(`/followships/recommended`)
  },
  // 在後端尚未完成 JWT 驗證回傳 req.user 前，用網址帶入 currentUser.id 傳給後端 req.query.userId
  // getRecommendedFollowings: ({ userId }) => {
  //   const searchParams = new URLSearchParams({ userId })
  //   return apiHelper.get(`/followships/recommended?${searchParams.toString() }`)
  // },
  postFollowship: ({ formData }) => {
    return apiHelper.post('/followships', formData)
  },
  deleteFollowship: ({ followingId }) => {
    return apiHelper.delete(`/followships/${followingId}`)
  }
}