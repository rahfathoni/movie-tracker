import { mountSuspended } from '@nuxt/test-utils/runtime';
import { beforeAll, describe, expect, it } from "vitest";
import { CardsHorizontal, DetailsDescription, DetailsCast } from '#components';
import detailTvIdPage from '~/pages/detail/tv/[id].vue';

//TODO: props and pinia for data

describe('detailTvIdPage', () => {
  let wrapper: any;

  beforeAll(async () => {
    wrapper = await mountSuspended(detailTvIdPage);
    // wrapper.vm.$route.params = { id: '123' };
  });
  
  it('can mount page, contains <main id="detailTvSeries">', () => {
    expect(wrapper.html()).toContain('<main id="detailTvSeries"');
  });

  it('renders DetailsDescription component', () => {
    const description = wrapper.findComponent(DetailsDescription);
    expect(description.exists()).toBe(true);
    // props
  });

  it('renders DetailsCast component', () => {
    const cast = wrapper.findComponent(DetailsCast);
    expect(cast.exists()).toBe(true);
    // props
  });
  
  // TODO: Have v-if condition
  // it('renders CardsHorizontal component', () => {
  //   const cards = wrapper.findComponent(CardsHorizontal);
  //   expect(cards.exists()).toBe(true);
  //   expect(cards.props('type')).toBe('movie');
  //   // expect(cards.props('data')).toBe(...);
  // });
})

