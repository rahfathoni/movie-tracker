<script setup lang="ts">
  const mainStore = useMainStore();
  mainStore.$patch({ search: {
    page: 1,
    genre: {
      id: '',
      name: ''
    }
  }});
  const { fetchInitialAllTvSeries, fetchMoreTvSeries } = mainStore;
  await fetchInitialAllTvSeries();
  const { tvSeries, search } = storeToRefs(mainStore);
  
  const getMoreTvSeries = async () => {
    await fetchMoreTvSeries();
  };
</script>


<template>
  <main id="tvSeriesPage" class="pb-[30px]">
    <section id="tvSeries">
      <div class="flex items-center">
        <h2 class="font-medium text-[20px]">
          Tv Series
        </h2>
      </div>
      <!-- <MainTab :data="genres.movie" type="movie" /> -->
      <!-- <div>
        tab {{ search }}
      </div> -->
      <div>
        <CardsList :data="tvSeries" type="tv"/>
      </div>
    </section>
    <section class="flex justify-center">
      <MainButton
        label="Load more movies"
        bgColor="bg-green-500"
        fontWeight="font-bold"
        @click="getMoreTvSeries()"
      />
    </section>
  </main>
</template>