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
  getters: {
    getOneVideoKey(state) {
      const videos = state.detail.video;
      if (videos.length === 1) {
        return videos[0].key;
      }
      let finalVideo = videos.filter(
        (item: any) => (item).site === 'YouTube' && (item).type === 'Trailer'
      );
      if (finalVideo.length > 0) {
        return finalVideo[0].key;;
      }
      finalVideo = videos.filter(
        (item: any) => (item).site === 'YouTube' && (item).type === 'Teaser'
      );
      if (finalVideo.length > 0) {
        return finalVideo[0].key;
      }
      return videos[0].key;
    }
  },
  actions: {
    async fetchPopularMovie() {
      this.movies = [];
      try {
        const popularMovie = await useFetch(`${this.mainDomain}/movie/popular?api_key=${this.key}`);
        console.log("[RES] fetchPopularMovie ", popularMovie.data.value);
        if (popularMovie.data.value) {
          this.movies = (popularMovie.data.value as any).results;
        }
      } catch (err) {
        console.log('[ERR] fetchPopularMovie', err);
      }
    },
    async fetchPopularTvSeries() {
      this.tvSeries = [];
      try {
        const popularTvSeries = await useFetch(`${this.mainDomain}/tv/popular?api_key=${this.key}`);
        console.log("[RES] fetchPopularTvSeries ", popularTvSeries.data.value);
        if (popularTvSeries.data.value) {
          this.tvSeries = formattingTvSeries((popularTvSeries.data.value as any).results);
        }
      } catch (err) {
        console.log('[ERR] fetchPopularTvSeries', err);
      }
    },
    async fetchDetailData(id: String, type: String) {
      this.detail.data = {};
      try {
        console.log("[REQ] getDetailData ", {
          type: type,
          id: id
        });
        const detail = await useFetch(`${this.mainDomain}/${type}/${id}?api_key=${this.key}`);
        console.log("[RES] fetchDetailData", detail.data.value);
        if (detail.data.value) {
          this.detail.data = detail.data.value;
        }
      } catch (err) {
        console.log('[ERR] fetchDetailData', err)
      }
    },
    async fetchDetailVideo(id: String, type: String) {
      this.detail.video = [];
      try {
        console.log("[REQ] getDetailVideo", {
          type: type,
          id: id
        }) 
        const video = await useFetch(`${this.mainDomain}/${type}/${id}/videos?api_key=${this.key}`);
        console.log("[RES] fetchDetailVideo", video.data.value);
        if (video.data.value) {
          // const results = (video.data.value as any).results;
          // if (results.length === 1) {
          //   this.detail.video = (video.data.value as any).results;
          //   return;
          // }
          // let finalVideo: [] = results.filter(
          //   (item: any) => (item).site === 'YouTube' && (item).type === 'Trailer'
          // );
          // if (finalVideo.length > 0) {
          //   this.detail.video = finalVideo;
          //   return;
          // }
          // finalVideo = results.filter(
          //   (item: any) => (item).site === 'YouTube' && (item).type === 'Teaser'
          // );
          // if (finalVideo.length > 0) {
          //   this.detail.video = finalVideo;
          //   return;
          // }
          this.detail.video = (video.data.value as any).results;
        }
      } catch (err) {
        console.log('[ERR] fetchDetailVideo', err)
      }
    },
    async fetchDetailCast(id: String, type: String) {
      this.detail.cast = [];
      try {
        console.log("[REQ] fetchDetailCast", {
          type: type,
          id: id
        }) 
        const cast = await useFetch(`${this.mainDomain}/${type}/${id}/credits?api_key=${this.key}`);
        console.log("[RES] fetchDetailCast", cast.data.value);
        if (cast.data.value) {
          this.detail.cast = (cast.data.value as any).cast;
        }
      } catch (err) {
        console.log('[ERR] fetchDetailCast', err)
      }
    },
    async fetchDetailSimilar(id: String, type: String) {
      this.detail.similar = [];
      try {
        console.log("[REQ] fetchDetailSimilar", {
          type: type,
          id: id
        }) 
        const similar = await useFetch(`${this.mainDomain}/${type}/${id}/similar?api_key=${this.key}`);
        console.log("[RES] fetchDetailSimilar", similar.data.value);
        if (similar.data.value) {
          this.detail.similar = (similar.data.value as any).results;
        }
      } catch (err) {
        console.log('[ERR] fetchDetailSimilar', err)
      }
    },
  }
});