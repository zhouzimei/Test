<template>
    <div>
        <van-nav-bar title="选择城市" :left-text="$store.state.currentCity" @click-left="$router.back()" left-arrow fixed
              class="b_border"></van-nav-bar>

        <main class="maincontent">
            <van-index-bar highlight-color="#07c160">
                <div v-for="(value,key) in city.cities" :key="key">
                    <van-index-anchor :index="key" />
                    <van-cell :title="item.name"  v-for="item in value" :key="item.id" @click="citySelect(item.name)"/>
                </div>
            </van-index-bar>
        </main>

    </div>
</template>
<script>
import {mapState} from "vuex"
export default {
    name:"citySelect",
    created(){
        
    },
    methods:{
      citySelect(city){
          this.$store.commit("changeCurrentCity",city)
          this.$router.back()
      }
    },
    computed:{
        ...mapState(["city"])
    }
}
</script>
<style scoped>
 .maincontent{
        height: calc(100vh - 46px) !important;
    }

</style>