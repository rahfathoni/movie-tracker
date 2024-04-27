<script setup lang="ts">
  import { onMounted } from 'vue';

  const props = defineProps<{
    cast: [];
  }>();
  const { cast } = props;

  onMounted(() => {
    const containerCard = document.getElementById("castCards");
    const itemToScroll = document.getElementById("itemToScrollCard");
    
    if (containerCard && itemToScroll) {
      containerCard.addEventListener("wheel", function(e) {
        if (Math.abs(e.deltaY) > 0) {
          e.preventDefault();
          itemToScroll.scrollLeft +=e.deltaY;
        }
      });
    } else {
      console.error("Either 'castCards' or 'itemToScrollCard' is null");
    }
  });
</script>

<template>
  <section>
    <h2 class="font-medium text-[20px]">
      Cast
    </h2>
    <div id="castCard" class="flex">
      <div id="itemToScrollCard" class="flex flex-nowrap pt-[22px] pb-[57px] overflow-x-scroll no-scrollbar">
        <div 
          v-for="datum in cast" :key="datum.id"
          class="mr-[22px] bg-white rounded-[20px] shadow-md hover:shadow-slate-500 hover:shadow-2xl transition-shadow duration-300 ease-in-out"
        >
          <div
            class="w-[177px] h-[263px] rounded-t-[20px] overflow-hidden"
          >
            <img v-if="datum.profile_path" :src="`https://image.tmdb.org/t/p/w500${datum.profile_path}`" :alt="datum.name" />
            <img v-else src="~/assets/no-picture.png" class="h-full" :alt="datum.name" />
          </div>
          <div class="pt-[7px] px-[13px] pb-[16px]">
            <p class="text-base font-bold truncate">{{ datum.name }}</p>
            <p class="color-cust-gray font-medium text-xs truncate">
              {{ datum.character }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>