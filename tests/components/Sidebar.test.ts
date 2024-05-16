import { mountSuspended } from '@nuxt/test-utils/runtime';
import { NuxtLink, IconsHome, IconsMovie, IconsDeviceTV, IconsSearch } from '#components';
import { describe, expect, it, beforeAll } from 'vitest';
import Sidebar from '~/components/Sidebar.vue';

describe('Sidebar', () => {
  let wrapper: any;
  beforeAll(async () => {
    wrapper = await mountSuspended(Sidebar);
  });
  // Nav
  it('can mount component, contains <nav>', () => {
    expect(wrapper.html()).toContain('<nav');
  });
  // NuxtLink
  it('contain NuxtLink to pages', async () => {
    const nuxtLinks = wrapper.findAllComponents(NuxtLink);
    nuxtLinks.forEach((nuxtLink: any) => {
      expect(nuxtLink.exists()).toBe(true);
      const toProp = nuxtLink.props('to');
      if (toProp === '/') {
        expect(nuxtLink.findComponent(IconsHome).exists()).toBe(true);
      } else if (toProp === '/movie') {
        expect(nuxtLink.findComponent(IconsMovie).exists()).toBe(true);
      } else if (toProp === '/tvseries') {
        expect(nuxtLink.findComponent(IconsDeviceTV).exists()).toBe(true);
      } else if (toProp === '/search') {
        expect(nuxtLink.findComponent(IconsSearch).exists()).toBe(true);
      } else {
        throw new Error(`Unexpected 'to' value: ${toProp}`);
      }
    });
  });
});