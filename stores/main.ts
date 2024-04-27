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
    detail: {
      data: {} as any,
      video: [] as any[],
      cast: [] as any[],
      similar: [] as any[]
    },
    key: "973c81cddba2fbdbbb75d41fea67bbd8", // for trainig development purpose;
    mainDomain: "https://api.themoviedb.org/3"
  }),
  actions: {
    async getPopularMovie() {
      this.movies = [];
      try {
        const popularMovie = await useFetch(`${this.mainDomain}/movie/popular?api_key=${this.key}`);
        console.log("[RES] getPopularMovie ", popularMovie.data.value);
        if (popularMovie.data.value) {
          this.movies = (popularMovie.data.value as any).results;
        }
      } catch (err) {
        console.log('[ERR] getPopularMovie', err);
      }
    },
    async getPopularTvSeries() {
      this.tvSeries = [];
      try {
        const popularTvSeries = await useFetch(`${this.mainDomain}/tv/popular?api_key=${this.key}`);
        console.log("[RES] getPopularTvSeries ", popularTvSeries.data.value);
        if (popularTvSeries.data.value) {
          this.tvSeries = formattingTvSeries((popularTvSeries.data.value as any).results);
        }
      } catch (err) {
        console.log('[ERR] getPopularTvSeries', err);
      }
    },
    async getDetailData(id: String, type: String) {
      this.detail.data = {};
      try {
        console.log("[REQ] getDetailData ", {
          type: type,
          id: id
        });
        const detail = await useFetch(`${this.mainDomain}/${type}/${id}?api_key=${this.key}`);
        console.log("[RES] getDetailData", detail.data.value);
        if (detail.data.value) {
          this.detail.data = detail.data.value;
        }
      } catch (err) {
        console.log('[ERR] getDetailData', err)
      }
    },
    async getDetailVideo(id: String, type: String) {
      this.detail.video = [];
      try {
        console.log("[REQ] getDetailVideo", {
          type: type,
          id: id
        }) 
        const video = await useFetch(`${this.mainDomain}/${type}/${id}/videos?api_key=${this.key}`);
        console.log("[RES] getDetailVideo", video.data.value);
        if (video.data.value) {
          // filter yg "site": "YouTube" "type": "Trailer", kalo gak ada masukin "site": "YouTube" "type": "Trailer"
          this.detail.video = (video.data.value as any).results;
        }
      } catch (err) {
        console.log('[ERR] getDetailVideo', err)
      }
    },
    async getDetailCast(id: String, type: String) {
      this.detail.cast = [];
      try {
        console.log("[REQ] getDetailCast", {
          type: type,
          id: id
        }) 
        const cast = await useFetch(`${this.mainDomain}/${type}/${id}/credits?api_key=${this.key}`);
        console.log("[RES] getDetailCast", cast.data.value);
        if (cast.data.value) {
          this.detail.cast = (cast.data.value as any).cast;
        }
      } catch (err) {
        console.log('[ERR] getDetailCast', err)
      }
    },
    async getDetailSimilar(id: String, type: String) {
      this.detail.similar = [];
      try {
        console.log("[REQ] getDetailSimilar", {
          type: type,
          id: id
        }) 
        const similar = await useFetch(`${this.mainDomain}/${type}/${id}/similar?api_key=${this.key}`);
        console.log("[RES] getDetailSimilar", similar.data.value);
        if (similar.data.value) {
          this.detail.similar = (similar.data.value as any).results;
        }
      } catch (err) {
        console.log('[ERR] getDetailSimilar', err)
      }
    },
  }
});