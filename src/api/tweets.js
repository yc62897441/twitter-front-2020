import { apiHelper } from '../utils/helpers'

export default {
  getTweets: () => {
    return apiHelper.get('/tweets')
  },
  getTweet: ({id}) => {
    return apiHelper.get(`/tweets/${id}`)
  },
  postTweet: ({formData}) => {
    return apiHelper.post('/tweets', formData)
  },
  postTweetReply: ({ formData, tweetId }) => {
    return apiHelper.post(`/tweets/${tweetId}/replies`, formData)
  }
}