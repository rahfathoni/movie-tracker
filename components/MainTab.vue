<script setup lang="ts">
  import { onMounted } from 'vue';

  const props = defineProps<{
    data: {};
    type: String;
  }>();

  // onMounted(() => {
  //   const containerCard = document.getElementById("horizontalCards");
  //   const itemToScroll = document.getElementById("itemToScroll");
    
  //   if (containerCard && itemToScroll) {
  //     containerCard.addEventListener("wheel", function(e) {
  //       if (Math.abs(e.deltaY) > 0) {
  //         e.preventDefault();
  //         itemToScroll.scrollLeft +=e.deltaY;
  //       }
  //     });
  //   } else {
  //     console.error("Either 'horizontalCards' or 'itemToScroll' is null");
  //   }
  // });

  // const toDetail = async (id: Number, t: String) => {
  //   await navigateTo(`/detail/${t}/${id}`);
  // }
</script>

<template>
  <div id="horizontalTabs" class="flex ">
    <div id="tabToScroll" class="flex flex-nowrap pt-[21px] overflow-x-scroll no-scrollbar">
      {{ type }}
      {{ data }}
      <!-- <div 
        v-for="datum in data" :key="datum.id"
        class="inline-block mr-[22px]"
      >
        <div
          class="cursor-pointer w-[177px] h-[263px] rounded-[20px] shadow-md hover:shadow-slate-500 hover:shadow-2xl transition-shadow duration-300 ease-in-out max-w-xs overflow-hidden"
          @click="toDetail(datum.id, type)"
          >
          <img :src="`https://image.tmdb.org/t/p/w500${datum.poster_path}`" :alt="datum.title" />
        </div>
      </div> -->
    </div>
  </div>
</template>

<style>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>