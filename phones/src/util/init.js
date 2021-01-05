import {reqUserInfo} from "../network/api";
import store from "../store";

export const getUserInfo =async () => {
  if (!sessionStorage.getItem("token")) return
  //登录过以后
  const {data} = await reqUserInfo()
  store.commit("saveUserInfo",data)
}
