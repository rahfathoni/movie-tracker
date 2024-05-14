<script setup lang="ts">
  const mainStore = useMainStore();
  mainStore.$patch({ search: {
    page: 1
  }});
  const { search } = storeToRefs(mainStore);
  const { fetchInitalSearchContent, fetchMoreSearchContent } = mainStore;
  if (search.value.name && search.value.name.length >= 3) {
    await fetchInitalSearchContent();
  }
  
  const getMoreContent = async () => {
    await fetchMoreSearchContent();
  };
</script>


<template>
  <main id="searchPage" class="pb-[30px]">
    <section id="search">
      <div v-if="search.name && search.name.length >= 3" class="flex items-center">
        <h2 class="font-medium text-[15px]">
          Showing search results for: <span class="color-cust-gray-2 text-[20px]"> {{ search.name }} </span>
        </h2>
      </div>
      <div v-if="(search.data && search.data.length > 0) && (search.name && search.name.length >= 3)">
        <CardsList :data="search.data" type="search"/>
      </div>
      <div
        v-if="(search.data && search.data.length === 0) && (search.name && search.name.length >= 3)"
        class="py-[100px] flex items-center justify-center" 
      >
        <h3 class="text-[30px]">-- Data Not Found --</h3>
      </div>
      <div 
        v-if="(search.data && search.data.length === 0) && ((search.name && search.name.length < 3) || !search.name)"
        class="py-[100px] flex items-center justify-center" 
      >
        <h3 class="text-[30px]">🔍 Search movies or tv series by title</h3>
      </div>
    </section>
    <section v-if="search.data && search.data.length > 0" class="flex justify-center">
      <MainButton
      label="Load more content"
      bgColor="bg-green-500"
      fontWeight="font-bold"
      @click="getMoreContent()"
      />
    </section>
  </main>
</template>