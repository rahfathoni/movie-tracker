import { defineStore } from "pinia";

export const useMainStore = defineStore('mainStore', {
  state: () => ({
    movies: null,
    tvShow: null,
    search: '',
    key: "973c81cddba2fbdbbb75d41fea67bbd8" // for trainig development purpose
  }),
  // actions: {
  //   async fetch() {
  //     // const infos = await $fetch('https://api.nuxt.com/modules/pinia')

  //     // this.name = infos.name
  //     // this.description = infos.description
  //   }
  // }
});