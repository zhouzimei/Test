export default {
    data(){
      return {
        backTopFlag:false
      }
    },
    methods:{
      isShowBackTop(){
        const {scrollTop} = this.$refs.main
        this.backTopFlag = scrollTop >= 1000 ? true :false
      },
      //点击返回顶部
      backTopClick(){
        console.log(123)
      this.$refs.main.scrollTop = 0
    },
      //点击跳转到商品详情页
      itemClick(id){
        /*query params*/
        // console.log(id)
        this.$router.push({
          name:"Detail",
          query:{id}
        })
      },
  }
  }
  