<template>
    <div class="batch-card">
       <slot></slot>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
    .batch-card{
        
        .header{
            height: 30px;
            background: #cccccc;
            line-height: 30px;
            padding: 0 10px;
            border-bottom: 1px solid #bbbbbb;
        }
        .content{
            // min-height: 100px;
            padding: 10px;
            max-height: 398px;
            overflow-y: auto;
            &::-webkit-scrollbar{
                width: 5px;
            }
            &::-webkit-scrollbar-thumb{
                border-radius: 5px;
                background: #cccccc;
            }
            &::-webkit-scrollbar-track{
                border-radius: 0;
                background: #ffffff;
            }
            .select-group{
                display: flex;
                flex-wrap: wrap;
                /deep/ .shopbox{
                    width:23%;
                    margin-bottom:20px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }
</style>
