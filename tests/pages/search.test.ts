import { mountSuspended } from '@nuxt/test-utils/runtime';
import { MainButton, CardsList } from '#components';
import { beforeAll, describe, expect, it } from "vitest";
import searchPage from '~/pages/search.vue';

// TODO: testing pinia for data

describe('searchPage', () => {
  let wrapper: any;

  beforeAll(async () => {
    wrapper = await mountSuspended(searchPage);
  });

  it('can mount page, contains <main id="searchPage">', () => {
    expect(wrapper.html()).toContain('<main id="searchPage"');
  });

  //TODO: have v-if condition with pinia
  // it('renders subtitle', () => {
  //   const subtitle = wrapper.find('h2');
  //   expect(subtitle.text()).toContain('Showing search results for');
  // });
})