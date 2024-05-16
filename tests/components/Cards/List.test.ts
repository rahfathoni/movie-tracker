import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import { beforeAll, describe, expect, it, vi } from "vitest";
import CardsList from '~/components/Cards/List.vue';

const mockData = [
  { 
    id: 1, 
    poster_path: "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
    title: "Kingdom of the Planet of the Apes"
  },
  { 
    id: 2, 
    poster_path: "/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
    title: "Dune: Part Two"
  },
  { 
    id: 3, 
    poster_path: "/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg",
    title: "Kung Fu Panda 4"
  },
];
const mockDataSearch = [
  { 
    id: 1, 
    poster_path: "/4edFyasCrkH4MKs6H4mHqlrxA6b.jpg",
    title: "Doctor Who",
    media_type: "tv"
  },
  { 
    id: 2, 
    poster_path: "/7WfK17BXE6szXlm4WOxfswgbdsL.jpg",
    title: "Doctor Strange",
    media_type: "movie"
  },
  { 
    id: 3, 
    poster_path: "/29ifz2K8kqZD6eb2sTKBP9Hlc3N.jpg",
    title: "Miracle Doctor",
    media_type: "tv"
  },
];

describe('CardsList', () => {
  let wrapper: any;
  const navigateToMock = vi.hoisted(() => vi.fn());
  mockNuxtImport('navigateTo', () => {
    return navigateToMock;
  });

  beforeAll(async () => {
    wrapper = await mountSuspended(CardsList, {
      props: {
        data: mockData,
        type: 'movie'
      },
    });
  });

  it('can mount component, contains <div id="ListCards">', () => {
    expect(wrapper.html()).toContain('<div id="ListCards"');
  });

  it('renders cards based on data prop', () => {
    const cards = wrapper.findAll('div.cursor-pointer');
    expect(cards.length).toBe(mockData.length);
  });

  it('renders poster images based on data prop', () => {
    const images = wrapper.findAll('img');
    images.forEach((img: any, i: number) => {
      expect(img.attributes('src')).toBe(`https://image.tmdb.org/t/p/w500${mockData[i].poster_path}`);
      expect(img.attributes('alt')).toBe(mockData[i].title);
    });
  });

  it('navigates to detail page on card click', async () => {
    const cards = wrapper.findAll('div.cursor-pointer');
    cards.forEach(async (card: any, i: number) => {
      await cards[i].trigger('click');
      expect(navigateToMock).toHaveBeenCalledWith(`/detail/movie/${mockData[i].id}`);
    })
  });

  describe('when type is search', () => {
    beforeAll(async () => {
      navigateToMock.mockClear();
      wrapper = await mountSuspended(CardsList, {
        props: {
          data: mockDataSearch,
          type: 'search'
        },
      });
    });

    it('navigates to detail page on card click with search type', async () => {
      const cards = wrapper.findAll('div.cursor-pointer');
      for (let i = 0; i < cards.length; i++) {
        await cards[i].trigger('click');
        expect(navigateToMock).toHaveBeenCalledWith(`/detail/${mockDataSearch[i].media_type}/${mockDataSearch[i].id}`);
      }
    });
  });
})