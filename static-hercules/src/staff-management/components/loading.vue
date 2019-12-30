<template>
  <div class="loading__wrapper">
    <div class="fire-loading">
          <span class="fire-loading__spinner">
            <svg viewBox="25 25 50 50" class="fire-loading__circular">
              <circle cx="50" cy="50" r="20" fill="none"></circle>
            </svg>
          </span>
    </div>
  </div>
</template>

<style type="text/less" lang="less" scoped>
  .loading__wrapper{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 2300;
    background: rgba(255,255,255, 0.5);
  }

  .fire-loading{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 110px;
    height: 100px;
    line-height: 0;
    vertical-align: middle;
    padding: 10px;
    border-radius: 3px;
    display: inline-block;
    background: rgba(0, 0,0,0.3);

    .fire-loading__spinner{
      width: 100%;
      height: 100%;
      position: relative;
      display: inline-block;
      box-sizing: border-box;
      animation: fire-rotate 0.8s linear infinite;
      animation-duration: 2s;

      .fire-loading__circular {
        width: 100%;
        height: 100%;

        circle{
          stroke: white;
          stroke-width: 6;
          stroke-linecap: round;
          animation: fire-circular 1.5s ease-in-out infinite;
        }
      }
    }
  }

  @keyframes fire-circular {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -40;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -120;
    }
  }

  @keyframes fire-rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
