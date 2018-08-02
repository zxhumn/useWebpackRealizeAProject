<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
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
                                <li class="active">
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
                    <div class="cart-box">
                        <el-form status-icon :model="orderInfo" ref="orderInfo" :rules="rules" label-width="100px" class="demo-ruleForm">
                            <h2 class="slide-tit">
                                <span>1、收货地址</span>
                            </h2>
                            <div id="orderForm" name="orderForm" url="">
                                <!-- 自定义引入组件 -->
                                <el-form-item label="收货人姓名" prop="accept_name">
                                    <el-input v-model="orderInfo.accept_name"></el-input>
                                </el-form-item>
                                <el-form-item label="所属地区" prop="">
                                    <v-distpicker  @selected="selected($event)" :province="orderInfo.area.province.value" :city="orderInfo.area.city.value" :area="orderInfo.area.area.value"></v-distpicker>
                                </el-form-item>
                                <el-form-item label="收货地址" prop="address">
                                    <el-input v-model="orderInfo.address"></el-input>
                                </el-form-item>
                                <el-form-item label="手机号" prop="mobile">
                                    <el-input v-model="orderInfo.mobile"></el-input>
                                </el-form-item>
                                <el-form-item label="邮箱" prop="email">
                                    <el-input v-model="orderInfo.email"></el-input>
                                </el-form-item>
                                <el-form-item label="邮编" prop="post_code">
                                    <el-input v-model="orderInfo.post_code"></el-input>
                                </el-form-item>

                                <h2 class="slide-tit">
                                    <span>2、支付方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <label>
                                            <el-radio v-model="orderInfo.payment_id" label="6">在线支付</el-radio>
                                            <em>手续费：0.00元</em>
                                        </label>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>3、配送方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <label>
                                            <el-radio-group @change='expressChange($event)' v-model="orderInfo.express_id">
                                                    <el-radio label="1">顺丰快递(20元)</el-radio>
                                                    <el-radio label="2">圆通快递(10元)</el-radio>
                                                    <el-radio label="3">韵达快递(8元)</el-radio>
                                            </el-radio-group>
                                        </label>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>4、商品清单</span>
                                </h2>
                                <div class="line15"></div>
                                <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                    <tbody>
                                        <tr>
                                            <th colspan="2" align="left">商品信息</th>
                                            <th width="84" align="left">单价</th>
                                            <th width="84" align="center">购买数量</th>
                                            <th width="104" align="left">金额(元)</th>
                                        </tr>
                                        <tr v-for="(item, index) in goodsList" :key="item.id">
                                            <td width="68">
                                                <a target="_blank" href="'/goodslist/'+item.id">
                                                    <img :src="item.img_url" class="img">
                                                </a>
                                            </td>
                                            <td>
                                                <a target="_blank" href="'/goodslist/'+item.id">{{item.title}}</a>
                                            </td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.sell_price}}
                                                </span>
                                            </td>
                                            <td align="center">{{item.buycount}}</td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.buycount*item.sell_price}}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="line15"></div>
                                <h2 class="slide-tit">
                                    <span>5、结算信息</span>
                                </h2>
                                <div class="buy-foot clearfix">
                                    <div class="left-box">
                                        <dl>
                                            <dt>订单备注(100字符以内)</dt>
                                            <dd>
                                                <textarea name="message" class="input" style="height:35px;" v-model="orderInfo.message"></textarea>
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="right-box">
                                        <p>
                                            商品
                                            <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                            <label id="goodsAmount" class="price">{{totalPrice}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>
                                        <p>
                                            运费：￥
                                            <label id="expressFee" class="price">{{orderInfo.expressMoment}}</label> 元
                                        </p>
                                        <p class="txt-box">
                                            应付总金额：￥
                                            <label id="totalAmount" class="price">{{orderInfo.goodsAmount}}</label>
                                        </p>
                                        <p class="btn-box">
                                            <a class="btn button" href="/cart.html">返回购物车</a>
                                            <a id="btnSubmit" @click="submitForm('orderInfo')" class="btn submit">确认提交</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>
<script>
    // 引入三级省市联动
    import VDistpicker from 'v-distpicker';

    export default {
        // 手机号
        data: function () {
                var validateMobile = (rule, value, callback) => {
                    if (value === '') {
                        callback(new Error('请输入手机号'));
                    } else {
                        let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
                        if (reg.test(value)) {
                            callback();
                        } else {
                            callback(new Error('请输入正确的手机号'));
                        }
                    }
                };
                // 邮箱
                var validateEmail = (rule, value, callback) => {
                    if (value === '') {
                        callback(new Error('请输入邮箱'));
                    } else {
                        let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
                        if (reg.test(value)) {
                            callback();
                        } else {
                            callback(new Error('请输入正确的邮箱'));
                        }
                    }
                };
                // 邮编
                var validatePostCode = (rule, value, callback) => {
                    if (value === '') {
                        callback(new Error('请输入邮编'));
                    } else {
                        let reg = /^[1-9]\d{5}(?!\d)$/;
                        if (reg.test(value)) {
                            callback();
                        } else {
                            callback(new Error('请输入正确的邮编'));
                        }
                    }
                };
                return {
                    // 商品
                    goodsList:[],
                    orderInfo: {
                        goodsAmount: 0,
                        expressMoment: 20,
                        accept_name: '小米',
                        area: {
                            province: {
                                code: "430000",
                                value: "湖南省"
                            },
                            city: {
                                code: "430400",
                                value: "衡阳市"
                            },
                            area: {
                                code: "430422",
                                value: "衡南县"
                            }
                            },
                        address: "甲岸桥底4号下水道5号床铺下铺",
                        mobile: 18888888888,
                        email: "alwaysV@github.com",
                        post_code: "518000",
                        payment_id: "6",
                        express_id: "1",
                        message: "快点发货&请不要使用小常快递",
                        goodsids: "", // id们
                        cargoodsobj: "" // id 跟数量的关系

                    },
                    rules: {
                        accept_name: [{
                                required: true,
                                message: '请输入收货人姓名',
                                trigger: 'blur'
                            },
                            {
                                min: 2,
                                message: '长度在 2个以上字符',
                                trigger: 'blur'
                            }
                        ],
                        address: [{
                                required: true,
                                message: '请输入收货地址',
                                trigger: 'change'
                            },
                            {
                                min: 2,
                                message: '长度在 2个以上字符',
                                trigger: 'change'
                            }
                        ],
                        mobile: [{
                            validator: validateMobile,
                            trigger: 'change'
                        }],
                        email: [{
                            validator: validateEmail,
                            trigger: 'change'
                        }],
                        post_code: [{
                            validator: validatePostCode,
                            trigger: 'change'
                        }],
                    }
                }
            },
            // 注册组件
            components: {
                VDistpicker
            },
            methods:{
                selected(value){
                    // console.log(value);
                    // this.orderInfo.area = value;
                    this.orderInfo.area = value;
                },
                expressChange(value){
                    // console.log(value);
                    switch (value) {
                        case '1':
                            this.orderInfo.expressMoment = 20;
                            break;
                        case '2':
                            this.orderInfo.expressMoment = 10;
                            break;
                        case '3':
                            this.orderInfo.expressMoment = 8;
                            break;
                    }
                    this.orderInfo.goodsAmount = this.orderInfo.expressMoment +
                    this.totalPrice;
                }
                // 表单
                ,submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
        //   alert("submit!");
        // 调用接口
        this.axios.post('/site/validate/order/setorder',this.orderInfo)
        .then(response=>{
            console.log(response);
            // 订单创建成功之后
            // 删除数据 id1,id2,id3,id4...
            // 截取字符串 切断
            let idArr = this.orderInfo.goodsids.split(',');
            // // console.log(idArr);["88", "90", "94", "95"]
            idArr.forEach(v=>{
                // 通知vuex删除对应的数据
                this.$store.commit('deleteGood',v);
            })
            // 代码跳转
            this.$router.push('/orderInfo/'+response.data.message.orderid);
        })
        .catch(err=>{
            // console.log(err);
        })
        } else {
        //   // console.log("error submit!!");
        this.$Message.error('哥们,有数据没填呢,检查一下呗!!')
          return false;
        }
      });
    }
  },
            created(){
                // console.log(this.$route);
                this.axios.get(`site/validate/order/getgoodslist/${this.$route.params.ids}`)
                .then(response=>{
                    // console.log(response);
                    let buyList = this.$store.state.buyList;
                    console.log(buyList);
                    response.data.message.forEach(v=>{
                       v.buycount = buyList[v.id];
                    })
                     this.goodsList = response.data.message;
                     this.orderInfo.goodsAmount = this.orderInfo.expressMoment +
                    this.totalPrice;
                    this.orderInfo.goodsids = this.$route.params.ids;
                    // 购买的商品跟数量
                    let temObj = {};
                    this.goodsList.forEach(v=>{
                        temObj[v.id] = v.buycount;
                    })
                    this.orderInfo.cargoodsobj = temObj;
                }).catch(err=>{
                    console.log(err);
                })
            },
            computed:{
                totalCount(){
                    let count = 0;
                    this.goodsList.forEach(v=>{
                        count +=v.buycount
                    })
                    return count;
                },
                totalPrice(){
                    let price = 0;
                    this.goodsList.forEach(v=>{
                        price +=v.sell_price
                    })
                    return price;
                }
            }
        }   
</script>
<style>
</style>