<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1> -->

    <boxes />
    <sendTransaction />
  </div>
</template>

<script>
import boxes from './boxes'
import sendTransaction from './sendTransaction'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    boxes,
    sendTransaction
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.wholeContainer{
  background-color: #172b4d !important;
  width: 100%;
  height: 150%;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
.mainContainer{
  background: linear-gradient(87deg, #2dce89 0, #4debe8 100%) !important;
  /* background-color: red; */
  width: 100%;
  height: 33%;
  position: absolute;
  top: 0;
  right: 0;
}
.separator-skew {
    height: 60px;
}
.separator-bottom {
    top: auto;
    bottom: 0;
}
.separator {
    position: absolute;
    top: 28%;
    left: 0;
    right: 0;
    width: 100%;
    height: 150px;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    overflow: hidden;
    pointer-events: none;
}
svg {
    overflow: hidden;
    vertical-align: middle;
}
.fill-default {
    fill: #172b4d;
}
.separator svg {
    /* position: absolute; */
    pointer-events: none;
}
.nav-div{
  background-color: red;
  color: white;
  width: 80%;
  margin: 0 auto;
}
.logo{
  float: left;
  text-transform: uppercase;
  font-weight: 900;
  margin-top: 30px;
}
.logoHeading{
  font-size: 23px;
}
.buttons{
  float: right;
  margin-top: 20px;
}
.changeSeed{
  padding: 15px 20px;
  color: white;
  border: none;
  border: 2px solid white;
  border-radius: 30px;
  background-color: transparent;
  font-weight: bold;
  font-size: 15px;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  outline: none;
}
.changeSeed:hover{
  cursor: pointer;
  border: 2px solid rgb(219, 219, 219);
  color: #4debe8;
  background-color: white;
  font-size: 15px;
}
</style>
