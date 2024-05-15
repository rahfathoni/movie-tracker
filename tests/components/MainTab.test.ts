import { mountSuspended } from '@nuxt/test-utils/runtime';
import { beforeAll, describe, expect, it, vi } from "vitest";
import MainTab from '~/components/MainTab.vue';

const mockData = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Comedy' },
  { id: 3, name: 'Drama' }
];

describe('MainTab', () => {
  let wrapper: any;

  beforeAll(async () => {
    wrapper = await mountSuspended(MainTab, {
      props: {
        data: mockData,
        selectedGenreId: 2
      }
    });
  });

  it('can mount component, contains <div id="horizontalTabs">', () => {
    expect(wrapper.html()).toContain('<div id="horizontalTabs"');
  });

  it('renders buttons based on data prop', () => {
    const buttons = wrapper.findAll('button');
    expect(buttons.length).toBe(mockData.length);
  });

  it('genre buttons when selected', () => {
    const selectedButton = wrapper.find('button.bg-black.text-white');
    expect(selectedButton.exists()).toBe(true);
    expect(selectedButton.text()).toBe('Comedy');
  });

  it('emits event when genre button clicked', async () => {
    const buttons = wrapper.findAll('button');
    buttons.forEach(async (button: any, i: number) => {
      await button.trigger('click');
      expect(wrapper.emitted('clickGenre')).toBeTruthy();
      expect(wrapper.emitted('clickGenre')[i]).toEqual([{ id: mockData[i].id, name: mockData[i].name }]);
    });
  });
});