import { mountSuspended } from '@nuxt/test-utils/runtime';
import { beforeAll, describe, expect, it } from "vitest";
import MainHeader from '~/components/MainHeader.vue';

describe('MainHeader', () => {
  let wrapper: any;
  beforeAll(async () => {
    wrapper = await mountSuspended(MainHeader);
  });
  // Header
  it('can mount component, contains <header>', () => {
    expect(wrapper.html()).toContain('<header');
  });
})