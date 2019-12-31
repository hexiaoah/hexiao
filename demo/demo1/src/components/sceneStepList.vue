<template>
    <div>
        <div v-for="(item,i) in sceneList" :key="i" class="step-list clearfix">
            <div class="sceneList-w">
                <div class="step">{{i+1}}、</div>
                <div class="content" v-html="item.data"></div>
            </div>
            <br/>
            <div v-if="item.secondTitle" v-html="item.secondTitle"></div>
            <div v-if="item.image"  class="img-box clearfix"><a :href="item.image"target="_blank"><img class="img-style" :style="{width:item.imagewidth+'px' }" :src="item.image" /></a></div>
                <div v-for="(secondTitle, index) in item.secondTitleList" v-html="secondTitle.secondTitle"></div>
            <div v-if="item.imglist" class="img-box clearfix">
                <a :href="img.img" v-for="(img,index) in item.imglist" target="_blank"><img class="img-style" :style="{width:img.width+'px' }" :src="img.img"  :key="index">
                </a>
            </div>
            <div class="reminder" v-if="item.reminder">{{item.reminder}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'scene-step-list',
    props:['sceneList'],
    data(){
        return{

        }
    },
}

</script>

<style lang="scss" scoped>
    .step-list{
        line-height: 26px;
        margin-bottom: 10px;
    }
    .step{
        width: 2%;
        float: left;
        font-size:16px;
    }
    .content{
        float: left;
        width: 97%;
        font-size: 16px;
    }
    .sceneList-w{
        width: 100%;
    }
    .img-box{
        width: 100%;
        float: left;
        margin-top: 10px;
    }
    .img-style{
        width: 360px;
        float: left;
        margin-right: 20px;
    }
    .reminder{
        color: #FF7F2C;
        width: 668px;
        margin-top: 10px;
        float: left;
        font-size: 14px;
    }
</style>
