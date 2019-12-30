<template>
    <div class="graybox" @click="$emit('close')">
        <div class="share-guide">
            <img class="share-guide__img" src="images/share-guide.png">
        </div>
    </div>
</template>

<style scoped>
.share-guide {
    width: 100%;
    height: 100%;
    position: relative;
}

.share-guide__img {
    width: 460px;
    position: absolute;
    top: 20px;
    right: 30px;
}
</style>
