<template>
  <div class="modal fade" v-bind:id="'modalUserInfo'" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="user-info-modal-header">
          <div class="user-info-modal-header-left-wrapper">
            <img src="../assets/icon-close.png" alt="" type="button" data-bs-dismiss="modal" aria-label="Close">
            <div>編輯個人檔案</div>
          </div>
          <div class="user-info-modal-header-right-wrapper">
            <button type="button" class="btn btn-user-info-modal" aria-label="Close" @click.prevent.stop="handleSubmit"
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
                <img class="user-info-icon" type="button" src="../assets/icon-close(white).png" alt="">
              </div>
            </div>
            <div class="user-info-form-avatar-wrapper">
              <img v-bind:src="userNewInfo.avatar" alt="">
              <label for="userNewAvatar">
                <img class="user-info-icon" type="button" src="../assets/icon-photo.png" alt="">
              </label>
            </div>
            <div class="form-row mb-3 user-info-form-row">
              <input v-model="userNewInfo.name" style="background-color:#F5F8FA;" type="text" class="form-control"
                placeholder="名稱" required>
            </div>
            <div class="form-row mb-3 user-info-form-row">
              <textarea cols="30" rows="5" placeholder="自我介紹" v-model="userNewInfo.introduction"></textarea>
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

export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isProcessing: false,
      userId: 1,
      userNewInfo: {}
    }
  },
  methods: {
    async handleSubmit() {
      try {
        this.isProcessing = true
        const userId = this.userId

        const formData = {
          name: this.userNewInfo.name,
          introduction: this.userNewInfo.introduction,
        }
        const { data } = await usersAPI.putUser({ userId, formData })
        
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.warn(error)
      }
    },
    handleFileChange(event) {
      const { files } = event.target
      const imageURL = window.URL.createObjectURL(files[0])
      if (event.target.name === 'userNewAvatar') {
        this.userNewInfo.avatar = imageURL
      } else if (event.target.name === 'userNewBanner') {
        this.userNewInfo.banner = imageURL
      }
    },
  },
  // 自動監控某些屬性，可以帶入兩個值 initialRestaurant(newValue, oldValue)
  // 如果屬性的內容有變更時，就可以去做一些事
  watch: {
    user(newValue) {
      this.userNewInfo = {
        ...this.userNewInfo,
        ...newValue
      }
    }
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
  margin-top: 190px;
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
