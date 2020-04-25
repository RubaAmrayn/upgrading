<template functional>
  <div class="sa">
    <div class="sa-info">
      <div class="sa-info-body"></div>
      <div class="sa-info-dot"></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.sa {
  width: 140px;
  height: 140px;
  padding: 26px;
  margin: 0 auto;
  background-color: transparent;
  transform: rotate(180deg);
  &-info {
    border-radius: 50%;
    border: 4px solid #2196f3;
    box-sizing: content-box;
    height: 80px;
    padding: 0;
    position: relative;
    background-color: transparent;
    width: 80px;
    animation: scaleInfo 0.75s infinite alternate;
    &:after,
    &:before {
      background: transparent;
      content: "";
      border-radius: 50%;
      height: 100%;
      position: absolute;
      width: 100%;
    }
    &:before {
      display: inline-block;
      opacity: 0;
      animation: pulseInfo 2s linear infinite;
    }
    &:after {
      display: block;
      z-index: 1;
    }
    &-body {
      background-color: #2196f3;
      border-radius: 2px;
      height: 47px;
      left: 50%;
      margin-left: -2px;
      position: absolute;
      top: 10px;
      width: 5px;
      z-index: 2;
      animation: pulseInfoIns 0.75s infinite alternate;
    }
    &-dot {
      background-color: #2196f3;
      border-radius: 50%;
      bottom: 10px;
      height: 7px;
      left: 50%;
      margin-left: -3px;
      position: absolute;
      width: 7px;
      z-index: 2;
      animation: pulseInfoIns 0.75s infinite alternate;
    }
  }
}
@keyframes scaleInfo {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes pulseInfo {
  0% {
    background-color: transparent;
    transform: scale(1);
    opacity: 0.5;
  }
  30% {
    background-color: transparent;
    transform: scale(1);
    opacity: 0.5;
  }
  100% {
    background-color: #2196f3;
    transform: scale(2);
    opacity: 0;
  }
}
@keyframes pulseInfoIns {
  0% {
    background-color: #51b0ff;
  }
  100% {
    background-color: #2196f3;
  }
}
</style>
