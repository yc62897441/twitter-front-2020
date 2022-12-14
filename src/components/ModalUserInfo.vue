<template>
  <div class="modal fade" v-bind:id="'modalUserInfo'" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="user-info-modal-header">
          <div class="user-info-modal-header-left-wrapper">
            <img src="../assets/icon-close.png" alt="" type="button" data-bs-dismiss="modal" aria-label="Close"
              v-on:click="cancelEdit">
            <div>編輯個人檔案</div>
          </div>
          <div class="user-info-modal-header-right-wrapper">
            <button type="button" class="btn btn-user-info-modal" @click.prevent.stop="handleSubmit"
              v-bind:disabled="isProcessing">儲存</button>
          </div>
        </div>
        <div class="user-info-modal-body">
          <form class="user-info-form">
            <div class="user-info-form-banner-wrapper">
              <img v-bind:src="userNewInfo.banner" alt="" type="file" accept="image/*">
              <div>
                <label for="userNewBanner">
                  <img class="user-info-icon" type="button" src="../assets/icon-photo.png" alt="">
                </label>
                <img class="user-info-icon" type="button" src="../assets/icon-close(white).png"
                  v-on:click="removeBanner" alt="">
              </div>
            </div>
            <div class="user-info-form-avatar-wrapper">
              <img v-bind:src="userNewInfo.avatar" alt="">
              <label for="userNewAvatar">
                <img class="user-info-icon" type="button" src="../assets/icon-photo.png" alt="">
              </label>
            </div>
            <div class="form-row mb-3 user-info-form-row">
              <input v-model="userNewInfo.name" style="background-color:#F5F8FA;" type="text" maxlength="20"
                class="form-control" placeholder="名稱" v-on:keyup='words_deal' required>
              <div class="textContent-span-wrapper">
                <span class="textContent-span textContent-span-warning textContent-span-hidden">字數已達上限!</span>
                <span class="textContent-span textContent-span-hidden"></span>
              </div>
            </div>
            <div class="form-row mb-3 user-info-form-row">
              <textarea cols="30" rows="5" maxlength="140" placeholder="自我介紹" v-model="userNewInfo.introduction"
                v-on:keyup='words_deal'></textarea>
              <div class="textContent-span-wrapper">
                <span class="textContent-span textContent-span-warning textContent-span-hidden">字數已達上限!</span>
                <span class="textContent-span textContent-span-hidden"></span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <input id="userNewBanner" type="file" accept="image/*" name="userNewBanner" v-on:change="handleFileChange">
    <input id="userNewAvatar" type="file" accept="image/*" name="userNewAvatar" v-on:change="handleFileChange">

  </div>
</template>

<script>
import usersAPI from '../api/users'
import { Toast } from '../utils/helpers'
import { mapState } from 'vuex'

export default {
  props: {
    propsUser: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isProcessing: false,
      userNewInfo: {},
      banner: '',
      avatar: '',
      userOriginalInfo: {},
    }
  },
  methods: {
    async handleSubmit(e) {
      try {
        // user name 不可為空白，空白則跳出函式
        if (!this.userNewInfo.name) {
          Toast.fire({
            icon: 'warning',
            title: 'Name 不可為空白'
          })
          this.userNewInfo.name = this.propsUser.name
          return
        }
        // 避免使用者移除 input、textarea 的 maxlength="20"or"140" 屬性
        if (this.userNewInfo.name.length > 20) {
          this.userNewInfo.name = this.userNewInfo.name.slice(0, 20)
        }
        if (this.userNewInfo.introduction.length > 140) {
          this.userNewInfo.introduction = this.userNewInfo.introduction.slice(0, 140)
        }

        // 建立 formData()
        let formData = new FormData()

        // formData 加入 avatar、banner檔案，傳回後端會是 req.body.files(陣列，裡面每個物件都是一張圖)。如果沒有傳入檔案，會是空字串，但不影響流程
        // 如果使用者 cancel banner，此時 this.banner 會是 default banner URL 字串型態，傳回後端會是在 req.body.banner
        if (typeof this.banner === 'object') {
          formData.append("files", this.banner)
        } else if (typeof this.banner === 'string') {
          formData.append('banner', this.banner)
        }
        formData.append("files", this.avatar)

        // 如果 userNewInfo.name、userNewInfo.introduction 不是空白，則加入 formData
        if (this.userNewInfo.name) {
          formData.append('name', this.userNewInfo.name)
        }
        if (this.userNewInfo.introduction) {
          formData.append('introduction', this.userNewInfo.introduction)
        }

        const userId = this.currentUser.id

        Toast.fire({
          icon: 'warning',
          title: '正在更新中，請稍後',
          timer: false
        })

        // 傳送資料到後端
        const response = await usersAPI.putUser({ userId, formData })

        // 錯誤，跳到錯誤處理
        if (response.data.status !== 'success') {
          throw new Error()
        }

        Toast.fire({
          icon: 'success',
          title: '更新成功'
        })

        // 定義要回傳到父層，更新 UserBoard.vue 的資訊
        const emitData = {
          name: this.userNewInfo.name,
          introduction: this.userNewInfo.introduction,
        }
        if (response.data.results) {
          //如 有更新 avatar 或 banner，則 results 至少會有一個物件，將該物件中的 imgurLink 存到 emitData 中
          let avatar = undefined
          let banner = undefined
          response.data.results.forEach(result => {
            if (result.originalname === 'avatar') {
              avatar = result.imgurLink
              emitData.avatar = avatar
            } else if (result.originalname === 'banner') {
              banner = result.imgurLink
              emitData.banner = banner
            }
          })
        }
        if (typeof this.banner === 'string' && this.banner.length > 0) {
          emitData.banner = this.banner
        }

        // 回傳到父層，更新 UserBoard.vue 的資訊
        this.$emit('after-put-userInfo', {
          ...emitData,
        })
        // 回傳到 vuex，更新 currentUser 的資訊
        this.$store.dispatch('afterPutUserInfo', {
          ...emitData,
        })

        // 送出後，清除字數上限提示
        const textContentSpanWrappers = document.querySelectorAll('.textContent-span-wrapper')
        textContentSpanWrappers.forEach(textContentSpanWrapper => {
          textContentSpanWrapper.children[0].classList.add('textContent-span-hidden')
          textContentSpanWrapper.children[1].classList.add('textContent-span-hidden')
        })

        this.avatar = ''
        this.banner = ''
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        let title = '更新失敗，請稍後再試'
        // 如果後端有提供錯誤訊息，以後端為主
        if (error.response.data.message) {
          title = error.response.data.message
        }
        Toast.fire({
          icon: 'error',
          title: title
        })
      }
    },
    handleFileChange(event) {
      const { files } = event.target
      const imageURL = window.URL.createObjectURL(files[0])
      if (event.target.name === 'userNewAvatar') {
        this.userNewInfo.avatar = imageURL
        this.avatar = new File([event.target.files[0]], 'avatar')
      } else if (event.target.name === 'userNewBanner') {
        this.userNewInfo.banner = imageURL
        this.banner = new File([event.target.files[0]], 'banner')
      }
    },
    removeBanner() {
      const defaultBannerURL = 'https://i.imgur.com/wjSOQDI.png'
      this.banner = defaultBannerURL
      this.userNewInfo.banner = defaultBannerURL
    },
    cancelEdit() {
      this.userNewInfo.name = this.userOriginalInfo.name
      this.userNewInfo.introduction = this.userOriginalInfo.introduction
      this.userNewInfo.banner = this.userOriginalInfo.banner
      this.userNewInfo.avatar = this.userOriginalInfo.avatar
    },
    words_deal(event) {
      const maxlength = event.target.attributes.maxlength.value
      const textlength = event.target.value.length

      // 可輸入的字數剩餘 20 字以內時
      if (maxlength - textlength <= 20) {
        // 顯示"目前字數/字數上限" 如 120/140
        event.target.parentElement.children[1].children[1].classList.remove('textContent-span-hidden')
        event.target.parentElement.children[1].children[1].textContent = `${textlength}/${maxlength}`

        // 目前字數>=字數上限時，顯示"字數已達上限"的提示
        if (textlength >= maxlength) {
          event.target.parentElement.children[1].children[0].classList.remove('textContent-span-hidden')
        } else {
          event.target.parentElement.children[1].children[0].classList.add('textContent-span-hidden')
        }
      } else {
        event.target.parentElement.children[1].children[0].classList.add('textContent-span-hidden')
        event.target.parentElement.children[1].children[1].classList.add('textContent-span-hidden')
      }
      return
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  // 自動監控某些屬性，可以帶入兩個值 initialRestaurant(newValue, oldValue)
  // 如果屬性的內容有變更時，就可以去做一些事
  watch: {
    propsUser(newValue) {
      this.userNewInfo = {
        ...this.userNewInfo,
        ...newValue
      }
      this.userOriginalInfo = {
        ...newValue
      }
    }
  },
  created() {
    this.userNewInfo = {
      ...this.userNewInfo,
      ...this.propsUser
    }
    this.userOriginalInfo = {
      ...this.propsUser
    }
    this.banner = this.propsUser.banner
  }
}
</script>

<style>
.user-info-modal-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 15px 15px 0px;
}

.user-info-modal-header-left-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: 700;
  font-size: 19px;
  line-height: 28px;
  color: #1C1C1C;
}

.user-info-modal-header-left-wrapper img {
  width: 15px;
  height: 15px;
  margin-right: 45px;
}

.btn-user-info-modal {
  width: 66px;
  height: 28px;
  font-weight: 500;
  font-size: 18px;
  line-height: 18px;
  color: #FFFFFF;
  background: #FF6600;
  border: 1px solid #FF6600;
  border-radius: 100px;
}

.user-info-modal-body {
  position: relative;
  margin: 15px 15px;
}

.user-info-form-banner-wrapper img {
  position: absolute;
  top: 0px;
  left: -15px;
  width: 498px;
  height: 166px;
  object-fit: cover;
  opacity: 0.75;
}

.user-info-form-banner-wrapper div {
  position: absolute;
  top: 83px;
  left: 50%;
  height: 20px;
  transform: translate(-50%, -50%);
  opacity: 1;
}

.user-info-form-banner-wrapper div .user-info-icon {
  position: static;
  width: 20px;
  height: 20px;
  margin: 0px 18px;
  border-radius: 0px;
}

.user-info-form-avatar-wrapper {
  z-index: 100;
  position: absolute;
  top: 97px;
  left: 0px;
  width: 128px;
  height: 128px;
  background-color: #929292;
  border: 4px solid #FFFFFF;
  border-radius: 50%;
}

.user-info-form-avatar-wrapper img {
  z-index: 99;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  opacity: 0.75;
}

.user-info-form-avatar-wrapper .user-info-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  border-radius: 0px;
  transform: translate(-50%, -50%);
  opacity: 1;
}

.user-info-form :nth-child(3) {
  margin-top: 246px;
}

.user-info-form-row textarea {
  width: 100%;
  margin: 0px;
  margin-bottom: -5px;
  padding: 6px 12px;
  border: 1px solid #ced4da;
  border-radius: 0px 0px 4px 4px;
  background-color: #F5F8FA;
  resize: none;
}

.user-info-form-row:focus,
.user-info-form-row textarea:focus-visible {
  width: 100%;
  outline: none;
}

#userNewBanner,
#userNewAvatar {
  visibility: hidden;
  position: absolute;
}
</style>
