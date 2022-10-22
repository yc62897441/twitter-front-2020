"use strict";(self["webpackChunktwitter_front_2020"]=self["webpackChunktwitter_front_2020"]||[]).push([[645],{8050:function(s,A,t){t.d(A,{Z:function(){return c}});var e=function(){var s=this,A=s._self._c;return A("div",{staticClass:"navbar-wrapper"},[A("div",{staticClass:"navbar-top"},[A("div",{staticClass:"logo-wrapper"},[A("router-link",{attrs:{to:"/admin/main"}},[A("img",{attrs:{src:t(934),alt:""}})])],1),"adminMain"===s.currentViewPageName?A("router-link",{staticClass:"icon-wrapper",attrs:{to:"/admin/main"}},[A("img",{attrs:{src:t(5503),alt:""}}),A("span",[s._v("推文清單")])]):A("router-link",{staticClass:"icon-wrapper",attrs:{to:"/admin/main"}},[A("img",{attrs:{src:t(9610),alt:""}}),A("span",[s._v("推文清單")])]),"adminUsers"===s.currentViewPageName?A("router-link",{staticClass:"icon-wrapper",attrs:{to:"/admin/users"}},[A("img",{attrs:{src:t(5308),alt:""}}),A("span",[s._v("使用者列表")])]):A("router-link",{staticClass:"icon-wrapper",attrs:{to:"/admin/users"}},[A("img",{attrs:{src:t(3145),alt:""}}),A("span",[s._v("使用者列表")])])],1),A("div",{staticClass:"navbar-bottom"},[A("div",{staticClass:"icon-wrapper",on:{click:s.logout}},[A("img",{attrs:{src:t(6645),alt:""}}),A("span",[s._v("登出")])])])])},r=[],i={props:{currentUser:{type:Object,required:!0},currentViewPageName:{type:String,required:!0}},methods:{logout(){this.$store.commit("revokeAuthentication"),this.$router.push("/signin")}}},a=i,n=t(1001),o=(0,n.Z)(a,e,r,!1,null,null,null),c=o.exports},9645:function(s,A,t){t.r(A),t.d(A,{default:function(){return v}});var e=function(){var s=this,A=s._self._c;return A("div",{staticClass:"container"},[A("div",{staticClass:"left-container"},[A("NavBarAdmin",{staticClass:"NavBarAdmin",attrs:{currentUser:s.currentUser,currentViewPageName:s.currentViewPageName}})],1),A("div",{staticClass:"admin-middle-container"},[A("h1",[s._v("使用者列表")]),A("div",{staticClass:"admin-control-button-wrapper"},[A("button",{staticClass:"btn btn-admin-control",attrs:{disabled:s.isProcessing},on:{click:s.recountUserTweetsRepliesLikesNum}},[s._v("重新計算使用者推文、回復、喜歡數量")]),A("button",{staticClass:"btn btn-admin-control",attrs:{disabled:s.isProcessing},on:{click:s.recountUserFollowersNum}},[s._v("重新計算使用者跟隨者數量")])]),A("AdminUsersSection",{attrs:{users:s.users}})],1)])},r=[],i=(t(1703),t(8050)),a=function(){var s=this,A=s._self._c;return A("div",{staticClass:"admin-users-wrapper"},s._l(s.users,(function(e){return A("div",{key:e.id,staticClass:"admin-user-wrapper"},[A("div",{staticClass:"admin-user-banner-wrapper"},[A("img",{attrs:{src:e.banner,alt:""}})]),A("div",{staticClass:"admin-user-avatar-wrapper"},[A("img",{attrs:{src:e.avatar,alt:""}})]),A("div",{staticClass:"admin-user-info-wrapper"},[A("div",{staticClass:"admin-user-info-name"},[s._v(s._s(e.name))]),A("div",{staticClass:"admin-user-info-account"},[s._v("@"+s._s(e.account))])]),A("div",{staticClass:"admin-user-interaction-wrapper"},[A("div",[A("img",{attrs:{src:t(719),alt:""}}),A("p",[s._v(s._s(e.tweetsNum))])]),A("div",[A("img",{attrs:{src:t(3009),alt:""}}),A("p",[s._v(s._s(e.repliesNum))])]),A("div",[A("img",{attrs:{src:t(5813),alt:""}}),A("p",[s._v(s._s(e.likesNum))])])]),A("div",{staticClass:"admin-user-followship-wrapper"},[A("div",{staticClass:"admin-user-followship-followings"},[s._v(s._s(e.followings)+"個"),A("p",[s._v("跟隨中")])]),A("div",{staticClass:"admin-user-followship-followers"},[s._v(s._s(e.followers)+"位"),A("p",[s._v("跟隨者")])])])])})),0)},n=[],o=t(3459),c=t(5190),l={props:{users:{type:Array,required:!0}},mixins:[o.q]},u=l,m=t(1001),g=(0,m.Z)(u,a,n,!1,null,null,null),w=g.exports,p=t(3822),d=t(6163),C={components:{NavBarAdmin:i.Z,AdminUsersSection:w},data(){return{currentViewPageName:"",users:[],isProcessing:!1}},methods:{async fetchAdminUsers(){try{const s=await c.Z.getUsers();if(200!==s.status)throw new Error;this.users=s.data}catch(s){console.warn(s),d.F.fire({icon:"error",title:"無法讀取 Users",timer:2e3})}},async recountUserTweetsRepliesLikesNum(){try{this.isProcessing=!0;const s=await c.Z.recountUserTweetsRepliesLikesNum();if("success"!==s.data.status)throw new Error;this.isProcessing=!1,this.$router.go(0)}catch(s){this.isProcessing=!1,console.warn(s)}},async recountUserFollowersNum(){try{this.isProcessing=!0;const s=await c.Z.recountUserFollowersNum();if("success"!==s.data.status)throw new Error;this.isProcessing=!1,this.$router.go(0)}catch(s){this.isProcessing=!1,console.warn(s)}}},computed:{...(0,p.rn)(["currentUser"])},mounted(){this.currentViewPageName=this.$route.name,this.fetchAdminUsers()}},U=C,B=(0,m.Z)(U,e,r,!1,null,null,null),v=B.exports},5190:function(s,A,t){var e=t(6163);A["Z"]={signIn({email:s,password:A}){return e.l.post("/users/signin",{email:s,password:A})},signUp({account:s,name:A,email:t,password:r,checkPassword:i}){return e.l.post("/users",{account:s,name:A,email:t,password:r,checkPassword:i})},signInAdmin({email:s,password:A}){return e.l.post("/admin/users/signin",{email:s,password:A})},getTweets(){return e.l.get("/admin/tweets")},deleteTweet({tweetId:s}){return e.l["delete"](`/admin/tweets/${s}`)},getUsers(){return e.l.get("/admin/users")},recountUserTweetsRepliesLikesNum(){return e.l.get("/admin/recountUserTweetsRepliesLikesNum")},recountUserFollowersNum(){return e.l.get("/admin/recountUserFollowersNum")}}},5503:function(s){s.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALvSURBVHgB7VldctMwEP6UJu/lBIQbpDdoTgA9AckMBIaXhhOQ3KCPDGWm4QZwAsINwgkQJyAv5CGZsboruz9pLWtly04zk2/GrWtp5f32TysXOOCASlCoCWaMY/zHK3rDUn3Bd9SEWgiYtxjQyp/otps90nRNiMg3REZUAuY9TmFIcUO/86ERmUgUAgLFHwhgjiMM1WdLqBIqESDFu6TMlVjxx2+f0TWtQqQUgSxBJyR9jhioQCSIgFV8hTFZ/JwkjxEbCaZoYxZCREzAjMjidSm+DY2ARPcSyCmJTUFDQMRJILiy1AdNoTVWX/Ejb/ARgSek+DYcpfeWQFYSWfEBnjIeVKw7AiP8QfNxXhYaa5yoGZYt/st8QA/7ozyji06qryVAtV0D92KL4w3Vt/lsDY3q0NheR6tLLPjGEmBXkEv6pDhvUqc02KfgmqMctF1njWdUAl/wxff0bIjyZBZ2HUXtebr2yc2Au4yObO2fIASGEmyDj9YgecMD2gTbuCCzvUYYeD+Y5g204Vbmb2CntCDPDYsmZMQG5h2eB5XpJA2XPLScQh23UC7WOBPPVfnWLJi/dA25CawC4pWSnqwrnk81fB6UYxv8dg05CVh3Gzfz7cmB3mIYoQzp4MopRqtQWImtKiNaTqaQqI+AzEqqxCYolVHFRIsJGKEHyjR+cpkKHuBSKkPXvJGTsGcMaeuSVCEQUkpbuLIdrQd2TnpAkqFSCK2Ctv4uWetnEQmyfI/nIKRxLCihDMmR8l/wOZh7dkMnKM6hI7JgQoorvAw+a3AJvaQ+qgBt+JXR9LOHEKSKDqx5kttnZeAN4ZZvQqlNKhaUf6/wEzBR+vmyiOABeSmNjyQGgc6+h9BqhyHkKaEML4GgrjQmPF3oDfweYKideEEUulICzeeBknldRiDZSSKL/jEoI7ChL8TN5gF/efslmSgikCVTvxESxn6jOpOesWUeINgvYRv6oGRsoxafSLrmBb+DlN/d3nPAAXuGawFSC//Ky3HGAAAAAElFTkSuQmCC"},9610:function(s){s.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAM2SURBVHgB7Zk7jhpBEIaLx0oWELA5yOMbsDdgM2fezZwZTrD4BMANHDpbNrKceU9gfAOcOfOYhyDzICBAvPwXGqM1mumungfgFZ80mtZ0TXf/3dU11RqiM2dCkaKYsCwrn81m3+ZyOWs6nf6gmEhQDBSLxQpu9c1mY207SSRsXI1ut/tAEROpgEKhUMatjqvs2VkMQiIRoBu4B+10Ol21AYUklAD4ubVcLu9JPvB/O08kWqlUqhlGSCABvEEx8AaKdxQBYYQYCXAHXkOHd9igeYqeJlyrZSJEHEbh5w0M+hOKr3G9oHgoo4+bfD7vjMfj75IXtCuwHxIPhTRi+QoIEFligYXgVuv1eo+e9fsPTmXgHniG3p0ADomr1YpdpUInzH7E2gmAr/88tJ8Hhd1qMplcOSDJDzD5pf9l8AyPFYmixeWk+8zGQ/uJTdvdPGE72m83kna4PBgMOlzeCoA7OfD/axRruMr9fp/LbQqA21ENKfQlOnnFF5fxvBpUDCazw+3gfsNtz2azq12d30uIRhyJGmQ2+BYaf8++6VXPX/LFYvEBA3lHZjQwqU2vijT5D+YXOiIpsOdZqqpseKVxq2ByXpJBmF6v1x2/uqRfxcXFhe9LXsAFbw3Mmwa2lEwmHd86xXs2yWmPRiOxPdyhTQZ7DHvINy/yFcDLDRfyVf4Udh8yhDem0NTx21OMagVIGjWkQvfalr6jFKoUIJ0l2FlkiME7SqGRrACiRJnMKQvtgq8Ah1ISwLPpZrEi+IwhTV1UIZRRCjAJpRBxzxmtzs61qZMQVQjd1pMam4TwjOJb8FUlgpNGtjFJHFUhlJEcKX+bHuA5Z8fh/xGzZ2MVnfl8XsJh5E2As4aDb8alyiBNGtyNXCIDeKA4dFS4DCGEMj+jAGhdWOdCJh+cONB+K7QCosjnQxB+BaShNA50IZTRCjDNSqNEF0K3NqTHpiOhC6GMVoBJVhoxyiz0L5IVONZGFrmuSMCRQqlo1U9WAFb9i8ROJADR4OGQ+4BdFjnTN4mtSABvZKQD1wcSwX3cSs/Y4h8cCAijTCbzGSLy7mkq6p8cDmb+I2a+OhwOY/uvfObMc+MP5CKuOjEqBGkAAAAASUVORK5CYII="},5308:function(s){s.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAN1SURBVHgB7VlbbhMxFD0OFD4JK2C6goYdpCsgXQGpRAHx03QFTVdA+4GEKBLpCmhX0HYFlBUwXQHlA6Q+NObY4ySePMYztvv4yJHSmThjzz2+1/dVYIEFgiAQGbKHJv6igwZW+LVphi8gccaxU/EZKSIiGgEjeJ+3r7lqs+SNA352YhGJQkC+R4IMx7xNKk5JqY3VGCSCCcwUXuKEfw+5+oX53qTAHV7b1tQUV3gpBuYZTzxGKCS2MRReUhiBdbFP4aexJzfQ5fWjMbEET/CN1zUEIEgDZvd/WUNr4stM4e05baOxHBlN6avWmBcaCEG++8P7gUt4Bdr9iXrWkuAVAhBKoG19G6AqHuHAWqOLAHibkPyAFm7wwwhxQbt/Xmv+Bn6P3O0SEvEJ5/CAvwZuCi7zDHXRsOz+kpvhCX8CEi9G98KDACz3KSrHjyn4EyhG2/q+XFpBrCxyOxB2iB8AQkzI3nWfHWzOWasWQkzo3BKg/iEU1hzpnxP5E7iyvIhAW0flitDP2jHkBj/hCW8COgkTFgmmB1VIWMmfGWAEH/hrICwX2tBmcFzwIioTFTpdUHb9ZzSeFzitieitNLl8bwQUdIYpdFZZc6LWYI/50wECEKeg6dIsnpLE5O7OnUANXWOLO+8TAAuIWhMbIivaK01G19zTqCLmKLSIWeAhIX5bJfdM6vNs5J3yA3uuzIhpd7Dd2wj3Qqqd8o+HV2CT/r3lTMzkKH4chnogBf+CJhe8R4E2A7LJlKQPWBP34QkvAqYwV74/wSyh8gJHXYfepmmebc2dk7Gb4VHc1yYg3+rd2i4O6tbhLl3owFUaale7xEKeQQyTZDJ27GpqoxaBKeHzdKHPg7kHD5goPu4rKdQkUZnADOFVNF0PyWP0MrOieA0SlQhQ+A4v38cDNJV9rCMi5Bu2ZRpsDA9RseFVlYDqviX5F5xQ+FXcAuQ7ZrZjTVTqnTrrAdPPTEaLXsfd+QIu2Scdl5cJO7ebrinugkYUPE4/1OZLX5UXSTvWu3vOOWU/TjRiU0bOZdwBCl07x1ko10BmNV6lfwe5NkT15m/DsZDdOXB2niPi1LpPyh50nYHUerKNO4DOsWC5U5SfuTpn4H6QocMzcDTv51IN6H9GZOEpbwB2y4RXcLpRLtCl/SvfH7UQcSDlO1XHYgsLLLBAKf4DuOEmCBCgcMkAAAAASUVORK5CYII="},3145:function(s){s.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAI5SURBVHgB7ZmLkdMwEIY/aIDrAFHBhQpQB6SDmAqODs4dQAeXDjgqSK4CroOYCoAKQMs5c6s48UOSLc+cv5l/okkkz668euwGFhaieEV6rpzWTtd1W/jt9Oj04FQxU8TYr06/nP626M7JMDOM04F2w7UOJHIiRQgZpx2+QXune55CRziGlVV9Kqf3qk82JCSOMyvhs27pW+CH2DcyY/BDY91jjD0ZY8mInv27wHFfyIheuB8GjLP4YZeFVaQRei28JZDXhGNU+5Hh7FV7RSAxDuhZC3FAb5+GQGIcuFLtkL28uvCsQcQ4MAtiHNCzHjKDsW/wPzEO/FTtkEWox1RkQGZQn6hmwFgTMTYpO4bfMA3+ATjkBG8QexuVMBAndDzva0lc/1HfX9f97ckz3pE5ySnonwdoyUm8YSYY/HDqkvQNPn01qXNiw3OomJPfqlrfmUESs5CKMcoqq1pv8MsqcvBVhF38RuWYsMvC7CqpHHcfyYWz70BieEk/o9vKKyURhIaQ5XKBquIpTORTl1Wk76plzCf8JGc0Ss6HxS39UkPjdMP5QljJyJQ0Db8hnIKmIyUjUdI8TQ3xGJqneEli1jQLtKnZMmLBS7/mHeNxej0PzpU1BcPv/KGIwXpbviUBevY3jM9nElbtLP7sT4V+C7atY1dS/1G190zHlvM2NOhyQCcd90zHg2qbto5dDlSqbZkGWcibCzYMxhJ+UUul1hDqwxbIZXyyPz8Kpx8wmeEH4u5YCwsvhn8F30gJdgoKxAAAAABJRU5ErkJggg=="},719:function(s,A,t){s.exports=t.p+"img/icon-dove.17d29095.png"},5813:function(s){s.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAZCAYAAAAv3j5gAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMFSURBVHgBvVa9UhNRFD5nN8nGbn0CwwtI6Cyckcz4ALG0Mo7A0BEbosloksHARAqgYwzC0tmBpY2BwtKZ+AQuT2DGGZXdJXs85+5ugPyQ8KNfszd3Nt93v3vP/c4C/Cdg70Q+XzZ/JpPZmE+T8ptQs3X483GzXrUHEcj7v4xbT/jNNBK1OwCH798W9y8UmltcyhLqOzw0+ynJ8hz3ubVebZ8KJCpMsTCA1AYNKu9Wirt9QnOFWoUAyxGpT3igEdiIwOKQ5cmUELiOM5U0kqZP/h4hpgmgDeSvA8ZaASHxu5RTLEDVrXqp0hUKnezJn9CHbGO1eHh2hbnCSioOtMdDJiZZgCkiQNTyXDcTuYwwW6yloYNN2RmCTmar/upAC3zpa2oFBPleEYFVf2l7SSfDwxYCTisRdjdIRNBYLrVY4JGMNVBHAThTWJlmu01ZKdvMwAUInX2XsQfOhDWkQLrOCjV2xQtjVxrbeBDu4T6MgDjr+PTUJ8iNEgmg7wfc2mQsmuLDb8MY2F4tWTAmuGCONJQjQVODfwgRiMYaOzmSgc4VBTcMDemOEuTC0XTwVf37SDcuhIjTSpDom7pHs4XlH/wwPce5Pahcr4J5rtBOUKF2o16cUGeEBOvyjCWMBbgh+ECKi++mJU8l5N5yNkBSASif4wyDa0Lc8ENiC07Q2e0KWdVqW7lCNONGYg2uCU7wMkk2cgZG961b3qErnsTcM84+uCJmX9RyYajaLnob0fy5NjFTWOI40pu8sW0d3anNsW7/KWTLfBVnkJL04L7UbRPnLqykLCurLfTBaF7mvM6KEPmVsyJ9jiJEYTisDfRCmuDvRKIZ9KfB4TwwgrykKxHfYmfpOBPMF8opuMBJJCILO3HUf/uAwwhy5bIZPzakeaWls2rgZHrPTBocdlAaZmqU+6FCkVjs2NjB8E5ErVltlZHIU/C9YPZ+T1xaKMLc4psyfw1Vwp8RmUnBJa806qWNURw6jIGvXz4f3r3/cFcHFfv3WOCYBT6cgPt4u/760zgcfwF3GILzizk+5gAAAABJRU5ErkJggg=="},3009:function(s){s.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKZSURBVHgBtVZdUhpBEO4e0U3eNjfAE4gnEG8Qb7BWgZU3Nw9KAlJIJUCAh+BbCrACJ4g5geQEkhO4NwgvsbILO52eWUBEKP7W72WmZne/nm96ur9FWADbzpn/jFfmACA663kEwPlW/ugs4sF55A/Gjk0gDgAoDkuAADtCUKteSreXCpRIleIC6Ds9KnB43kWg3uwQEOUgMSYyh4QOSTpqVDPduYFOUoVL/ig33GMLJLYa1fQvWALJs+IBCLT4O0sTC9+ql7LtZ4GSHwoWEColPUG+Xa9k27AGEuefbUTxVW8V/MNmOdsZB3qXKkUl0K06Lkn+0XUlewMbYLRpdYye6+63avmeUA98gFyQE2ptGkSh8SXTYr4bxRnZMU7VmghkBTerD14eQgJK0lyIYOkxeVaIcRLvCKjTLGcOIUQkU8U7HmJ9130jJGJULQrCLoSOgHN729gTRKjvv+TbBi8IMTExIWRw7secYguklieRYhAyRt2l33d/6zripP3hwVRJU3ceQoCqTR/ongi6zUp6P7jeBDU1RgwjByFB1aYaWZXm1oG81+4VDw7LsxPc72BDnJx/ejvseY7vuT/V2mOvS3M9+XjLU5NrKj9wvdo6xzjJIwms60pgGzjjpR88jep2z0XMntRGKXtbQvQWGVzivMgNVR+ZSSQvm5WLcad55kcWJ3Fbn2/Q7icxr3soo/xr7Fwy3enwTbtRzlxNvjPTYUcBhZTxCOIe6auPcV52GuX07hMVT43S4cq3ZnnY3EDT4BKgyUDTKpBkzfP6+Xl5jcAaUCoeWAVoG4cekX+8yF4ErIhkqlDDoUkqzxm47u4yHraqoujwqBx24vermOTKilQuuFXtr+rESyvyJR1vAd7XqxdL/RVN4z/w7DhrDprj5QAAAABJRU5ErkJggg=="}}]);
//# sourceMappingURL=645.9e2883c3.js.map