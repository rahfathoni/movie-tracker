import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import { beforeAll, describe, expect, it, vi } from "vitest";
import CardsHorizontal from '~/components/Cards/Horizontal.vue';

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

describe('CardsHorizontal', () => {
  let wrapper: any;
  const navigateToMock = vi.hoisted(() => vi.fn());
  mockNuxtImport('navigateTo', () => {
    return navigateToMock;
  });

  beforeAll(async () => {
    wrapper = await mountSuspended(CardsHorizontal, {
      props: {
        data: mockData,
        type: 'movie'
      },
    });
  });

  it('can mount component, contains <div id="horizontalCards">', () => {
    expect(wrapper.html()).toContain('<div id="horizontalCards"');
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
})