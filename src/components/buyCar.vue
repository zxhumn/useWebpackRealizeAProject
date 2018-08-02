<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link to="/index">首页</router-link> &gt;
                <router-link to="/buyCar">购物车</router-link>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <!-- 购物车为空 -->
                                <tr v-if="message&&message.length==0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <!-- 有购物信息 -->
                                <tr v-for="(item, index) in message" :key="item.id">
                                    <td width="48" align="center">
                                            <el-switch v-model="item.isSelected"
                                            active-color="#409eff"
                                            inactive-color="#555555">
                                          </el-switch>
                                          
                                    </td>
                                    <td align="left" colspan="2">
                                        <div class="shopInfo">
                                            <img :src="item.img_url"
                                                alt="" style="width: 50px; height: 50px; margin-right: 10px;">
                                            <span>{{item.title}}</span>
                                        </div>
                                    </td>
                                    <td width="84" align="left">{{item.sell_price}}</td>
                                    <td width="104" align="center">
                                            <el-input-number size="mini" @change="countChange($event,index)" v-model="item.buycount" :min="1" :max="10" label="描述文字"></el-input-number>
                                    </td>
                                    <td width="104" align="left">{{item.buycount*item.sell_price}}</td>
                                    <td width="54" align="center">
                                        <button @click="showModel=true;delIndex=index">删除</button>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{selectedCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{totalPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                            
                                <button class="submit" @click="toPayOrder">立即结算</button>
                           
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
        <!-- 删除按钮模态框 -->
        <Modal v-model="showModel" width="360">
                <p slot="header" style="color:#f60;text-align:center">
                    <Icon type="ios-information-circle"></Icon>
                    <span>警告</span>
                </p>
                <div style="text-align:center">
                    <p>你确定删除吗?</p>
                </div>
                <div slot="footer">
                    <row>
                    <Col span="12"><Button @click="showModel=false" type="success" size="large" long >取消</Button></Col>
                    <Col span="12"><Button @click="del" type="error" size="large" long  >删除</Button></Col></row>
                </div>
            </Modal>
    </div>
</template>
<script>
    export default {
        data:function(){
            return {
                // 购物车信息
                message:undefined,
                // 模态框
                showModel:false,
                // 删除的索引
                delIndex:0,

            }
        },
        created(){
            // 进入显示loading框
            this.$Spin.show();
            let buyMessage = this.$store.state.buyList;
            let ids='';
            for (const key in buyMessage) {
                ids += key;
                ids +=','                    
                }
            if(ids==''){
                 // 关闭loading
                 setTimeout(()=>{
                     message:[];
                    this.$Spin.hide();
                },500);
                return;
            }
            ids = ids.slice(0,-1);
            // console.log(ids);
            this.axios.get(`site/comment/getshopcargoods/${ids}`)
            .then(response=>{
                // console.log(response);
                
                response.data.message.forEach((v,i)=>{
                    v.buycount = buyMessage[v.id];
                    v.isSelected = true;
                })
                this.message = response.data.message;
                // 关闭loading
                setTimeout(()=>{
                    this.$Spin.hide();
                },500);
            })
            .catch(err=>{
                // console.log(err);
            })
        },
        computed:{
            // 选中件数
            selectedCount(){
                let num = 0;
                if(this.message==undefined) return;
                this.message.forEach(v=>{
                    if(v.isSelected) num += v.buycount;
                })
                return num;
            },
            // 总金额
            totalPrice(){
                let price = 0;
                if(this.message==undefined) return;
                this.message.forEach(v=>{
                    if(v.isSelected) price+=v.buycount * v.sell_price;
                })
                return price;
            }
        }
       ,methods:{
        //    购物数量改变
        countChange(value,index){
            this.$store.commit('countChange',{
                goodId:this.message[index].id,
                goodNum:value,
            })
        },
        
        // 确认删除
        del(){
            // 删除vuex中对应信息
            this.$store.commit('deleteGood',this.message[this.delIndex].id);
            // 删除购物列表里的对应购物信息
            this.message.splice(this.delIndex,1);
            this.showModel = false;
        },
        // 点击跳转
        toPayOrder(){
            let ids='';
            this.message.forEach(v=>{
                if(v.isSelected) {
                    ids+=v.id,
                    ids+=','
                }
            })
            if(ids==''){
                this.$message({
                    message:'好歹选择一个',
                    duration:500,
                })
                return;
            }
           ids = ids.slice(0,-1);
        //    ?跳转地址
        this.$router.push('/payOrder/'+ids);

        }
       }
    }
</script>
<style scoped>
</style>