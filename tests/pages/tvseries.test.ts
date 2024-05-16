import { mountSuspended } from '@nuxt/test-utils/runtime';
import { MainTab, MainButton, CardsList } from '#components';
import { beforeAll, describe, expect, it } from "vitest";
import tvSeriesPage from '~/pages/tvseries.vue';

// TODO: testing pinia for data

describe('tvSeries', () => {
  let wrapper: any;

  beforeAll(async () => {
    wrapper = await mountSuspended(tvSeriesPage);
  });

  it('can mount page, contains <main id="tvSeriesPage">', () => {
    expect(wrapper.html()).toContain('<main id="tvSeriesPage"');
  });

  it('renders subtitle', () => {
    const header = wrapper.find('h2#subtitle');
    expect(header.exists()).toBe(true);
    expect(header.text()).toBe('Tv Series');
  });

  it('renders MainTab component', () => {
    const tab = wrapper.findComponent(MainTab);
    expect(tab.exists()).toBe(true);
    // expect(tab.props('data')).toEqual(...);
    // expect(tab.props('selectedGenreId')).toBe(...);

  });

  it('renders CardsList component', () => {
    const cards = wrapper.findComponent(CardsList);
    expect(cards.exists()).toBe(true);
    expect(cards.props('type')).toBe('tv');
    // expect(cards.props('data')).toEqual(...);
  });

  // TODO: Have v-if condition
  // it('renders Load More button', () => {
  //   const button = wrapper.findComponent(MainButton);
  //   expect(button.exists()).toBe(true);
  //   expect(button.text()).toBe('Load more movies');
  // })
})