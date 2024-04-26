import { defineStore } from "pinia";

// const formattingTvSeries = (arr: Array<any>): Array<any> => {
//   const result = arr.map((item: any) => ({
//       ...item,
//       title: item.name || '',
//       original_title: item.original_name || '',
//       release_date: item.first_air_date || ''
//     }));
//   console.log('result =,', result)
//   return result;
// }

export const useMainStore = defineStore('mainStore', {
  state: () => ({
    movies: [],
    tvSeries: [],
    search: {
      input: '',
      data: []
    },
    key: "973c81cddba2fbdbbb75d41fea67bbd8", // for trainig development purpose;
    mainDomain: "https://api.themoviedb.org/3/"
  }),
  actions: {
    async getPopularList() {
      try {
        const popularMovie = await useFetch(`${this.mainDomain}/movie/popular?api_key=${this.key}`);
        const popularTvSeries = await useFetch(`${this.mainDomain}/tv/popular?api_key=${this.key}`);
        if (popularMovie.data.value) {
          this.movies = (popularMovie.data.value as any).results;
          this.movies = (popularMovie.data.value as any).results;
        }
        if (popularTvSeries.data.value) {
          this.tvSeries = (popularTvSeries.data.value as any).results;
          // this.tvSeries = (popularTvSeries.data.value as any).results.map((item: any) => ({
          //   ...item,
          //   title: item.name,
          //   original_title: item.original_name,
          //   release_date: item.first_air_date
          // }));
        }
      } catch (err) {
        console.log('[ERR] getPopularList', err)
      }
    }
  }
});
// https://api.themoviedb.org/3/movie/550?api_key=973c81cddba2fbdbbb75d41fea67bbd8