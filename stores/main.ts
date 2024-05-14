import { defineStore } from "pinia";
import type { IMovies, ITvSeries, IDetailData } from './types';

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
    // movies: [] as any[],
    // tvSeries: [] as any[],
    movies: [] as IMovies[],
    tvSeries: [] as ITvSeries[],
    search: {
      name: '' as String,
      genre: {
        id: 0 as Number,
        name: '' as String
      },
      page: 1,
      data: [] as any[]
    },
    detail: {
      // data: {} as any,
      data: {} as IDetailData,
      video: [] as any[],
      cast: [] as any[],
      similar: [] as any[]
    },
    genres: {
      movie: [] as any[],
      tvSeries: [] as any[]
    },
    key: "973c81cddba2fbdbbb75d41fea67bbd8", // for trainig development purpose;
    mainDomain: "https://api.themoviedb.org/3"
  }),
  getters: {
    getOneVideoKey(state) {
      const videos = state.detail.video;
      if (videos.length === 0) {
        return '';
      }
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
      // this.detail.data = {};
      this.detail.data = {} as IDetailData;
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
        });
        const video = await useFetch(`${this.mainDomain}/${type}/${id}/videos?api_key=${this.key}`);
        console.log("[RES] fetchDetailVideo", video.data.value);
        if (video.data.value) {
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
        });
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
        });
        const similar = await useFetch(`${this.mainDomain}/${type}/${id}/similar?api_key=${this.key}`);
        console.log("[RES] fetchDetailSimilar", similar.data.value);
        if (similar.data.value && type === 'movie') {
          this.detail.similar = (similar.data.value as any).results;
        }
        if (similar.data.value && type === 'tv') {
          this.detail.similar = formattingTvSeries((similar.data.value as any).results);
        }
      } catch (err) {
        console.log('[ERR] fetchDetailSimilar', err)
      }
    },
    async fetchGenreList(type: String) {
      try {
        console.log("[REQ] fetchGenreList", {
          type: type,
        });
        const genres = await useFetch(`${this.mainDomain}/genre/${type}/list?api_key=${this.key}`);
        console.log("[RES] fetchGenresList", genres.data.value);
        if (genres.data.value && type === 'movie') {
          this.genres.movie = (genres.data.value as any).genres;
        }
        if (genres.data.value && type === 'tv') {
          this.genres.tvSeries = (genres.data.value as any).genres;
        }
      } catch (err) {
        console.log('[ERR] fetchGenresList', err)
      }
    },
    async fetchInitialAllMovies() {
      const page = this.search.page;
      const genre = this.search.genre;
      try {
        const allMovies = await useFetch(`${this.mainDomain}/discover/movie?api_key=${this.key}&sort_by=popularity.desc&page=${page}&with_genres=${genre.id || ''}`);
        console.log("[RES] fetchInitialAllMovies", allMovies.data.value);
        if (allMovies.data.value) {
          this.movies = (allMovies.data.value as any).results;
          this.search.page = this.search.page + 1;
        }
      } catch (err) {
        console.log('[ERR] fetchInitialAllMovies', err)
      }
    },
    async fetchMoreMovies() {
      const page = this.search.page;
      const genre = this.search.genre;
      try {
        console.log("[REQ] fetchMoreMovies", {
          genre: genre,
          page: page
        });
        const allMovies = await useFetch(`${this.mainDomain}/discover/movie?api_key=${this.key}&sort_by=popularity.desc&page=${page}&with_genres=${genre.id || ''}`);
        console.log("[RES] fetchMoreMovies", allMovies.data.value);
        if (allMovies.data.value) {
          const result = (allMovies.data.value as any).results;
          this.movies = [
            ...this.movies, ...result
          ]
          this.search.page = this.search.page + 1;
        }
      } catch (err) {
        console.log('[ERR] fetchMoreMovies', err)
      }
    },
    async fetchInitialAllTvSeries() {
      const page = this.search.page;
      const genre = this.search.genre;
      try {
        const allTvSeries = await useFetch(`${this.mainDomain}/discover/tv?api_key=${this.key}&sort_by=popularity.desc&page=${page}&with_genres=${genre.id || ''}`);
        console.log("[RES] fetchInitialAllTvSeries", allTvSeries.data.value);
        if (allTvSeries.data.value) {
          this.tvSeries = (allTvSeries.data.value as any).results;
          this.search.page = this.search.page + 1;
        }
      } catch (err) {
        console.log('[ERR] fetchInitialAllTvSeries', err)
      }
    },
    async fetchMoreTvSeries() {
      const page = this.search.page;
      const genre = this.search.genre;
      try {
        console.log("[REQ] fetchMoreTvSeries", {
          genre: genre,
          page: page
        });
        const allTvSeries = await useFetch(`${this.mainDomain}/discover/tv?api_key=${this.key}&sort_by=popularity.desc&page=${page}&with_genres=${genre.id || ''}`);
        console.log("[RES] fetchMoreTvSeries", allTvSeries.data.value);
        if (allTvSeries.data.value) {
          const result = (allTvSeries.data.value as any).results;
          this.tvSeries = [
            ...this.tvSeries, ...result
          ]
          this.search.page = this.search.page + 1;
        }
      } catch (err) {
        console.log('[ERR] fetchMoreTvSeries', err)
      }
    },
  }
});