import { apiHelper } from '../utils/helpers'

export default {
  getTweets: () => {
    return apiHelper.get('/tweets')
  },
  postTweet: ({formData}) => {
    return apiHelper.post('/tweets', formData)
  }
}