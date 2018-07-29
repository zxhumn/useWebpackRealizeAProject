<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <!-- 轮播图 -->                            
                            <div v-if="this.imglist.length!=0" class="pic-box">
                                <ProductZoomer
                                    :baseImages="images"
                                    :base-zoomer-options="zoomerOptions"
                                ></ProductZoomer>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.subtitle}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <div class="el-input-number el-input-number--small">
                                                    <span @click="buyNum==1?1:buyNum--" role="button" class="el-input-number__decrease" :class="{'is-disabled':buyNum==1}">
                                                        <i class="el-icon-minus"></i>
                                                    </span>
                                                    <span @click='buyNum<goodsinfo.stock_quantity?buyNum++:goodsinfo.stock_quantity' :class="{'is-disabled':buyNum==goodsinfo.stock_quantity}" role="button" class="el-input-number__increase">
                                                        <i class="el-icon-plus"></i>
                                                    </span>
                                                    <div class="el-input el-input--small">
                                                        <!---->
                                                        <input v-model="buyNum" autocomplete="off" size="small" type="text" rows="2" max="60" min="1" validateevent="true" class="el-input__inner"
                                                            role="spinbutton" aria-valuemax="60" aria-valuemin="1" aria-valuenow="1"
                                                            aria-disabled="false">
                                                        <!---->
                                                        <!---->
                                                        <!---->
                                                    </div>
                                                </div>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="cartAdd" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <a @click="isShowDec=true" :class="{selected:isShowDec}" href="javascript:;" >商品介绍</a>
                                    </li>
                                    <li>
                                        <a @click="isShowDec=false" :class="{selected:!isShowDec}" href="javascript:;">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                            </Affix>
                            <div v-html="goodsinfo.content" class="tab-content entry" :style="{display: isShowDec? 'block':'none'}">
                                
                            </div>
                            <div class="tab-content" :style="{display: !isShowDec? 'block':'none'}">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea v-model.trim="commentContent" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input @click="submitComment" id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-if="this.imglist.length==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item, index) in commentMessage" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.reply_time | cutTime}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                       
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <Page :total="totalcount" :page-size="pageSize"
                                        :page-size-opts='[5,10,15,20]'
                                        placement="top"
                                        @on-change="pageChange($event)"
                                        @on-page-size-change="pageSizeChange($event)"
                                        show-elevator show-sizer />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item, index) in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="`/goodslist/`+item.id">                                            
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="`/goodslist/`+item.id">
                                          
                                                {{item.title}}
                                            </router-link>
                                            <span>{{item.add_time | cutTime}}</span>
                                        </div>
                                    </li>
                                 
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <BackTop></BackTop>
        <!-- 去到购物车的商品图片 -->
        <img :src="imglist[0].original_path" v-if="imglist.length!=0" style="display:none" class="moveImg" alt="">
    </div>
</template>
<script>
    // 轮播图模块引入
    import ProductZoomer from 'vue-product-zoomer'
    // 引入jquery
    import $ from 'jquery';
     export default {
         name:'goodsinfo',
         data:function(){
             return {
                goodsinfo:{},
                imglist:[],
                hotgoodslist:[],
                isShowDec:true,
                buyNum:1,
                // 轮播图
                images:{
                    normal_size:[],
                },
                //轮播图配置
                zoomerOptions: {
                    zoomFactor: 2,
                    pane: "container-round",
                    hoverDelay: 300,
                    namespace: "inline-zoomer",
                    move_by_click: true,
                    scroll_items: 5,
                    choosed_thumb_border_color: "#bbdefb"
                },
                // 评论页数
                pageIndex : 1,
                // 评论条数
                pageSize : 5,  
                // 总条数
                totalcount:0,
                // 评论内容
                commentMessage:[],
                // 评论内容
                commentContent:'',
            }         
             
         },
        methods : {
            // 获取商品信息
            getGoodsInfo(){
            // 强制初始化
                this.imglist =[],
                this.images.normal_size=[],
                this.axios.get(`site/goods/getgoodsinfo/${this.$route.params.id}`)
             .then(response=>{
                //  console.log(response);
                 this.goodsinfo = response.data.message.goodsinfo;
                 this.imglist = response.data.message.imglist;
                 this.hotgoodslist = response.data.message.hotgoodslist;
                 this.imglist.forEach((v,i)=>{
                     this.images.normal_size.push({
                         id:v.id,
                         url:v.original_path
                     });
                 })
            })
            .catch(err=>{

            })
            },
            // 获取评论信息
            getComments(){
                this.axios.get(`site/comment/getbypage/goods/${this.$route.params.id}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`)
                .then(response=>{
                    // console.log(response);
                    this.commentMessage = response.data.message;
                    this.totalcount = response.data.totalcount;
                }).catch(err=>{

                })

            }
            // 发表评论
            ,submitComment(){
                if(this.commentContent==''){
                    this.$Message.error({
                       content: '对方不想和你说话，并且向你抛出了一堆bug',
                       closable:true
                    });
                    return;
                }
                // console.log(this)
                // 提交评论
                this.axios.post(`site/validate/comment/post/goods/${this.$route.params.id} `,{
                    commenttxt:this.commentContent,
                })
                .then(response=>{
                    // console.log(response)
                    if(response.data.status==0){
                        this.$Message.success('添加成功了哦');
                        this.pageIndex=1;
                        this.getComments();
                    }

                })
                this.commentContent ='';
            },
        
            // 页码改变
            pageChange(page){
                this.pageIndex = page;
                this.getComments();
            },
            // 页容量改变
            pageSizeChange(size){
                this.pageSize = size;
                this.getComments();
            },
            // 加入购物车
            cartAdd(){
                // console.log('加入购物车');
                let offset = $('#buyButton .add').offset();
                let carOffset = $('.icon-cart').offset();
                // 购物图片飞出去
                $('.moveImg').show().addClass('move').css(offset).animate(carOffset,1000,()=>{
                    $('.moveImg').removeClass('move').hide();
                });
                this.$store.commit('buyGood',{
                    goodId:this.$route.params.id,
                    goodNum:this.buyNum

                });
            }
        },
        // 轮播组件
         components: {
            ProductZoomer
        },
         beforeCreate() {
            // console.log('beforeCreate');
         },
         created() {
            //  console.log('create');
            //  console.log(this.$route.params.id);
            // console.log(this.$store);
            
            this.getGoodsInfo();
            this.getComments();
         },
        // 监听
         watch: {
            $route (to, from) {
            // 对路由变化作出响应...
            this.getGoodsInfo();
            // 评论
            this.getComments();
            },
        }
           
     }
</script>
<style>
    @import url('../../node_modules/font-awesome/css/font-awesome.min.css');
    .inline-zoomer-zoomer-box {
    width: 368px;
    }
    /* .pic-box .control-box .thumb-list {
    display: flex;
    } */
    .thumb-list img {
    height: 48px;
    width: 48px;
    margin: 5px;
    }
    .control i {
    text-align: center;
    }
    .moveImg {
        width: 40px;
        position: absolute;
    }
    .moveImg.move {
        transform:scale(0.5) rotateZ(360deg);
        opacity:0.4;
        transition: transform 1s,opacity 1s;
    }
</style>