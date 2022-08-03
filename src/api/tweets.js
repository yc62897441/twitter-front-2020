import { apiHelper } from '../utils/helpers'

export default {
  getTweets: () => {
    return apiHelper.get('/tweets')
  },
  getTweet: ({ id }) => {
    return apiHelper.get(`/tweets/${id}`)
  },
  postTweet: ({ formData }) => {
    return apiHelper.post('/tweets', formData)
  },
  getTweetReplies: ({ tweetId }) => {
    return apiHelper.get(`/tweets/${tweetId}/replies`)
  },
  postTweetReply: ({ formData, tweetId }) => {
    return apiHelper.post(`/tweets/${tweetId}/replies`, formData)
  },
  likeTweet: ({ tweetId }) => {
    return apiHelper.post(`tweets/${tweetId}/like`)
  },
  unlikeTweet: ({ tweetId }) => {
    return apiHelper.post(`tweets/${tweetId}/unlike`)
  },
}