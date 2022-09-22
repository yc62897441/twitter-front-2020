<template>
  <div class="container">
    <div class="left-container">
      <Navbar class="Navbar" v-bind:currentUser="currentUser" />
    </div>

    <div class="middle-container">
      <div class="middle-container-wrapper">
        <div class="middle-container-arrow-wrapper">
          <img src="../assets/arrow-left.png" type="button" v-on:click="hasHistory" alt="">
        </div>
        <div class="middle-container-page-title-wrapper">
          <h1>{{ user.name }}</h1>
          <h3>{{ user.tweetsNum }}則推文</h3>
        </div>
      </div>
      <UserBoard v-bind:propsUser="user" v-bind:currentUser="currentUser" v-on:after-put-userInfo="afterPutUserInfo"
        v-on:after-post-followship="afterPostFollowship" v-on:after-delete-followship="afterDeleteFollowship" />
      <UserNavPills v-on:after-change-user-nav-pills="afterChangeUserNavPills" />
      <TweetsSection class="User-TweetsSection" v-bind:propsTweets="tweets"
        v-on:after-post-tweet-reply="afterPostTweetReply" v-on:after-like-tweet="afterLikeTweet"
        v-on:after-unlike-tweet="afterUnlikeTweet" v-on:load-more="loadMore" />
      <RepliesSection class="User-RepliesSection User-Section-hidden" v-bind:replies="replies" />
      <LikesSection class="User-LikesSection User-Section-hidden" v-bind:prosLikes="likes"
        v-on:after-post-tweet-reply="afterPostTweetReply" v-on:after-like-tweet="afterLikeTweet"
        v-on:after-unlike-tweet="afterUnlikeTweet" />
      <ModalNewTweet v-bind:currentUser="currentUser" v-on:after-post-new-tweet="afterPostNewTweet" />
    </div>

    <div class="right-container">
      <FollowingsBar class="FollowingsBar" v-bind:currentUser="currentUser"
        v-on:after-post-followship="afterPostFollowship" v-on:after-delete-followship="afterDeleteFollowship" />
    </div>

  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import FollowingsBar from '../components/FollowingsBar.vue'
import UserBoard from '../components/UserBoard.vue'
import UserNavPills from '../components/UserNavPills.vue'
import TweetsSection from '../components/TweetsSection.vue'
import RepliesSection from '../components/RepliesSection.vue'
import LikesSection from '../components/LikesSection.vue'
import ModalNewTweet from '../components/ModalNewTweet.vue'
import usersAPI from '../api/users'
import tweetsAPI from '../api/tweets'
import { mapState } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import { Toast } from '../utils/helpers'

export default {
  components: {
    Navbar,
    FollowingsBar,
    UserBoard,
    UserNavPills,
    TweetsSection,
    RepliesSection,
    LikesSection,
    ModalNewTweet,
  },
  data() {
    return {
      user: {},
      tweets: [],
      replies: [],
      likes: [],
      tweetsOffset: 0
    }
  },
  methods: {
    async fetchUser(userId) {
      try {
        const response = await usersAPI.getUser({ userId })
        if (response.status !== 200) {
          throw new Error()
        }
        const data = response.data
        this.user = {
          ...data,
        }
      } catch (error) {
        console.warn(error)
        Toast.fire({
          icon: 'error',
          title: '找不到該位 User',
          timer: 2000,
        })
        this.$router.push({ name: 'not-found' })
        setTimeout(() => {
          this.$router.go(-2)
        }, 1000)
      }
    },
    async fetchUserTweets(userId) {
      try {
        const tweetsOffset = this.tweetsOffset || 0
        this.tweetsOffset = this.tweetsOffset + 3
        const response = await usersAPI.getUserTweets({ userId, tweetsOffset })
        const data = response.data
        data.forEach(tweet => {
          this.tweets.push(tweet)
        })
      } catch (error) {
        console.warn(error)
      }
    },
    async fetchReplies(userId) {
      try {
        const { data } = await usersAPI.getUserRepliedTweets({ userId })
        this.replies = data
      } catch (error) {
        console.warn(error)
      }
    },
    async fetchLikes(userId) {
      try {
        const { data } = await usersAPI.getUserLikes({ userId })
        this.likes = data
      } catch (error) {
        console.warn(error)
      }
    },
    afterChangeUserNavPills(payload) {
      const nowCheckedSection = payload.value
      const UserTweetsSection = document.querySelector('.User-TweetsSection')
      const UserRepliesSection = document.querySelector('.User-RepliesSection')
      const UserLikesSection = document.querySelector('.User-LikesSection')
      switch (nowCheckedSection) {
        case 'user-nav-pills-tweets':
          UserTweetsSection.classList.remove('User-Section-hidden')
          UserRepliesSection.classList.add('User-Section-hidden')
          UserLikesSection.classList.add('User-Section-hidden')
          break
        case 'user-nav-pills-tweetsAndReplies':
          UserTweetsSection.classList.add('User-Section-hidden')
          UserRepliesSection.classList.remove('User-Section-hidden')
          UserLikesSection.classList.add('User-Section-hidden')
          break
        case 'user-nav-pills-likes':
          UserTweetsSection.classList.add('User-Section-hidden')
          UserRepliesSection.classList.add('User-Section-hidden')
          UserLikesSection.classList.remove('User-Section-hidden')
          break
      }
    },
    afterPostNewTweet(payload) {
      this.tweets.unshift({
        Likes: [],
        Replies: [],
        User: {
          account: this.currentUser.account,
          avatar: this.currentUser.avatar,
          banner: this.currentUser.banner,
          id: this.currentUser.id,
          introduction: this.currentUser.introduction,
          name: this.currentUser.name,
          role: this.currentUser.role,
        },
        UserId: this.currentUser.id,
        createdAt: Date.now(),
        description: payload.description,
        id: payload.tweetId,
        likesLength: 0,
        repliesLength: 0,
        updatedAt: Date.now(),
      })
      Toast.fire({
        icon: 'success',
        title: '推文發送成功'
      })
    },
    afterPostTweetReply(payload) {
      this.replies.unshift({
        User: {
          id: this.currentUser.id,
          avatar: this.currentUser.avatar,
          account: this.currentUser.account,
          name: this.currentUser.name
        },
        Tweet: {
          ...payload.Tweet,
        },
        id: payload.id,
        comment: payload.comment,
        createdAt: payload.createdAt
      })
      Toast.fire({
        icon: 'success',
        title: '回覆發送成功'
      })
    },
    afterPutUserInfo(payload) {
      // 更新畫面上的 tweets、replies、likes、user name
      this.tweets.forEach(tweet => {
        tweet.User.name = payload.name
        tweet.User.avatar = !payload.avatar ? this.currentUser.avatar : payload.avatar
      })
      this.replies.forEach(reply => {
        reply.User.name = payload.name
        reply.User.avatar = !payload.avatar ? this.currentUser.avatar : payload.avatar
      })
      this.likes.forEach(like => {
        if (like.Tweet.User.id === this.currentUser.id) {
          like.Tweet.User.name = payload.name
          like.Tweet.User.avatar = !payload.avatar ? this.currentUser.avatar : payload.avatar
        }
      })
      this.user.name = payload.name
    },
    hasHistory() {
      this.$router.go(-1)
    },
    afterPostFollowship(payload) {
      if (payload.situation === 'atCurrentUserPage') {
        this.user.Followings.push(Number(payload.followingId))
      } else if (payload.situation === 'atOtherUserPage') {
        this.user.Followers.push(Number(payload.followerId))
      }
    },
    afterDeleteFollowship(payload) {
      if (payload.situation === 'atCurrentUserPage') {
        const tempUserFollowings = []
        this.user.Followings.forEach(following => {
          if (following !== payload.followingId) {
            tempUserFollowings.push(following)
          }
        })
        this.user.Followings = tempUserFollowings
      } else if (payload.situation === 'atOtherUserPage') {
        const tempUserFollowers = []
        this.user.Followers.forEach(follower => {
          if (follower !== payload.followerId) {
            tempUserFollowers.push(follower)
          }
        })
        this.user.Followers = tempUserFollowers
      }
    },
    afterLikeTweet(payload) {
      // 從 TweetsSection emit
      if (payload.from === 'TweetsSection') {
        const likesLength = payload.likesLength
        let isNewLikedTweetAlreadyInLikes = false
        // 確認被喜歡的 tweet，是否已經在 this.likes 中了
        this.likes.forEach(like => {
          if (like.Tweet.id === payload.newLikedTweet.id) {
            isNewLikedTweetAlreadyInLikes = true
            // 如果已經在 this.likes 中，把最新的 tweet 的喜歡次數(likesLength) 覆寫過去
            like.Tweet.likesLength = likesLength
          }
        })
        // 如果還不在 this.likes 中，unshift 到 this.likes 中
        if (!isNewLikedTweetAlreadyInLikes) {
          this.likes.unshift({
            Tweet: {
              ...payload.newLikedTweet,
            }
          })
        }
      }
      // 從 LikesSection emit
      if (payload.from === 'LikesSection') {
        const likesLength = payload.likesLength
        const likeTweetId = payload.likeTweetId
        // 如果被喜歡的 tweet，是使用者 this.tweets 裡面的 tweet，則把最新的 tweet 的喜歡次數(likesLength) 覆寫過去
        this.tweets.forEach(tweet => {
          if (tweet.id === likeTweetId) {
            tweet.likesLength = likesLength
          }
        })
      }
    },
    afterUnlikeTweet(payload) {
      const unlikeTweetId = payload.unlikeTweetId
      const likesLength = payload.likesLength
      const tempLikes = []
      // 從 TweetsSection emit
      if (payload.from === 'TweetsSection') {
        // 被 unlike 的 tweet，如果在 this.likes 中，則把該個 like 刪除 
        this.likes.forEach(like => {
          if (like.Tweet.id !== unlikeTweetId) {
            tempLikes.push(like)
          }
        })
        this.likes = tempLikes
      }
      // 如果被 unlike 的 tweet，是使用者 this.tweets 裡面的 tweet，則把最新的 tweet 的喜歡次數(likesLength) 覆寫過去
      this.tweets.forEach(tweet => {
        if (tweet.id === unlikeTweetId) {
          tweet.likesLength = likesLength
        }
      })
    },
    loadMore() {
      const userId = this.$route.params.id
      this.fetchUserTweets(userId)
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  mounted() {
    const userId = this.$route.params.id
    this.fetchUser(userId)
    this.fetchUserTweets(userId)
    this.fetchReplies(userId)
    this.fetchLikes(userId)
  },
  beforeRouteUpdate(to, from, next) {
    const userId = to.params.id
    this.fetchUser(userId)
    this.fetchUserTweets(userId)
    this.fetchReplies(userId)
    this.fetchLikes(userId)
    next()
  }
}
</script>

<style>
.User-Section-hidden {
  display: none;
}
</style>