import { mountSuspended } from '@nuxt/test-utils/runtime';
import { beforeAll, describe, expect, it } from "vitest";
import DetailsCast from '~/components/Details/Cast.vue';

const mockCast = [
  {
    id: 1,
    profile_path: '/profilepath1',
    name: 'actor a',
    character: 'chacracter 1'
  },
  {
    id: 2,
    profile_path: '/profilepath2',
    name: 'actor b',
    character: 'chacracter 2'
  },
  {
    id: 3,
    profile_path: '/profilepath3',
    name: 'actor c',
    character: 'chacracter 3'
  }
]

describe('DetailsCast', () => {
  let wrapper: any;

  beforeAll(async () => {
    wrapper = await mountSuspended(DetailsCast, {
      props: {
        cast: mockCast
      }
    });
  });

  it('can mount component, contains <section>', () => {
    expect(wrapper.html()).toContain('<section');
  });

  it('renders subtitle', () => {
    const subtitle = wrapper.find('h2')
    expect(subtitle.text()).toContain('Cast');
  });

  it('renders cards based on data prop', () => {
    const containerCard = wrapper.find('div#castCard');
    expect(containerCard.exists()).toBe(true);
    const cards = wrapper.findAll('div#itemToScrollCard > div');
    expect(cards.length).toBe(mockCast.length);
    mockCast.forEach((cast: any, i: number) => {
      const card = cards[i];
      expect(card.find('img').attributes('src')).toContain(cast.profile_path);
      expect(card.find('p.text-base').text()).toContain(cast.name);
      expect(card.find('p.font-medium').text()).toContain(cast.character);
    });
  });
})