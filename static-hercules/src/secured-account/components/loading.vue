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
  color: #e0e0e0;
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
  background: transparent
    url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABaUExURUxpcf///////////////////////////////////////////////////////////////////////////////////////0xpcf///////////////////////8L/adkAAAAedFJOUwBkxVkeBX4VDwrWJr2sPrQsCHI4y4ucAKQy0EeVT8Q+KZkAAAJKSURBVDgRhZUBkoMgDEVBBGFVEJGOVr3/NfcHtdVqbWZqER6fGEJg7MOklF6rLKsnbs3H2PFVGm2MkfEP9nx2WQzH8d2b1zDAvkvss+uy7GF3wK5ZFEWCfYJJGXBWxWLHrE0DdoVlqFc/QFeVO4nrPF9hKWm6KWdVJeXKOXHULvIFNoncxuyUlJ3jWw/9F2VJtD6gNBBquOHqeqetV5aGP8yoBPcvv2XTEK0/uPWVk3I/bTEpG6K/sIxxsH3fLnP1MADeZl7It3X/eExDGhkC6PIC2rrMRHCS1jaA/uoEzRjAThPpNdbacCcMpp2mGCl84wj6VhjSYKOSrBhh3zMRajCpolKqZM08j2OTum4eAqyyzM6w/IZLQ41SbTuzWcB+uIzkaWGcCcGF8L+UPW855ww/PH+ZXDA8W35KzdNkclYwTt7cn3nM9OnTFvhnNDTFbGSiRQSXjDqt/e7A1s1zYBZsnN/d163SYp9LVoKN6hp59w7In7GgbY9xat79Vy09hGAtYibALpl9hS19+TAES2lcgn08bj/RNA3olBMKcB/vQp3jSA9NWmSA8Ov0LssenyhBoNdka8Eeis6RRRkEvO1bkWD3JUMM6iCkX+kTIFw7p6781gUVzX0JEj1YV/WnsygX9lDaJE9wlU2vAkh+44oBDOWPcoXyV1UVXQtqXteUHmyCT6fO1qABd93z+feXCem9WeGLQ5fHJE0w6Kff4HOFT5G1/apM0nAiKb9Cdgw+3kLc/OCkrI9XzAn3tp1c5kbcysu1tSf+AX3NI6lYCmTkAAAAAElFTkSuQmCC)
    no-repeat center;
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
