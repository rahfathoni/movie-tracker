import { mountSuspended } from '@nuxt/test-utils/runtime';
import { beforeAll, describe, expect, it } from "vitest";
import MainHeader from '~/components/MainHeader.vue';

// TODO: pinia store, watcher

describe('MainHeader', () => {
  let wrapper: any;
  let input: any;

  beforeAll(async () => {
    wrapper = await mountSuspended(MainHeader);
    input = wrapper.find('input[name="search"]');
  });

  it('can mount component, contains <header>', () => {
    expect(wrapper.html()).toContain('<header');
  });

  it('renders title', () => {
    const title = wrapper.find('h1[name="title"]');
    expect(title.text()).toContain('The Movie Tracker');
  });

  it('renders input field', () => {
    const input = wrapper.find('input[name="search"]');
    expect(input.exists()).toBe(true);
    expect(input.attributes('placeholder')).toBe('🔍 Search a movie or a series');
  });

  it('updates searchValue with input', async () => {
    await input.setValue('Marvel');
    // expect(wrapper.vm.searchValue._value).toBe('Marvel');
    expect(input.element.value).toBe('Marvel')
  });

  // watcher and pinia
})