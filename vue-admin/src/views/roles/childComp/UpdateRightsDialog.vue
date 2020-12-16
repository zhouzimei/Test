<template>
    <div>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="50%"
            >

            <!--树形控件-->
            <el-tree 
            :data="rightsList" 
            :props="props"
            show-checkbox
            node-key="id"
            :default-checked-keys="defaultKeys"
            ref="tree"
            >

            </el-tree>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmClick">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
import {reqRights,reqUpdateRoleRights} from "network/api"
export default {
    name:'UpdateRightsDialog',
    props:['currentRole'],
    data(){
        return{
            dialogVisible:false,
            rightsList:[],
            props:{
                label:'authName',       //指定节点标签为节点对象的某个属性值
                children:'children'     //指定子树为节点对象的某个属性值
            },
            defaultKeys:[]
        }
       
    },
    created(){
        
    },
    methods:{
        async getRightList(){
            const {data,meta} = await reqRights("tree")
            if (meta.status !== 200) return this.$message.error(meta.msg)
            this.rightsList = data

        },

        //更改权限
        async  confirmClick(){
            const {id:roleId} = this.currentRole
            const rids = [...this.$refs.tree.getCheckedKeys(),...this.$refs.tree.getHalfCheckedKeys()].join(",")
            //发送更改请求
            const {meta} = await reqUpdateRoleRights(roleId,rids)
            if (meta.status !== 200) return this.$message.error(meta.msg)
            this.$message.success(meta.msg)
            this.$parent.getRoleList()
            this.dialogVisible = false
        }
        
    }
}
</script>
<style scoped>

</style>