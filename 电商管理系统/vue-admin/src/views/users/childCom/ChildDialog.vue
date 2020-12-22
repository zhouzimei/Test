<template>
  <div>
      <el-dialog
        :title="fromEdie ? '编辑用户' : '添加用户'"
        :visible.sync="dialogVisible"
        width="50%"
        :close-on-click-model="false"
        @close="dialogClose"
    >
        <!--表单-->
        <el-form 
            ref="dialogForm" 
            label-width="80px" 
            :rules="formRules" 
            :model="dialogForm"
        >
            <el-form-item label="用户名" prop="username">
                <el-input v-model="dialogForm.username" :disabled="fromEdie"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" v-if="!fromEdie">
                <el-input  v-model="dialogForm.password"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="dialogForm.email"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="mobile">
                <el-input v-model="dialogForm.mobile"></el-input>
            </el-form-item>
        </el-form>

  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="confimClick">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
import {checkEmail,checkMobile} from 'util/checkRules'
import {reqEditUser,reqAddUser} from "network/api"
export default {
    name:"ChildDialog",
    props:{
        currentUser:{
            type:Object
        }
    },
    data(){
        return{
            dialogVisible:false,
            dialogForm:{
                username:'',
                password:'',
                email:'',
                mobile:''
            },
            formRules:{
                username:[
                    {requieed:true,message:'请输入用户名',trigger:'blur'},
                    {min:3,max:10,message:'长度在3到10个字符',trigger:'blur'}
                ],
                password:[
                    {requieed:true,message:'请输入密码',trigger:'blur'},
                    {min:6,max:15,message:'长度在6到15个字符',trigger:'blur'}
                ],
                email:[
                    {requieed:true,message:'请输入邮箱',trigger:'blur'},
                    {validator:checkEmail,trigger:'blur'}
                ],
                mobile:[
                    {requieed:true,message:'请输入手机号',trigger:'blur'},
                    {validator:checkMobile,trigger:'blur'}
                ]

            },
         
        }
    },
    methods:{
        
      confimClick(){
          //验证表单
          this.$refs.dialogForm.validate(async valid =>{
              if(!valid) return
              if (this.fromEdie){
                  //发送编辑请求
                  const {email,mobile} = this.dialogForm
                  const {id} = this.currentUser
                  const {data,meta} = await reqEditUser(id,email,mobile)        // eslint-disable-line no-unused-vars
                  if (meta.status !== 200) return this.$message.error(meta.msg)
                  this.$message.success(meta.msg)
              }else{
                  //发送添加用户请求
                  const {data,meta} = await reqAddUser(this.dialogForm)         // eslint-disable-line no-unused-vars
                  if (meta.status !== 201) return this.message.error(meta.msg)
                  this.$message.success(meta.msg)
              }
              this.dialogVisible = false
              this.$emit("aaa")
          })
      },
      dialogClose(){
          this.$refs.dialogForm.resetFields()
          const {username,email,mobile} = this.currentUser
          this.dialogForm = {username,email,mobile,password:''}
      }
    },
    computed:{
        fromEdie() {
            return !!this.currentUser.id || !!this.currentUser.username
      }
    },
    watch:{
        //显示编辑前的内容
        currentUser(newObj){
            const {username,email,mobile} = newObj
            this.dialogForm = {username,email,mobile,password:''}
        }
    }


}
</script>

<style>

</style>