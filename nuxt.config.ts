// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  webpack: {
    loaders: {
      vue: {
        hotReload: true,
      },
    },
  },
  ssr: true,
  modules: ["@nuxtjs/i18n", "@pinia/nuxt","@pinia-plugin-persistedstate/nuxt",'@nuxt/ui'],
  piniaPersistedstate: {
    cookieOptions: {
      sameSite: 'strict',
    },
    storage: 'localStorage'
  },
  i18n: {
    customRoutes: "config",
    strategy: "prefix",
    locales: [
      { code: "de", name: "German", iso: "de-DE", file: "de.js" },
      { code: "fr", name: "France", iso: "fr-FR", file: "fr.js" },
    ],
    langDir: "lang",
    defaultLocale: "de",
    vueI18n: "./i18.config.ts",
  },

});
