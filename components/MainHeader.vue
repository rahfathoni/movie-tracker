<script setup lang="ts">
  const route = useRoute();
  const mainStore = useMainStore();
  const searchValue: Ref<string> = ref('');

  watch(() => route.name, (newValue) => {
    searchValue.value = '';
    if (newValue === 'search') {
      searchValue.value = mainStore.search.name;
    }
  });
  watch(searchValue, (newValue: string) => {
    if (route.name === 'search') {
      mainStore.search.name = newValue;
      mainStore.search.data = [];
    }
    if (newValue.length >= 3) {
      mainStore.search.name = newValue;
      if (route.name === 'search') {
        mainStore.$patch({ search: {
          page: 1
        }});
        mainStore.fetchInitalSearchContent();
      } else {
        navigateTo('/search');
      }
    }
  })
</script>

<template>
  <header class="grid grid-cols-12 py-[40px]">
    <h1 name="title" class="text-[35px] font-semibold md:col-span-2 col-span-12 leading-9 md:text-left text-center">
      The<br class="hidden md:inline"/> Movie<br class="hidden md:inline"/> Tracker
    </h1>
    <div class="md:col-span-8 col-span-12 flex justify-center items-center mt-2 sm:mt-none">
      <input 
        autocomplete="off" 
        name="search" 
        type="search"
        placeholder="🔍 Search a movie or a series" 
        class="bg-cust-gray border-none rounded-full h-[57px] w-[630px] placeholder-black px-8 text-xl min-w-stretch-cust"
        v-model="searchValue"
      />
    </div>
  </header>
</template>

<style scoped>
  input::placeholder {
    text-align: center;
  }
</style>