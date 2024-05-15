// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss", 
    "@pinia/nuxt",
    "@nuxt/test-utils/module"
  ],
  css: ['~/assets/css/main.css'],
})