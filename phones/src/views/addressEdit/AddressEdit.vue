<template>
    <div>
        <van-nav-bar title="保存地址" fixed class="b_border" left-text="返回" left-arrow 
        @click-left="$router.back()"></van-nav-bar>

        <main class="maincontent">
            <van-address-edit
                :area-list="areaList"
                show-delete
                @save="saveAddr"
                @delete="delAddr"
            />
        </main>
    </div>
</template>
<script>
import {mapState,mapMutations} from "vuex"
import {reqAreaList,reqAddAddress,reqEditAddress} from "network/api"
export default {
    name:'AddressEdit',
    data() {
        return {
            areaList:{}  //省区市数据
        }
    },
    created(){
        this.getAreaList()
    },
    methods:{
        ...mapMutations(["changeAddressList"]),

        //获取省市区数据
        async getAreaList(){
            const {data} = await reqAreaList()
            this.areaList = data
            console.log(this.areaList)
        },
        //保存地址
      async  saveAddr(content){
           const {name,province,city,county:country,addressDetail:detail,tel:mobile,areaCode:code} = content
           let addrObj = {name,province,city,country,detail,mobile,code,default:0}
          if (this.isEdit){
              //修改收货地址
              const res = await reqEditAddress(this.addrId,addrObj) // eslint-disable-line no-unused-vars
              this.changeAddressList({address:addrObj,type:'edit'})
              console.log('修改成功')
          }else{
              //保存收货地址
              const res = await reqAddAddress(addrObj)             // eslint-disable-line no-unused-vars
              this.changeAddressList({address:res.data,type:'add'})
              console.log('保存成功')
          }
            this.$router.back()
        },
        delAddr(){

        }

    },
    computed:{
        ...mapState(["userInfo"]),
        //当前地址id
        addrId(){
            return this.$route.query.id
        },

        isEdit(){
            return this.addrId != 0
        }
    }
}
</script>