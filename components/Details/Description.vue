<script setup lang="ts">
  const props = defineProps<{
    title: String;
    poster_path: String;
    video_keys: String;
    genres: [],
    description: String;
  }>();
  const { title, poster_path } = props;
</script>

<template>
  <div>
    <h1 class="text-4xl font-bold">{{ title }}</h1>
    <div class="flex flex-col md:flex-row pt-5 justify-between">
      <div class="md:flex-auto flex flex-col md:flex-row h-[291px] pt-[26px]">
        <div class="pr-[26px] flex-none">
          <img 
            id="poster"
            class="rounded-[20px] h-full"
            :src="`https://image.tmdb.org/t/p/original${poster_path}`" 
            :alt="title" 
          />
        </div>
        <div class="flex-auto flex flex-col max-w-[473px] justify-around ">
          <div class="flex flex-col">
            <div 
              class="flex flex-wrap"
            >
              <div id="genreList"
                v-for="item in genres" :key="item.id"
                class="border border-black rounded-[20px] px-[18px] py-[6px] mr-[20px] mb-2 text-[18px] font-medium"
              >
                {{ item.name }}
              </div>
            </div>
            <p id="description" class="pt-[11px] text-[18px] font-medium">{{ description || ' no description ' }}</p>
          </div>
          <!-- hardcode -->
          <div id="rating" class="flex flex-row">
            <div class="pr-[18px]">
              <p class="text-[18px] font-normal pb-[1px]">IMDB Rating</p>
              <p class="text-[15px] font-normal">⭐ 9.1 <span class="color-cust-gray text-[12px]">/ 10</span></p>
            </div>
            <p
              class="text-[15px] font-normal color-cust-gray" 
              style="align-self: center;"
            >1k Reviews</p>
          </div>
        </div>
      </div>
      <div class="w-[521px]">
        <iframe 
          class="rounded-[20px] h-[291px] w-full" 
          :src="`https://www.youtube.com/embed/${video_keys}`"
        ></iframe>
      </div>
    </div>
  </div>
</template>
