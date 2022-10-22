"use strict";(self["webpackChunktwitter_front_2020"]=self["webpackChunktwitter_front_2020"]||[]).push([[353],{4904:function(t,s,e){e.d(s,{Z:function(){return u}});e(6699);var r=function(){var t=this,s=t._self._c;return s("div",{staticClass:"followingsBar-wrapper"},[s("div",{staticClass:"followingsBar-title"},[t._v("Popular")]),t._l(t.recommendedFollowings,(function(e){return s("div",{staticClass:"recommended-following-wrapper"},[s("div",{staticClass:"following-info-wrapper"},[s("div",{staticClass:"avatar-wrapper"},[s("router-link",{staticClass:"link",attrs:{to:"/users/"+e.id}},[s("img",{attrs:{src:e.avatar,alt:""}})])],1),s("div",{staticClass:"info-wrapper"},[s("router-link",{staticClass:"link",attrs:{to:"/users/"+e.id}},[s("div",{staticClass:"info-wrapper-name"},[t._v(t._s(e.name))])]),s("router-link",{staticClass:"link",attrs:{to:"/users/"+e.id}},[s("div",{staticClass:"info-wrapper-account"},[t._v("@"+t._s(e.account))])])],1)]),s("div",{staticClass:"follow-btn-wrapper"},[t.currentUser.Followings.includes(e.id)?s("button",{staticClass:"btn btn-orange btn-isFollowed",attrs:{type:"button",disabled:t.isProcessing},on:{click:function(s){return t.deleteFollowship(e.id)}}},[t._v("正在跟隨")]):s("button",{staticClass:"btn btn-orange",attrs:{type:"button",disabled:t.isProcessing},on:{click:function(s){return t.postFollowship(e.id)}}},[t._v("跟隨")])])])}))],2)},o=[],i=(e(1703),e(2433)),a=e(4003),l=(e(6163),{props:{currentUser:{type:Object,required:!0}},data(){return{recommendedFollowings:[],isProcessing:!1}},methods:{async fetchRecommendedFollowings(){try{const t=await i.Z.getRecommendedFollowings();if(200!==t.status)throw new Error;const s=t.data;this.recommendedFollowings=s}catch(t){console.warn(t)}},async postFollowship(t){try{this.isProcessing=!0;const s=this.currentUser.id,e={userId:s,id:t},{data:r}=await i.Z.postFollowship({formData:e});if("success"!==r.status)throw new Error(r.message);if(this.currentUser.Followings.push(t),Number(this.$route.params.id)===this.currentUser.id&&"userFollowship"===this.$route.name){let s={};this.recommendedFollowings.forEach((e=>{e.id===t&&(s={followingUser:{...e}})})),this.dataToBrotherFollowshipSection("post","atCurrentUserPage",s)}if(Number(this.$route.params.id)===t&&"userFollowship"===this.$route.name){let e={followerId:s,followerUser:{account:this.currentUser.account,avatar:this.currentUser.avatar,id:this.currentUser.id,introduction:this.currentUser.introduction,name:this.currentUser.name},followingId:t};this.dataToBrotherFollowshipSection("post","atOtherUserPage",e)}Number(this.$route.params.id)===this.currentUser.id&&"user"===this.$route.name&&this.$emit("after-post-followship",{situation:"atCurrentUserPage",followingId:t}),Number(this.$route.params.id)===t&&"user"===this.$route.name&&this.$emit("after-post-followship",{situation:"atOtherUserPage",followerId:s}),this.isProcessing=!1}catch(s){this.isProcessing=!1,console.warn(s)}},async deleteFollowship(t){try{this.isProcessing=!0;const s=this.currentUser.id,{data:e}=await i.Z.deleteFollowship({followingId:t});if("success"!==e.status)throw new Error(e.message);if(this.currentUser.Followings=this.currentUser.Followings.map((s=>{if(s!==t)return s})),Number(this.$route.params.id)===t&&"userFollowship"===this.$route.name){let e={followerId:s,followingId:t};this.dataToBrotherFollowshipSection("delete","atOtherUserPage",e)}Number(this.$route.params.id)===this.currentUser.id&&"user"===this.$route.name&&this.$emit("after-delete-followship",{situation:"atCurrentUserPage",followingId:t}),Number(this.$route.params.id)===t&&"user"===this.$route.name&&this.$emit("after-delete-followship",{situation:"atOtherUserPage",followerId:s}),this.isProcessing=!1}catch(s){this.isProcessing=!1,console.warn(s)}},dataToBrotherFollowshipSection(t,s,e){a.Z.$emit("emit-data",{method:t,situation:s,data:e})}},created(){this.fetchRecommendedFollowings()}}),n=l,A=e(1001),c=(0,A.Z)(n,r,o,!1,null,null,null),u=c.exports},2474:function(t,s,e){e.d(s,{Z:function(){return u}});var r=function(){var t=this,s=t._self._c;return s("div",{staticClass:"navbar-wrapper"},[s("div",{staticClass:"navbar-top"},[s("div",{staticClass:"logo-wrapper"},[s("router-link",{attrs:{to:"/tweets"}},[s("img",{attrs:{src:e(934),alt:""}})])],1),s("router-link",{staticClass:"icon-wrapper",attrs:{to:"/tweets"}},[s("img",{attrs:{src:e(6553),alt:""}}),s("span",[t._v("首頁")])]),s("router-link",{staticClass:"icon-wrapper",attrs:{to:"/users/"+t.currentUser.id}},[s("img",{attrs:{src:e(2315),alt:""}}),s("span",[t._v("個人資料")])]),s("router-link",{staticClass:"icon-wrapper",attrs:{to:"/setting"}},[s("img",{attrs:{src:e(1374),alt:""}}),s("span",[t._v("設定")])]),s("button",{staticClass:"btn btn-orange navbar-btn",attrs:{type:"button","data-bs-toggle":"modal","data-bs-target":"#modalNewTweet",disabled:t.isSettingPage}},[t._v("推文")])],1),s("div",{staticClass:"navbar-bottom"},[s("div",{staticClass:"icon-wrapper",on:{click:t.logout}},[s("img",{attrs:{src:e(6645),alt:""}}),s("span",[t._v("登出")])])])])},o=[],i=e(6163),a=e(4003),l={props:{currentUser:{type:Object,required:!0},isSettingPage:{type:Boolean,default:!1}},methods:{logout(){this.$store.commit("revokeAuthentication"),this.$router.push("/signin"),i.F.fire({icon:"success",title:"成功登出"})},getFromBrotherTest(){a.Z.$on("showRedSpot",(t=>{const s=document.querySelector(".red-spot");s.classList.remove("red-spot-hidden")}))}},created(){this.getFromBrotherTest()}},n=l,A=e(1001),c=(0,A.Z)(n,r,o,!1,null,null,null),u=c.exports},2433:function(t,s,e){var r=e(6163);s["Z"]={getRecommendedFollowings:()=>r.l.get("/followships/recommended"),postFollowship:({formData:t})=>r.l.post("/followships",t),deleteFollowship:({followingId:t})=>r.l["delete"](`/followships/${t}`)}},3729:function(t,s,e){var r=e(6163);s["Z"]={getTweets:({offset:t})=>{const s=new URLSearchParams({offset:t});return r.l.get(`/tweets?${s.toString()}`)},getTweet:({id:t})=>r.l.get(`/tweets/${t}`),postTweet:({formData:t})=>r.l.post("/tweets",t),getTweetReplies:({tweetId:t})=>r.l.get(`/tweets/${t}/replies`),postTweetReply:({formData:t,tweetId:s})=>r.l.post(`/tweets/${s}/replies`,t),likeTweet:({tweetId:t})=>r.l.post(`tweets/${t}/like`),unlikeTweet:({tweetId:t})=>r.l.post(`tweets/${t}/unlike`)}},4003:function(t,s,e){var r=e(6369);s["Z"]=new r["default"]},6553:function(t){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAM2SURBVHgB7Zk7jhpBEIaLx0oWELA5yOMbsDdgM2fezZwZTrD4BMANHDpbNrKceU9gfAOcOfOYhyDzICBAvPwXGqM1mumungfgFZ80mtZ0TXf/3dU11RqiM2dCkaKYsCwrn81m3+ZyOWs6nf6gmEhQDBSLxQpu9c1mY207SSRsXI1ut/tAEROpgEKhUMatjqvs2VkMQiIRoBu4B+10Ol21AYUklAD4ubVcLu9JPvB/O08kWqlUqhlGSCABvEEx8AaKdxQBYYQYCXAHXkOHd9igeYqeJlyrZSJEHEbh5w0M+hOKr3G9oHgoo4+bfD7vjMfj75IXtCuwHxIPhTRi+QoIEFligYXgVuv1eo+e9fsPTmXgHniG3p0ADomr1YpdpUInzH7E2gmAr/88tJ8Hhd1qMplcOSDJDzD5pf9l8AyPFYmixeWk+8zGQ/uJTdvdPGE72m83kna4PBgMOlzeCoA7OfD/axRruMr9fp/LbQqA21ENKfQlOnnFF5fxvBpUDCazw+3gfsNtz2azq12d30uIRhyJGmQ2+BYaf8++6VXPX/LFYvEBA3lHZjQwqU2vijT5D+YXOiIpsOdZqqpseKVxq2ByXpJBmF6v1x2/uqRfxcXFhe9LXsAFbw3Mmwa2lEwmHd86xXs2yWmPRiOxPdyhTQZ7DHvINy/yFcDLDRfyVf4Udh8yhDem0NTx21OMagVIGjWkQvfalr6jFKoUIJ0l2FlkiME7SqGRrACiRJnMKQvtgq8Ah1ISwLPpZrEi+IwhTV1UIZRRCjAJpRBxzxmtzs61qZMQVQjd1pMam4TwjOJb8FUlgpNGtjFJHFUhlJEcKX+bHuA5Z8fh/xGzZ2MVnfl8XsJh5E2As4aDb8alyiBNGtyNXCIDeKA4dFS4DCGEMj+jAGhdWOdCJh+cONB+K7QCosjnQxB+BaShNA50IZTRCjDNSqNEF0K3NqTHpiOhC6GMVoBJVhoxyiz0L5IVONZGFrmuSMCRQqlo1U9WAFb9i8ROJADR4OGQ+4BdFjnTN4mtSABvZKQD1wcSwX3cSs/Y4h8cCAijTCbzGSLy7mkq6p8cDmb+I2a+OhwOY/uvfObMc+MP5CKuOjEqBGkAAAAASUVORK5CYII="},1374:function(t){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAVNSURBVHgB7VnRcRs3EF2cLCWZyYfdAVVB7ApMVWC6AlEzpux8maogSgXmT2akWDNhKhBZgagKxFQQpoLoSx5T5sEPe7g7gAfgQBEe/+jNnCjeYfd2gd23C5DoEY/YCoK+AeSA+tD8iiQ91W+5xd+J+JP+psRI6oAcwuA7usK/zz1D5rSkAzFmh5Igo5T4RB/Ibzzxsx94TDIkWwHZx+zv0f/GrRHt0IT/W1EXf0+rJ0t6lmoVnmwyWL6DISv6BW4/pZyuxQXNqoc/YnbzciDNxEc6MUSv5TH1qFydJ/QSf6cNvYXsP5beFA5wbH+iSxjYrdYMwQejFvg8EGf4lHRoiCwaSgTiX2oHMl6RKQzv4N5fll58yrc0ps90ErNKrSEUkZhq1m55VUrk1MMsTq0hapZz1uOWaSIq4duT+A4zZBovMTvqMmEbMlo3noecISxyg0abxo/W9D6nXax6C4IO8KwRx26BnE4R20fqwuzsw4hZPRgzJWkIrj/x6YNjfYw5IjPEkC+4ukqO9ZrJLqgr37ANDwNi/Ddckq8Br4R7XD8YCl4Zn5x6V/Ve2BDSE89Cwh+LD6HEoIyKC0lRyFqeXhvfhlstZyQ0M/XrG2FKDTrAiWfGuQgvZxJIK1QXyIvr0PB2Gu1jRvbo3+pGRBXlWVyhmcvwqZAjaXdoyvUi/C67moMo8K7FVg6w4gGUlrQXcKAqTNIbahM4deJzhOVzPVlgNcz+M2qB1wFdwLpsjKD3+vYCdLfvHD/gWnHVUpwKuiUUqI8oVG499WQJ1IUVasfPNBcj96QJj+EqDnuN0aoOXNDvDZkiZG4s44vkm+i3dC19yokdeuFaCdDmEB8fHJY62wvhUHBDrrYBVVIXGnLIXBoGLhBmr/Eia4Z1LqlWoqP1qYbvwKNPOTB0PJojAl6QzwG9kzJZYM5NWM7GO9nAiluFQOJxmAmeoAK71BF/0H/OsW9BAuipmAjsnOqbOzubRjMIlVDhAm/FObcOfipbGTJq2xhgDY57k5aXjjAtx56DtVTbcs6rNDIe9WyTbdQxLCJ7cqFDQkFGyOQ6L9ZlQ8iM5lDaJJF2S/kdsO5AneHCv7wWpBUy7TKZEc8yXKQq5IaMCLBQI4lVSGS825oiHyYu3Y0klsgbH8dvkvDvuAYd6l2cyYpWEsfTqNqoeHp9MMaVwRT1NtMcUzCQotuOvqXOiV479b0B52fWFrVEmEZZWPUju+BhYXSEJXIUkguLEUqZDmRu1qrwpErqDKElrdC5pXuslGP2HVReyowh017ILEd+wknBF1bYL1/s6082aiXuea/rDrNjDrGO/jpiNvyME5BxZCvhMa7uT0LFp6i2qor2PMbPYPyRN+7NbnTbZq5S2ky89na6CKlXFc8rttlDzHscdzqgkCHJz7Zsp60lDfQvqWARQsT7Yk4lOtWNe3czlxTC6HYjTiXClTjnI8ACqhsdRxaeLcDbWLP3yQwbHIhvJTwj1f6B9xAbIigj4vXFn0rgpADLeVp9RXhxvN4h6XCpXMF1SC2AjiGzWiGjzpuumCjK58d4xwanEu1JbFfZYmdExSmcR8RfsQfM6+/Jbcm4GGQVUG+1rsVaoKlt08Pdg/Ujcn28fumVaSLN4S4rgKLGgW5hxIwbsqLg1Im34wglYW2WJiyz5AOChUdv1E9RUUeLWtGR/BVOfKlWYr62U1P/D7WBrtXq1AoLZzWr7UPvy4DesG2UCI0qmjOfz/RbelbsJ/yJKZkDCmunE55B/tONhyDtlnLJhs0DI+aqJaaESLoCJaofumuWWXBf8w1+6H7EI7bEV25yP1991oQcAAAAAElFTkSuQmCC"},2315:function(t){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAI5SURBVHgB7ZmLkdMwEIY/aIDrAFHBhQpQB6SDmAqODs4dQAeXDjgqSK4CroOYCoAKQEucYRUnfkiy5Rn8zfwTTSJ5duXVYzewsBDFC9Jz47R2uq3bwk+nZ6cnp4qZIsZ+dvrh9LtFD06GmWGcDrQbrnUgkRMpQsg47fAN2js9cgwd4RRWVvWpnN6qPtmQkDjNrITPuqVvgR9iX8iMwQ+NdY8x9myMJSN69h8Cx30iI3rhvhswzuKHXRZWkUbotfCaQF4SjlHtZ4azV+0VgcQ4oGctxAG9fRoCiXHgRrVD9vLqyrMGEePALIhxQM96yAzGvsG/xDjwXbVDFqEeU5EBmUF9opoBY03E2KTsGH7DNPgH4JATvEHsbVTCQJzQ8byvJXH9S31/W/e3Z894Q+Ykp6B/HqAlJ/GGmWDww6lL0jf49NWkzokN/0LFnP1W1frKDJKYhVSMUVZZ1XqFX1aRg68i7OI3KmJkwXFhdpVUTruP5MLZdyAxvKSf0W3llZIIQkPIcr1AVXEME/nUZRXpu2oZ8wE/yRmNksthcU+/1NA43XG5EFYyMiVNw+8Ip6DpSMlIlDRPU0M8huYpXpKYNc0CbWq2jFjw0q95x3icX8+Dc2VNwfA7fyhisN6W70mAnv0N4/ORhFU7iz/7U6Hfgm3r2JXUv1ftPdOx5bINDboc0EnHI9PxpNqmrWOXA5VqW6ZBFvLmig2DsYRf1FKpNYT6sAVyGZ/sz4/C6RtMZviBuDvWwsJ/wx/+r0gZCFmRfQAAAABJRU5ErkJggg=="}}]);
//# sourceMappingURL=353.097bc049.js.map