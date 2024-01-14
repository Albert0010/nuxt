import {defineStore} from "pinia";

export const useDefaultStore = defineStore("user", () => {
  const isLogin = ref(false);
  const headerMessage = ref('Welcome');
  const localePath = useLocalePath();
  const setLogIn = (username:string) => {
    isLogin.value = true;
    localStorage.setItem("isLogin", "true");
    const token = useCookie('token');
    const clientId = useCookie("clientId")
      clientId.value = username;
      token.value = username;
  };
  const handleHeaderMessageChangeToDriveIn = () => {
      headerMessage.value = "DRIVE-IN";
  }
  const handleHeaderMessageChangeToWelcome = () => {
      headerMessage.value = "Welcome";
  }
  const handleNavigateToArticles = () => {
      window.location.href = localePath({name: 'articles'})
  }

  return {
      setLogIn,
      isLogin,
      headerMessage,
      handleHeaderMessageChangeToDriveIn,
      handleNavigateToArticles,
      handleHeaderMessageChangeToWelcome
  }
  }
    ,
    {
      persist: true
    });
