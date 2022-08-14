<template>
  <div class="container">
    <div class="left-container">
      <!-- <Navbar class="Navbar" v-bind:currentUser="currentUser" /> -->
    </div>

    <div class="middle-container">

      <body>

        <form>
          <textarea col="30" rows="5" maxlength="140" placeholder="推你的回覆" v-on:keyup='words_deal'></textarea>
          <div class="textContent-span-wrapper">
            <span class="textContent-span textContent-span-hidden">字數已達上限!</span>
            <span class="textContent-span"></span>
          </div>
        </form>





      </body>

    </div>

    <div class="right-container">
      <!-- <FollowingsBar class="FollowingsBar" v-bind:currentUser="currentUser" /> -->
    </div>

  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import FollowingsBar from '../components/FollowingsBar.vue'

export default {
  components: {
    Navbar,
    FollowingsBar,
  },
  data() {
    return {
    }
  },
  methods: {
    words_deal(event) {
      const maxlength = event.target.attributes.maxlength.value
      const textlength = event.target.value.length
      console.log(event.target.parentElement.children[1].children[1])
      event.target.parentElement.children[1].children[1].textContent = `${textlength}/${maxlength}`

      if (textlength >= maxlength) {
        event.target.parentElement.children[1].children[0].classList.remove('textContent-span-hidden')
        event.target.parentElement.children[1].children[0].classList.add('textContent-span-warning')
      } else if (textlength < maxlength) {
        event.target.parentElement.children[1].children[0].classList.add('textContent-span-hidden')
        event.target.parentElement.children[1].children[0].classList.remove('textContent-span-warning')
      }

      return
      // 顯辦法連棟顯示剩餘字數
      if (curLength > 5) {
        var num = TextArea1.val().substr(0, 5);
        TextArea1.val(num);
        alert('超過字數限制，多出的字將被截斷！');
      }
      else {
        TextArea1.text(5 - TextArea1.val().length);
      }
    }
  }
}
</script>

<style>

/* form textarea {
  width: 100%;
  margin: 0px;
  padding: 0px;
  border: none;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  resize: none;
}

form textarea:focus,
form textarea:focus-visible {
  width: 100%;
  margin: 0px;
  padding: 0px;
  border: none;
  outline: none;
}


.textContent-span-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.textContent-span {
  font-weight: 500;
  font-size: 15px;
  line-height: 15px;
  color: #657786;
}

.textContent-span-warning {
  color: #FC5A5A;
}

.textContent-span-hidden {
  opacity: 0;
} */

</style>