<template functional>
  <div class="sa">
    <div class="sa-warning">
      <div class="sa-warning-body"></div>
      <div class="sa-warning-dot"></div>
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
  &-warning {
    border-radius: 50%;
    border: 4px solid #f8bb86;
    box-sizing: content-box;
    height: 80px;
    padding: 0;
    position: relative;
    background-color: transparent;
    width: 80px;
    animation: scaleWarning 0.75s infinite alternate;
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
      animation: pulseWarning 2s linear infinite;
    }
    &:after {
      display: block;
      z-index: 1;
    }
    &-body {
      background-color: #f8bb86;
      border-radius: 2px;
      height: 47px;
      left: 50%;
      margin-left: -2px;
      position: absolute;
      top: 10px;
      width: 5px;
      z-index: 2;
      animation: pulseWarningIns 0.75s infinite alternate;
    }
    &-dot {
      background-color: #f8bb86;
      border-radius: 50%;
      bottom: 10px;
      height: 7px;
      left: 50%;
      margin-left: -3px;
      position: absolute;
      width: 7px;
      z-index: 2;
      animation: pulseWarningIns 0.75s infinite alternate;
    }
  }
}
@keyframes scaleWarning {
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
@keyframes pulseWarning {
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
    background-color: #f8bb86;
    transform: scale(2);
    opacity: 0;
  }
}
@keyframes pulseWarningIns {
  0% {
    background-color: #f8d486;
  }
  100% {
    background-color: #f8bb86;
  }
}
</style>
