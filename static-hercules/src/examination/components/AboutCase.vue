<template>
    <div class="case-wrapper">
        <h2 class="h2">相关案例</h2>
        <ul class="section-main border-t border-b">
            <li class="case-list" v-for="(item,index) in cases" :key="index" :class="index===0?'':' border-t'">
                <a :href="item.url" v-click="{name:'click_exam_item_detail_case',info:{case_name:item.title}}">
                    <div class="img"><img :src="item.img"></div>
                    <div class="content">
                        <div class="title">{{item.title}}</div>
                        <div class="other">
                            <span class="time">{{item.time}}</span>
                            <span class="praise">{{item.praise}}+</span>
                            <span class="browsing">{{item.browsing}}+</span>
                        </div>
                    </div>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'result',
        props: {
            cases: {
                request: true
            }
        },
        data() {return {}},
        created() {},
        mounted() {},
        computed: {},
        methods: {}
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
    .section-main {
        padding-left: 15PX;
    }

    .case-list {
        overflow: hidden;
        position: relative;
        height: 90PX;
        padding: 12PX 15PX 12PX 140PX;
        box-sizing: content-box;
        .img {
            position: absolute;
            top: 12PX;
            left: 0PX;
            width: 120PX;
            height: 90PX;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .title {
            font-size: 15PX;
            color: #333333;
            letter-spacing: 0.18PX;
        }
        .other {
            font-size: 12PX;
            color: #999999;
            letter-spacing: 0.14PX;
            position: absolute;
            bottom: 12PX;
            left: 140PX;
            right: 15PX;
        }
        .browsing, .praise {
            float: right;

        }
        .browsing {
            padding-left: 18PX;
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAA7pJREFUSA3tVG9sU1UUv/e+15ahFBkaMmYMhA9qiOKgZcASk8U/hD/tCxlMxVgohQ9q9IPRaGKiQWI00USNHzBxj02SESiB0HZg4kjgi8W1nSIRM0MWTTAty8QNp3PSvXv8nW63lCl85Qsnee/ee87v/M6fd+4T4rbc6g7IGyVARLIrkw95QjpCUwsJsVAIwsMii0KKkiD62lby2PZIuCClBOS/8r8B3GN9m4B+F8+DVRcpRpgYNFDTQrzqr9nkAPZv7nJWHq3qpjfXBTiQKdw97nndcH6S7ciqV0pxwJ5NmW2PN1+ude7uOTdv3JvYAIKtqHadwSuf/eyO9cuHDbYawE3l79ekT8JwL0h/JKVe3BUJnzbAzuOFh7SnVyD/suVT32xfHxo0tn09uTXao71E4mHofrUt64l4JMRVoZOQzi+/WzT5TzmL0huQ9VH/rEAstnbZX2zLZAqzh7TXBectfJ4SqeG5d2c0/DLwmnXJ7MW6K8NFFwk8A9pSQAVaYtFlP8sTJy4EiuWRMyizSQp5JOiEn2qX0ptmEp+n+jrglEC/BpSgT4RUs1Dpq9A1QvcW+r7HYMGh3HS+G+vTCHK20T9vlSpeHXl9mvyHBZaK1ZIXCgUfiLYCrJWwH0s4zZ8louGPLbLaKqQkthlyXrkaK3hPHC0+h248UiqPvqFQagVk2dYLkUhovNbh7JDisazDBA4nnOVFY5Nz538/taclRmfWeOviCWXJ5/lMpOMK2funDlTpuQHebF3w9yQG7SZCaoKthJIUjyEftNYfcQ95b8RvW79hCjwS8i7+iEZ/SY828h6+Q0ZnVuZgroqdRFIFg3fuAfACDI92pHPvGyCvPEnI4hRqDfwxXDrYkco3uZm+1RjJ/WxHGT281oqbLnzAXAg/KGXwHdXeuvRP9L8NEzQKj9fcdO692krqfAH+aJxAFD39Vnsii30L8Lk6X/0rhjxJZLmp3IfAQCevKMtuSzgPjFUvWme6f5WnJ48jq3q0rhcELyWc8E9MkDx/3j82OP6cJhFCEmUEzCaioSRwlTvQlc4tnST6FHelFYS/S0tsTESaz7BvNQAf+MJ5V8uHkWGIew/zIZLiyNzgHV9xpYwx4qYG5kgaW6sFbUZSuISV79dvB/yb4+uafjG46wKwktuzL5OPIdvdONzHOmSK5MRl/Ogu8RnSgH/e/KktZykvwv72Tif8hanqms3sZqyVQD39a8jTDhhWInQDojQwDC0q4Y3ftchJS6V2bFyRnUk8g+728RZ24F+iQ5jDTGRffgAAAABJRU5ErkJggg==) no-repeat left center;
            background-size: 12PX;
        }
        .praise {
            margin-left: 15PX;
            padding-left: 18PX;
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAj1JREFUSA3tVM1LVFEUP+c6Mz6JrAiKICrog0pQjMRFtZhaFA5oFA0FIoQugiCCNq5y1V8wu8aIIGjraAwE0qoWahDhpqCIwkWbIAaU53zc0++813069HRGmIKgM/M4n/f8zj33nkv0rxNvZQP5qflxZrmLNSVmyo0O9ucarW8aYLLwJiNSe07EiwABUbdhMzQ61De9GYjZzFnnEzkX6Nw27CW9jMqW7NW6mBileQCWbiYu7zjivR8e6FnCTiz0nTE560xNATyaXtBKLxFJMdvVVc4XFvdCNjiH73XZYpSEsz0tvtu/Wi2PWGu3ORsqTEHuhe0CMX81nLwd+lbuKbciB/NTcw9CG/ZkjED+cHj76WfpNFfVHgH4Ff8FDu6kC1Yu+OEWfCEyuURn4v7NdO8PtbPwdfXhfx6qfgGJtQH/VFoYgHBDlQhAkyNZMdXhZdWx6vuzLHRs7HL/IdXXU6qj/YSXSrBfrmrFEVX8dmyh9BLIwSVQRwQQRnFt5GLPssqThfmalhhHLibOh5YdwNl8dr6mDtkFN+KPZ94eRcweEn7lYlsKYKVyJkjcJq//EICcDRKb5AYAvEHTXTkNOesOlsYyp3DzQmpZi57Mzu0mkeOYnah6hWgZQHXZBP1ns9b/lgII2QBAxEQ3SAEwWyHh/q5A+4YHZkYtGMpreJZ3MfPDXyERw1D+PiBCV7De6xzs25dlxgyFFA0a3vYJrJuwVu44JxKhrWu6s8dxDNdHMebW+uRxcf9tf78DPwF1ibXboGBm2wAAAABJRU5ErkJggg==) no-repeat left center;
            background-size: 12PX;
        }
    }
</style>
