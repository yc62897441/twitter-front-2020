import { apiHelper } from '../utils/helpers'

export default {
  getRecommendedFollowings: ({ userId }) => {
    const searchParams = new URLSearchParams({ userId })
    return apiHelper.get(`/followships/recommended?${searchParams.toString() }`)
  },
  postFollowship: ({ formData }) => {
    return apiHelper.post('/followships', formData )
  },
  deleteFollowship: ({ followingId }) => {
    return apiHelper.delete(`/followships/${followingId}`)
  }
}