<script setup lang="ts">
  import { onMounted } from 'vue';

  // const props = defineProps({
  //   data: {},
  //   type: {
  //     type: String,
  //     default: "bg-cust-gray"
  //   },
  //   selectedGenreId: {
  //     type: Number,
  //     default: 0
  //   }
  // });
  
  interface IData {
    id: number;
    name: string;
  }

  const props = defineProps({
    data: {
      type: Array as () => IData[],
      default: () => []
    },
    selectedGenreId: {
      type: Number,
      default: 0
    }
  });

  onMounted(() => {
    const containerCard = document.getElementById("horizontalTabs");
    const itemToScroll = document.getElementById("tabToScroll");
    
    if (containerCard && itemToScroll) {
      containerCard.addEventListener("wheel", function(e) {
        if (Math.abs(e.deltaY) > 0) {
          e.preventDefault();
          itemToScroll.scrollLeft +=e.deltaY;
        }
      });
    } else {
      console.error("Either 'horizontalTabs' or 'tabToScroll' is null");
    }
  });

  const emit = defineEmits(["clickGenre"])
  const clickableGenre = async (id: Number, name: String) => {
    emit("clickGenre", {
      id, name
    })
  }
</script>

<template>
  <div id="horizontalTabs" class="flex ">
    <div id="tabToScroll" class="flex flex-nowrap pt-[21px] overflow-x-scroll no-scrollbar">
      <div
        v-for="datum in data" :key="datum.id"
        class="inline-block mr-[20px]"
      >
        <button 
          :class="`rounded-[30px] text-[14px] font-semibold py-[10px] px-[37px] ${ datum.id === selectedGenreId ? 'bg-black text-white' : 'bg-cust-gray text-black' }`"
          @click="clickableGenre(datum.id, datum.name)"
        >
          {{ datum.name }}
        </button>
      </div>
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