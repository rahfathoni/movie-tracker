import { mountSuspended } from '@nuxt/test-utils/runtime';
import { beforeAll, describe, expect, it } from "vitest";
import DetailsDescription from '~/components/Details/Description.vue';

const mockDataGenre = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Comedy' },
  { id: 3, name: 'Drama' }
];

describe('DetailsDescription', () => {
  let wrapper: any;

  beforeAll(async () => {
    wrapper = await mountSuspended(DetailsDescription, {
      props: {
        title: 'Content Title',
        poster_path: '/contentposterpath.jpg',
        video_keys: '1234567',
        genres: mockDataGenre,
        description: 'Content Description'
      }
    });
  });

  it('can mount component, contains <section>', () => {
    expect(wrapper.html()).toContain('<section');
  });

  it('renders content title', () => {
    const title = wrapper.find('h1')
    expect(title.text()).toContain('Content Title');
  });

  it('renders content poster image', () => {
    expect(wrapper.find('img#poster').attributes('src')).toContain('/contentposterpath.jpg');
  });

  it('renders content genres tab', () => {
    const tabs = wrapper.findAll('#genreList');
    expect(tabs.length).toBe(mockDataGenre.length);
    tabs.forEach((tab:any, i:number) => {
      expect(tab.text()).toContain(`${mockDataGenre[i].name}`);
    })
  });

  it('renders content description', () => {
    expect(wrapper.find('p#description').text()).toContain('Content Description');
  });

  it('renders content rating', () => {
    expect(wrapper.find('div#rating').exists()).toBe(true);
  })

  it('renders content video iframe if video_keys provided', () => {
    expect(wrapper.find('iframe').exists()).toBe(true);
    expect(wrapper.find('iframe').attributes('src')).toContain('https://www.youtube.com/embed/1234567');
  });
})