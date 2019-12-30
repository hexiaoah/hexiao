<template>
    <div class="loading">
        <div id="floatingBarsG">
            <div class="load-img"></div>
            <div class="load-info">正在加载</div>
        </div>
    </div>
</template>
<script >
</script>
<style scoped>
.loading {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2000;
    top: 0;
    left: 0;
    margin: auto;
    background-color: rgba(0, 0, 0, 0.55);
}
.loading.hide {
    display: none;
    opacity: 0;
}
#floatingBarsG {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 200px;
    height: 200px;
    padding: 30px 50px 0;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 10px;
}
.load-info {
    color: #E0E0E0;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    line-height: 40px;
    font-size: 24px;
    text-align: center;
}
.load-img {
    background: transparent url(../images/load.png) no-repeat center;
    background-size: contain;
    width: 100px;
    height: 100px;
    transform-origin: 50px 50px;
    animation: loadImgs 1s linear infinite;
}
@keyframes loadImgs {
    0% {
        transform: rotate(0deg);
    }
    25% {
        transform: rotate(90deg);
    }
    50% {
        transform: rotate(180deg);
    }
    75% {
        transform: rotate(270deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
