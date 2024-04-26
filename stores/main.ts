import { defineStore } from "pinia";

const formattingTvSeries = (arr: Array<any>): Array<any> => {
  const result = arr.map((item: any) => ({
      ...item,
      title: item.name || '',
      original_title: item.original_name || '',
      release_date: item.first_air_date || ''
    }));
  return result;
}

export const useMainStore = defineStore('mainStore', {
  state: () => ({
    movies: [] as any[],
    tvSeries: [] as any[],
    search: {
      input: '' as String,
      data: [] as any[]
    },
    key: "973c81cddba2fbdbbb75d41fea67bbd8", // for trainig development purpose;
    mainDomain: "https://api.themoviedb.org/3/"
  }),
  actions: {
    async getPopularMovie() {
      this.movies = [];
      try {
        const popularMovie = await useFetch(`${this.mainDomain}/movie/popular?api_key=${this.key}`);
        console.log("[RES] getPopularMovie =>", popularMovie.data.value)
        if (popularMovie.data.value) {
          this.movies = (popularMovie.data.value as any).results;
        }
      } catch (err) {
        console.log('[ERR] getPopularMovie', err)
      }
    },
    async getPopularTvSeries() {
      this.tvSeries = [];
      try {
        const popularTvSeries = await useFetch(`${this.mainDomain}/tv/popular?api_key=${this.key}`);
        console.log("[RES] getPopularTvSeries =>", popularTvSeries.data.value)
        if (popularTvSeries.data.value) {
          this.tvSeries = formattingTvSeries((popularTvSeries.data.value as any).results);
        }
      } catch (err) {
        console.log('[ERR] getPopularTvSeries', err)
      }
    }
  }
});
// https://api.themoviedb.org/3/movie/550?api_key=973c81cddba2fbdbbb75d41fea67bbd8