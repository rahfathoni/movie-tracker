<script setup lang="ts">
  import { onMounted } from 'vue';
  const props = defineProps<{
    title: String;
    poster_path: String;
    video_keys: String;
    genre: [],
    description: String;
  }>();
  const { title, poster_path } = props;
</script>

<template>
  <section>
    <h1 class="text-4xl font-bold">{{ title }}</h1>
    <div class="flex flex-col md:flex-row pt-5 justify-between">
      <div class="md:flex-auto flex flex-col md:flex-row h-[291px]">
        <div class="pr-[26px] flex-none">
          <img 
            class="rounded-[20px] h-full"
            :src="`https://image.tmdb.org/t/p/original${poster_path}`" 
            :alt="title" 
          />
        </div>
        <div class="flex-auto flex flex-col max-w-[473px]">
          <div>
            genre
          </div>
          <div>
            desc
          </div>
          <div>
            rating
            <!-- hardcode -->
          </div>
        </div>
      </div>
      <div class="w-[521px]">
        <!-- <iframe s /> -->
        <!-- <video 
          class="rounded-[20px] h-[291px]"
          :src="`https://image.tmdb.org/t/p/original${detail.backdrop_path}`" 
          :alt="type === 'movie' ? detail.title : detail.name" 
        /> -->
      </div>
    </div>
  </section>
</template>
