<template>
  <div class="login-container">
    <div>
      <div >
        <div class="input-section">
          <div class="form-group">
            <img src="../assets/User.svg" alt="user icon" />
            <input
              type="text"
              id="username"
              v-model="username"
              placeholder="Username or Email"
            />
          </div>
          <div class="form-group">
            <img src="../assets/lock.svg" alt="user icon" />
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Password"
            />
            <div class="eye">
              <img src="../assets/eye.svg" alt="eye icon" />
            </div>
          </div>
        </div>
        <div class="forgot-password">Forgot Password?</div>
        <button @click="login" >Login</button>
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref } from "vue";
import { useDefaultStore } from "~/stores/auth.ts";
import axios from "axios";

const localePath = useLocalePath();
const router = useRouter();
const username = ref("");
const password = ref("");
const store = useDefaultStore();

const login = async () => {
  // if (username.value === "admin" && password.value === "admin") {
  //   store.setLogIn();
    // router.push(localePath({name:'index'}));
  // } else {
  //   alert("Wrong password or email");
  // }
  // const response = await axios.post('/api/getClients', {
  //   locale:"fr"
  // });
  const { data, error } = await useFetch('/api/getClients', {
    method: 'POST',
    body: { pClieID: username.value, pPass: password.value,locale:'fr' }
  });
};

</script>

<style scoped>
.login-container {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.form-group {
  position: relative;
}
.form-group > input {
  border: 1px solid #a8a8a9;
  border-radius: 10px;
  max-width: 317px;
  padding: 14px 20px 14px 40px;
  width: 100%;
}
.form-group > img {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 8px;
  height: 24px;
  width: 24px;
  cursor: pointer;
}
.eye {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 15px;
  cursor: pointer;
}
.forgot-password {
  color: #ff0000;
  width: 100%;
  display: flex;
  justify-content: end;
  font-size: 12px;
  font-weight: 400;
  font-family: "Montserrat", sans-serif;
  margin-top: 10px;
  text-decoration: underline;
  cursor: pointer;
}
.input-section {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
button {
  display: block;
  width: 100%;
  padding: 21px 109px 21px 109px;
  background-color: #ff0000;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 54px;
  font-size: 20px;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
}
</style>
