<template>
  <div>
    <div class="wholeContainer">
      <div class="mainContainer">
        <div class="nav-div">
          <div class="nav">
            <span class="logo">
              <span class="logoHeading">Jack Website</span><br />
              <span class="logoSubHeading">BlockChain</span>
            </span>
            <span class="buttons">
              <button class="changeSeed" @click="handlePage()">
                Change Account
              </button>
              <!-- <button class="LogOut">LogOut</button> -->
            </span>
          </div>
        </div>
      </div>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg
          x="0"
          y="0"
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="2560 0 2560 100 0 100"
            class="fill-default"
          ></polygon>
        </svg>
      </div>
    </div>
    <div class="boxes">
      <div class="enterSeed">
        <div class="overvlay" v-if="enterSeed === 'true'">
          <div>
            <br /><br />
            <!-- <span class="curvedArrow"><img src="../assets/images/curvedArrow.png" width="25px"></span> -->
            <h3 class="enterSeedHeading">
              Please enter your seed to continue.
            </h3>
            <input
              type="text"
              class="AddressToInput"
              placeholder="hill safe victory ..."
              style="width: 60%"
              id="seedInput"
              required
              v-model="seed"
            />
            <h1 style="text-align: center">
              <button
                v-if="btnCondition === 'normal'"
                class="transactionBtn"
                @click="checkSeed()"
              >
                Access My Account
              </button>
              <button v-if="btnCondition === 'working'" class="transactionBtn">
                <img
                  src="../assets/images/loading.gif"
                  style="width: 20px; margin-right: 4px;position:relative;top:5px;"
                />
                loading...
              </button>
            </h1>
          </div>
          http://45.76.166.241:8080/api/v1/wallet/addr1q8zk0a8p0darg2m4whzve5fry595tmahqd6jgzt9chr2ay79vl6wz7m6xs4h2awyengjxfgtghhmwqm4ysykt3wx46fs2wwd4g/balance
        </div>
      </div>
      <div class="box">
        <span
          ><span class="boxHeading"> Account Address </span>
          <span class="boxImg"
            ><img
              src="../assets/images/accountAddressIcon.png"
              width="50px" /></span></span
        ><br />
        <span
          ><span class="arrowUpImg"
            ><img src="../assets/images/arrowUpIcon.png" width="20px" /></span
          ><span class="boxSubHeading"
            >{{ userAddressFormated }}
            <button
              class="tooltips"
              v-clipboard:copy="userAddress"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
            >
              <span class="tooltiptexts" id="myTooltips">Copy to clipboard</span
              ><img
                class="icon-copy"
                src="../assets/images/content_copy-black-18dp.svg"
                alt=""
              /></button></span
        ></span>
      </div>
      <div class="box">
        <span
          ><span class="boxHeading"> Account Balance </span>
          <span class="boxImg"
            ><img
              src="../assets/images/amountBalance.png"
              width="50px" /></span></span
        ><br />
        <span class="boxSubHeading2"
          ><span class="arrowUpImg2"
            ><img src="../assets/images/arrowUpIcon.png" width="20px" /></span
          ><span>{{ userBalance }}</span></span
        >
      </div>
      <div class="box">
        <span
          ><span class="boxHeading3" style="margin-left: -40px">
            Other Tokens
          </span>
          <span class="boxImg"
            ><img
              src="../assets/images/ethToken.png"
              width="50px" /></span></span
        ><br />
        <span class="otherTokenName">ADA</span>
        <span class="boxSubHeading3"
          ><span class="arrowUpImg3"
            ><img src="../assets/images/arrowUpIcon.png" width="20px" /></span
          ><span>20 ADA</span></span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      enterSeed: "true",
      seed: "",
      userAddress: "",
      userAddressFormated: "",
      userBalance: "",
      btnCondition: "normal",
    };
  },
  methods: {
    checkSeed() {
      this.btnCondition = "working";
      if (this.seed === "") {
        this.$toasted.error("Please first enter your seed.");
        this.btnCondition = "normal";
      }
      this.$http
        .post("http://45.76.166.241:8080/api/v1/getAddress", {
          seed: this.seed,
        })
        .then(function (data) {
          console.log("data", data);
          this.enterSeed = "false";
          this.userAddress = data.body.address;
          console.log("userAddress", this.userAddress);
          const userAddressFormat = this.userAddress.match(/[\w]{25}/);
          console.log("sdlkfajldsjfladsf", userAddressFormat);
          this.userAddressFormated = userAddressFormat.toString() + "...";
          console.log("sdlkfajldsjfladsf", this.userAddressFormated);
          this.$http
            .get(
              "http://45.76.166.241:8080/api/v1/wallet/" +
                this.userAddress +
                "/balance"
            )
            .then(function (data) {
              this.btnCondition = "normal";
              console.log(data);
              this.userBalance = data.body.formatted;
              console.log("userBalance", this.userBalance);
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log("error", error);
          this.$toasted.error("Soory your seed is incorrectt.");
          this.btnCondition = "normal";
        });
    },
    onCopy(e) {
      console.log("Your Msg", e.text);
      this.$toasted.success("Address Copied " + this.userAddress);
    },
    onError(e) {
      console.log(e.key);
      this.$toasted.success("Failed to copy Texts " + this.userAddress);
    },
    handlePage() {
      this.enterSeed = "true";
    },
  },
};
</script>

<style>
.boxes {
  /* background-color: red !important; */
  width: 100%;
  height: 20%;
  position: absolute;
  right: 0;
  left: 0;
  top: 18%;
}
.box {
  margin-top: 30px;
  background-color: white;
  display: inline-block;
  width: 24%;
  height: 55%;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  overflow: hidden;
  /* -moz-box-shadow:    3px 3px 5px 6px #ccc;
  -webkit-box-shadow: 3px 3px 5px 6px #ccc; */
  box-shadow: 3px 0px 11px 4px rgb(230, 230, 230);
  margin-right: 40px;
}
.boxHeading {
  float: left;
  /* position: relative; */
  /* top: -22px; */
  /* left: -80px; */
  color: #6f7985;
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  margin-left: 20px;
}
.boxImg {
  float: right;
  margin-right: 20px;
  margin-top: 5px;
  /* position: relative;
  left: 90px; */
}
.boxSubHeading {
  /* top: -11px; */
  color: #13e753;
  width: 22%;
  /* float: right;
  position: relative;
  left: -250px;
  top: 7px; */
  float: left;
  margin-top: 67px;
  margin-left: -130px;
  flex-wrap: nowrap;
}
.arrowUpImg {
  float: left;
  position: relative;
  top: 65px;
  margin-left: -150px;
}
.boxHeading3 {
  float: left;
  /* position: relative; */
  /* top: -22px; */
  /* left: -80px; */
  color: #6f7985;
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  position: relative;
  left: 65px;
}
.arrowUpImg2 {
  float: left;
  margin-left: 10px;
  margin-top: -3px;
}
.loading_class {
  vertical-align: sub;
  width: 140px;
  margin: 0 auto;
  position: absolute;
  left: 45%;
  transform: translateX(-50%);
}
.boxSubHeading2 {
  color: #13e753;
  width: 22%;
  float: left;
  margin-top: 67px;
  margin-left: -155px;
  flex-wrap: nowrap !important;
}
.otherTokenName {
  float: left;
  margin-top: 40px;
  margin-left: -49px;
  font-weight: bold;
}
.arrowUpImg3 {
  float: left;
  /* margin-left: -30px; */
}
.boxSubHeading3 {
  color: #13e753;
  width: 22%;
  float: left;
  margin-top: 72px;
  margin-left: -53px;
}
@media only screen and (max-width: 1630px) {
  .boxHeading {
    position: relative;
    top: -10px;
    left: -10px;
  }
  .boxSubHeading {
    position: relative;
    top: -20px;
    left: -10px;
  }
  .arrowUpImg {
    position: relative;
    /* top: -10px; */
    left: -10px;
    margin-top: -20px;
  }
  .boxSubHeading2 {
    position: relative;
    top: -20px;
    left: -15px;
  }
  .boxHeading3 {
    position: relative;
    top: -10px;
    left: 45px;
  }
  .otherTokenName {
    position: relative;
    top: -15px;
    left: -20px;
  }
  .boxSubHeading3 {
    position: relative;
    top: -15px;
    left: -20px;
  }
}
.overvlay {
  width: 50%;
  height: 270%;
  background-color: #172b4d;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  margin: 0 auto;
  border-radius: 10px;
}
.enterSeedHeading {
  color: white;
  margin-top: 100px;
}
#seedInput {
  margin: 0 auto;
}
.curvedArrow {
  float: right;
  margin-right: 20px;
  margin-top: -10px;
}
#copy-key {
  margin-left: 15px;
  border-radius: 10px;
  padding: 2px 7px;
  position: relative;
  right: 10px;
  top: 2px;
}
.tooltip {
  position: relative;
  display: inline-block;
  border: none;
  background-color: rgb(255, 251, 243);
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 140px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 150%;
  left: 50%;
  margin-left: -75px;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: 10px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}

.tooltips {
  float: right;
  position: relative;
  left: 180px;
  top: -19px;
  display: inline-block;
  border: none;
  background-color: rgb(255, 251, 243);
  outline: none;
}

.tooltips .tooltiptexts {
  visibility: hidden;
  width: 140px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 150%;
  left: 50%;
  margin-left: -70px;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltips .tooltiptexts::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -10px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

.tooltips:hover .tooltiptexts {
  visibility: visible;
  opacity: 1;
}
</style>