<script setup lang="ts">
  const props = defineProps<{
    data: {};
    type: String;
  }>();

  const toDetail = async (id: Number, t: String) => {
    await navigateTo(`/detail/${t}/${id}`);
  }
</script>

<template>
  <div id="ListCards" class="flex ">
    <div 
      class="flex flex-wrap justify-between"
    >
    <div 
        v-for="datum in data" :key="datum.id"
        class="inline-block mr-[20px] my-[20px]"
      >
        <div
          class="cursor-pointer w-[177px] h-[263px] rounded-[20px] shadow-md hover:shadow-slate-500 hover:shadow-2xl transition-shadow duration-300 ease-in-out max-w-xs overflow-hidden"
          @click="toDetail(datum.id, type)"
          >
          <img cl :src="`https://image.tmdb.org/t/p/w500${datum.poster_path}`" :alt="datum.title" />
        </div>
      </div>
    </div>
  </div>
</template>
