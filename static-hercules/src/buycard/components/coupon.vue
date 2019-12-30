<template>  
    <div class="forbid-scroll-wrap">
        <transition name="fade"><div class="mask" @touchmove.prevent.stop  @click.stop="close" v-show="show"></div> </transition>
        <transition name="fold">
            <div class="wrap"  v-show="show" @click.stop>
                <div class="coupon-list">
                    <div class="title"><b>可用优惠券</b><span class="close" @click.stop="close"><img src="../images/close.png"/></span></div>
                    <ul class="list can-scroll-wrap" >
                        <li v-for="(item) in data" :key="item.id">
                            <border>
                                <border type>
                                    <p class="moneyAndTitle">
                                        <span class="money">{{item.discount}}</span>
                                        <span class="title">{{item.name}}</span>
                                    </p>
                                    <p class="threshold">{{item.threshold}}</p>
                                    <p class="time">有效期：{{formateDate(item.startTime,item.endTime)}}</p>
                                    <img class="icon-img" src="https://assets.2dfire.com/frontend/53458a139d6395f05ef4cb985593b52c.png" alt="">
                                </border>
                            </border>
                        </li>
                    </ul>
                </div>
            </div> 
        </transition>
    </div>
</template>

<script> 
import border from "./border.vue"; 
import {dateFormat} from "@2dfire/utils/date";
export default {
    props: ["show", "data"], 
    watch:{
        show(val){
            var node1 = document.querySelector('.can-scroll-wrap'),
            node2 = document.querySelector('.forbid-scroll-wrap');
            if(val){ 
                if (!node1 || !node2) return; 
                var startY = 0, canScrollWrap = this.canScrollWrap;
                node1.scrollTop = 0;
                var offsetHeight = node1.offsetHeight,
                    scrollHeight = node1.scrollHeight;

                // node2.addEventListener('touchmove', function (e) {
                //    var target = e.target;
                //    var touch = e.targetTouches[0]; 
                //    var ele = document.elementFromPoint(touch.pageX, touch.pageY);  
                //    console.log(touch.pageY)
                //     // if ($(target).parents(canScrollWrap).length === 0 && $(target) != node1) {
                //     //     console.log(11111111)
                //     //     e.preventDefault();
                //     // }
                // }, false);
                node1.addEventListener('touchmove', function (e) {
                    var changedTouches = e.changedTouches, canMove = false;
                    var scrollTop = this.scrollTop; 
                    if (changedTouches.length > 0) {
                        var touch = changedTouches[0] || {};
                        var moveY = touch.clientY;
                        if (moveY > startY && scrollTop <= 0) { 
                            canMove = false;
                        } else if (moveY = scrollHeight) { 
                            canMove = false;
                        } else { 
                            canMove = true;
                        }
                        if (!canMove) { 
                            e.preventDefault();
                        }
                    }

                }, false);
                node1.addEventListener('touchstart', function (e) {
                    var targetTouches = e.targetTouches || [];
                    if (targetTouches.length > 0) {
                        var touch = targetTouches[0] || {};
                        startY = touch.clientY;
                    }
                }, false)
            }else{
                if (!node1 || !node2) return;
                node1.scrollTop = 0;
                node1.addEventListener('touchstart', null, false);
                node1.addEventListener('touchmove', null, false);
                node2.addEventListener('touchmove', null, false);
            }
        }
    },
    methods: {
        close() {
            this.$emit('close')
        },
        timestampToTime(timestamp) {
            var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '.';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
            var D = (date.getDate()<10?'0'+date.getDate():date.getDate()) + ' ';
            var h = (date.getHours()<10?'0'+date.getHours():date.getHours()) + ':';
            var m = (date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()); 
            return Y+M+D+h+m;
        },
        formateDate(startTime,endTime){    
            return this.timestampToTime(startTime)+"-"+this.timestampToTime(endTime)
        }
    },
    filters: {
        getMoney(amount,type){  
            if(type==1 || type==21){
                return Number(amount)/10+'折';
            }else{
                let integer=amount.substring(0, amount.length - 2);
                let decimal=amount.substr(amount.length - 2)
                return '￥'+integer+'.'+decimal;
            }
        }, 
    },
    components: {
        border
    },
    created () {   
    }
}
</script>

<style lang="scss" scoped> 
.mask.fade-enter-active,.mask.fade-leave-active {
    transition: all 0.2s
}

.mask.fade-enter,
.mask.fade-leave-active {
    background: rgba(0, 0, 0, 0);
}

.mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: rgba(0, 0, 0, 0.5);
}

.wrap.fold-enter-active,.wrap.fold-leave-active {
    transition: all 0.5s
}

.wrap.fold-enter,
.wrap.fold-leave-active {
    transform: translate3d(0, 100%, 0);
}

.wrap {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 2;
    width: 100%;
    background: #fff;
    transform: translate3d(0, 0, 0);
}

.coupon-list { 
    .title {
        position: relative;
        border-bottom: 1PX solid rgba(204,204,204,0.5);
        height: 86px;
        line-height: 86px;
        font-size: 30px;
        color: #333333;
        text-align: center;

        .close {
            display: block;
            position: absolute;
            width: 86px;
            height: 86px; 
            right: 0;
            top:0;
            text-align: center;
            line-height: 86px;
            img{
                display: inline-block;
                width: 24px;
                height: 24px;
            }
        }
    }

    .list {
        /*padding-left: 30px; */
        min-height: 700px;
        max-height:900px;
        overflow-y: auto;
        -webkit-overflow-scrolling : touch;
        li {
            border-bottom: 1PX solid rgba(204,204,204,0.5);
            padding-top: 20px;
            padding-bottom: 20px;
            width: 690px;
            margin:0 auto;
        }

        li:last-child {
            border-bottom: none;
        }

        .moneyAndTitle {
            height: 75px;
            padding-top: 10px;

            .money {
                font-size: 34px;
                color: #FF0033;
                display: inline-block;
                vertical-align: -3px;
            }

            .title {
                font-size: 22px;
                color: #333333;
                border: none; 
                margin-left: 50px;
            }
        }

        .threshold {
            font-size: 26px;
            color: #333333;
            margin: 25px 0 14px;
        }

        .time {
            font-size: 22px;
            color: #333333;
        }
        .icon-img{
            position: absolute;
            width: 112px;
            height: 112px;
            right: 28px;
            top:28px;
            z-index: 2;

        }
    }
}
</style>
