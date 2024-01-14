<template>
  <div class="high">
    <div class="high-header">
      <h1>
        Bitte wählen Sie aus, wie Sie bestellen möchten
      </h1>
    </div>
    <div class="wrapper">
      <div class="divide">
        <div class="card-wrapper">
          <div class="card">
<!--            <div class="left">-->
<!--              Lieferung-->
<!--            </div>-->
            <img src="~/assets/login.png" alt="log in">
<!--            https://commerce.boissonsheintz.lu/images/mode-delivery.jpg-->
          </div>
          <div class="text">
            <span>
              LIVRAISON
            </span>
            <p class="intro text-black">
              Lassen Sie sich Ihre Bestellung bequem zum Ort Ihrer Wahl liefern.
            </p>
            <div>
              <div class="login-form">
                <input type="text" class="input" placeholder="Kundennr."  id="username" v-model="username">
                <input type="password" class="input" placeholder="Passwort" id="password" v-model="password">
                <div>
                  <div>
                    <input class="bg-amber-50" type="checkbox" id="merken">
                  </div>
                  <label class="text-black" for="merken">Login merken</label>
                </div>
              </div>
              <button class="btn" @click="login">
                Anmelden
              </button>
            </div>
          </div>
        </div>
        <div class="middle">
          <div >
            <span class="middle-header">
              Nouveau client?
            </span>
            <span class="middle-sub-header">
              Créez votre compte client en 2 minutes !
            </span>
            <div>
              <button class="client">
                Client privé
              </button>
            </div>
            <div>
              <button class="client-pro">
                Client professionnel
              </button>
            </div>
          </div>
        </div>
        <div class="card-wrapper">
          <div class="card">
<!--            <div class="left">-->
<!--              Drive-In-->
<!--            </div>-->
            <img  src="~/assets/drive.png" alt="drive-in">
<!--            //https://commerce.boissonsheintz.lu/images/mode-drivein.jpg-->
          </div>
          <div class="text">
            <span>
              DRIVE-IN
            </span>
            <p class="intro text-black">
              Holen Sie Ihre Bestellung persönlich bei uns in Hosingen ab und profitieren Sie von ständig neuen Sonderangeboten!
            </p>
            <button class="btn" @click="handleDriveInClick">
              Einkauf starten
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>

import {useDefaultStore} from "~/stores/auth";
import {ref} from "vue";

const store = useDefaultStore();
const clientId = useCookie('clientId');

const username = ref("");
const password = ref("");

const login = async () => {
  const { data } = await useFetch('/api/getClients', {
    method: 'POST',
    body: { pClieID: username.value, pPass: password.value,locale:'fr' }
  });
  if(data.value.OK){
    store.setLogIn(username.value);
    store.handleNavigateToArticles();
  }
};
const handleDriveInClick = () => {
  clientId.value = "000001";
  store.handleNavigateToArticles();
}
</script>
<style scoped>
.middle > div >  div{
  display: flex;
  justify-content: center;
}
.middle > div >  div >  button{
  display: flex;
  height: 45px;
  padding: 16px 18px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 15px;
  border: none;
  color: white;
  width: 100%;
  cursor: pointer;
  user-select: none;
}
.client{
  background-color: #EF3E33;
  margin-top: 30px;
}
.client-pro{
  background-color: #013980;
  margin-top: 10px;
}
.middle-sub-header{
  text-align: center;
}
.middle-header{
  color: #EF3E33;
  text-align: center;
  font-family: Roboto,serif;
  font-size: 34px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
.middle > div{
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 247px;
}
.middle{
  align-items: end;
  width: 330px;
  height: 100%;
  display: flex;
  justify-content: center;
}
.btn{
  color: #fff;
  background-color: #EF3E33;
  border: none;
  width: 100%;
  display: inline-block;
  margin-bottom: 0;
  font-weight: normal;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  white-space: nowrap;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  border-radius: 15px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.intro{
  font-size: 18px;
  flex: 1 0 auto;
  display: flex;
  background-color: white;
  text-align: center;
}
.card-wrapper{
  max-width: 450px;
  box-shadow: 0 17px 27px -10px rgba(0, 0, 0, 0.25);
}
.card-wrapper > .text{
  padding: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  height: 350px;
  gap: 22px;
}
.card-wrapper > .text > div{
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.card-wrapper > .text > span{
  color: #EF3E33;
  text-align: center;
  font-family: Roboto,serif;
  font-size: 34px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
.login-form {
  display: flex;
  gap: 15px;
  flex-direction: column;
  align-items: center;
}
.login-form > div{
  display: flex;
  gap: 10px;
  width: 357px;
}
.login-form > div > div > input{
  border-radius: 3px;
}


.input{
  border-radius: 15px;
  border: 3px solid #D9D9D9;
  display: block;
  width: 357px;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  -webkit-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
  -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
  transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
}
.wrapper{
  width: 1350px;
  //margin-left: auto ;
  //margin-right: auto ;
}
.high{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.high-header{
  margin-bottom: 50px;
  margin-top: 60px;
  background-color: #EF3E33;
  padding: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
}
.high-header > h1{
  font-size: 28px;
  color: white;
  width: 1350px;
}
.divide{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  place-items: center;
}
.card{
  position: relative;
}
.card > img{
  max-width: 100%;
}
.left{
  display: block;
  position: absolute;
  left: 0;
  bottom: 30px;
  background: rgba(42,74,141,.9);
  font-size: 18px;
  text-transform: uppercase;
  color: #fff;
  padding: 10px 20px;
  border-radius: 0 4px 4px 0;
}

</style>