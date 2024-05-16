import { mountSuspended } from '@nuxt/test-utils/runtime';
import { beforeAll, describe, expect, it } from "vitest";
import MainButton from '~/components/MainButton.vue';

describe('MainButton', () => {
  let wrapper: any;

  beforeAll(async () => {
    wrapper = await mountSuspended(MainButton, {
      props: {
        label: 'Load more movies',
        bgColor: 'bg-green-500',
        fontWeight: 'font-bold'
      }
    });
  });

  it('can mount component, contains <button>', () => {
    expect(wrapper.html()).toContain('<button');
  });

  it('renders label based on prop', () => {
    const button = wrapper.find('button');
    expect(button.text()).toBe('Load more movies');
  });

  it('renders background color based on prop', () => {
    const button = wrapper.find('button');
    expect(button.classes()).toContain('bg-green-500');
  });

  it('renders font weight based on prop', () => {
    const button = wrapper.find('button');
    expect(button.classes()).toContain('font-bold');
  });
})