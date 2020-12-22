<template>
    <div>
        <!--面包屑导航-->
         <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/users' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>订单管理</el-breadcrumb-item>
            <el-breadcrumb-item>订单列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card class="box-card">
            <el-row :gutter="20">
             <!--搜索框-->
            <el-col :span="10">
                <el-input placeholder="请输入内容" @click="clearSearchKey" 
                 clearable v-model="ordersParams.query" 
                 class="input-with-select"
                 >
                    <el-button slot="append" icon="el-icon-search" @click="searchClick"></el-button>
                </el-input>
            </el-col>  
        </el-row>

            <el-table
                :data="ordersList"
                stripe
                border
                style="width: 100%">
                <el-table-column type="index"></el-table-column>
                <el-table-column  label="订单编号" prop="order_number" > </el-table-column>
                <el-table-column  label="订单价格" prop="order_price" > </el-table-column>
                <el-table-column  label="是否付款" prop="order_pay" >
                    <template v-slot="data">
                        <el-tag  v-if="data.row.order_pay == 0" type="danger">未付款</el-tag>
                        <el-tag  v-else-if="data.row.order_pay == 1" type="success">已付款</el-tag>
                    </template>
                 </el-table-column>
                <el-table-column  label="是否发货" prop="is_send" > </el-table-column>
                <el-table-column  label="下单时间"  > 
                    <template v-slot="data">
                        {{data.row.create_time | dateFormat}}
                    </template>
                </el-table-column>
                <el-table-column  label="操作"  > 
                    <template v-slot>
                        <el-button type="primary" size="mini" icon="el-icon-edit" @click="editOrderClick()" ></el-button>
                        <el-button type="success" size="mini" icon="el-icon-location"></el-button>
                    </template>
                </el-table-column> 
            </el-table>
            <!--分页-->
             <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="ordersParams.pagenum"
                :page-sizes="[10, 15, 20, 25]"
                :page-size="ordersParams.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="this.total">
            </el-pagination>

        </el-card>
        <!--显示编辑的dialog-->
        <el-dialog
            title="修改地址"
            :visible.sync="dialogVisible"
            width="50%"
            >
            <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm" :rules="rules">
                <el-form-item label="省市区/县" >
                    
                </el-form-item>
                <el-form-item label="详细地址" prop="addr">
                    <el-input v-model="ruleForm.addr"></el-input>
                </el-form-item>
            </el-form>
            
            <span slot="footer" class="dialog-footer" >
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>

import {reqOrdersList} from "network/api"
export default {
    name:'Orders',
    data() {
        return {
            ordersList:[],
            ordersParams:{
                query:'',
                pagenum:1,
                pagesize:10,
                user_id:'',
                pay_status:'',
                is_send:'',
                order_fapiao_title:'',
                order_fapiao_company:'',
                order_fapiao_content:'',
                consignee_addr:''
            },
            total:0,
            dialogVisible:false,
            ruleForm:{
                addr:''
            },
            rules:{
                addr:[
                    {required: true, message: '请输入收货地址', trigger: 'blur' }
                ]
            }
            
           
        }
    },
    created(){
        this.getOrdersList()
    },
    methods:{

        //获取订单数据
        async getOrdersList(){
            const {data,meta} = await reqOrdersList(this.ordersParams)
            if (meta.status !== 200) return this.$message.error(meta.msg)
            this.ordersList = data.goods
            this.total = data.total

        },

        //当页的条数发生变化
        handleSizeChange(newSize){

            this.ordersParams.pagesize = newSize
            this.getOrdersList()
        },
        //当前页数改变
        handleCurrentChange(newPage){
            this.ordersParams.pagenum = newPage
            this.getOrdersList()

        },
        //搜索
        searchClick(){
            
            this.getOrdersList()
        },
        //清除搜索框
        clearSearchKey(){
            this.getOrdersList()
        },

        //编辑
        editOrderClick(){
            this.dialogVisible = true
        }
    }
}
</script>