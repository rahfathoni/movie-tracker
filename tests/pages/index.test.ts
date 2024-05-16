import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import { MainButton, CardsHorizontal } from '#components';
import { beforeAll, describe, expect, it, vi } from "vitest";
import index from '~/pages/index.vue';
// import { setActivePinia, createPinia, defineStore } from 'pinia';

// TODO: testing pinia for data

const mockMovies = [
  {
    "id": 1,
    "poster_path": "/tMefBSflR6PGQLv7WvFPpKLZkyk.jpg",
    "title": "Godzilla x Kong: The New Empire",
  },
  {
    "id": 2,
    "poster_path": "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
    "title": "Kingdom of the Planet of the Apes",
  },
];
const mockTvSeries = [
  {
    "id": 1,
    "poster_path": "/onmSVwYsPMYtO8OjLdjS8FfRNKb.jpg",
    "title": "Law & Order: Special Victims Unit",
  },
  {
    "id": 2,
    "poster_path": "/eyTu5c8LniVciRZIOSHTvvkkgJa.jpg",
    "title": "Bones",
  }
];

// const useMainStore = defineStore('main', {
//   state: () => ({
//     movies: [] as any,
//     tvSeries: [] as any 
//   }),
//   actions: {
//     async fetchPopularMovie() {
//       this.movies = mockMovies;
//     },
//     async fetchPopularTvSeries() {
//       this.tvSeries = mockTvSeries;
//     },
//   }
// });

describe('index', () => {
  let wrapper: any;
  const navigateToMock = vi.hoisted(() => vi.fn());
  mockNuxtImport('navigateTo', () => {
    return navigateToMock;
  });

  beforeAll(async () => {
    wrapper = await mountSuspended(index);

    // const pinia = createPinia();
    // setActivePinia(pinia);

    // const mainStore = useMainStore();

    // await mainStore.fetchPopularMovie();
    // await mainStore.fetchPopularTvSeries();

    // wrapper = await mountSuspended(index, {
    //   global: {
    //     plugins: [pinia],
    //     components: { MainButton, CardsHorizontal }
    //   }
    // });
  });

  it('can mount page, contains <main id="homepage">', () => {
    expect(wrapper.html()).toContain('<main id="homepage"');
  });

  describe('Popular Movies Section', () => {
    it('renders popular movies section', () => {
      expect(wrapper.html()).toContain('<section id="popularMovies">');
    });

    it('renders title', () => {
      const heading = wrapper.find('#popularMovies h2');
      expect(heading.text()).toBe('Popular Movies');
    });

    it('renders MainButton component', () => {
      const button = wrapper.find('#popularMovies').findComponent(MainButton);
      expect(button.exists()).toBe(true);
    });

    it('navigates to movies page on button click', async () => {
      const button = wrapper.find('#popularMovies').findComponent(MainButton);
      await button.trigger('click');
      expect(navigateToMock).toHaveBeenCalledWith('/movie');
    });

    it('renders CardsHorizontal component', () => {
      const cards = wrapper.find('#popularMovies').findComponent(CardsHorizontal);
      expect(cards.exists()).toBe(true);
      expect(cards.props('type')).toBe('movie');
      // expect(cards.props('data')).toBe(mockMovies);
    });
  });

  describe('Popular Tv Series Section', () => {
    it('renders popular tv series section', () => {
      expect(wrapper.html()).toContain('<section id="popularTvSeries">');
    });

    it('renders title', () => {
      const heading = wrapper.find('#popularTvSeries h2');
      expect(heading.text()).toBe('Popular Tv Series');
    });

    it('renders MainButton component', () => {
      const button = wrapper.find('#popularTvSeries').findComponent(MainButton);
      expect(button.exists()).toBe(true);
    });

    it('navigates to movies page on button click', async () => {
      const button = wrapper.find('#popularTvSeries').findComponent(MainButton);
      await button.trigger('click');
      expect(navigateToMock).toHaveBeenCalledWith('/tvseries');
    });

    it('renders CardsHorizontal component', () => {
      const cards = wrapper.find('#popularTvSeries').findComponent(CardsHorizontal);
      expect(cards.exists()).toBe(true);
      expect(cards.props('type')).toBe('tv');
      // expect(cards.props('data')).toBe(mockMovies);
    });
  });
})