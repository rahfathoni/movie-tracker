<script setup lang="ts">
  const mainStore = useMainStore();
  mainStore.$patch({ search: {
    page: 1,
    genre: {
      id: 0,
      name: ''
    }
  }});
  const { fetchInitialAllTvSeries, fetchMoreTvSeries, fetchGenreList } = mainStore;
  await fetchInitialAllTvSeries();
  await callOnce(async () => {
    await fetchGenreList('tv');
  })

  const { tvSeries, search, genres } = storeToRefs(mainStore);
  
  const getMoreTvSeries = async () => {
    await fetchMoreTvSeries();
  };
  const filterByGenre = async (select: any) => {
    if(select.id === search.value.genre.id) {
      mainStore.$patch({search: {
        page: 1,
        genre: {
          id: 0,
          name: ''
        }
      }});
      await fetchInitialAllTvSeries()
      return;
    }
    mainStore.$patch({search: {
      page: 1,
      genre: {
        id: select.id,
        name: select.name
      }
    }});
    await fetchInitialAllTvSeries()
  }
</script>


<template>
  <main id="tvSeriesPage" class="pb-[30px]">
    <section id="tvSeries">
      <div class="flex items-center">
        <h2 class="font-medium text-[20px]">
          Tv Series
        </h2>
      </div>
      <div>
        <MainTab 
          :data="genres.tvSeries" 
          @clickGenre="filterByGenre"
          :selectedGenreId="typeof search.genre.id === 'number' ? search.genre.id : 0"
        />
      </div>
      <div>
        <CardsList :data="tvSeries" type="tv"/>
      </div>
    </section>
    <section v-if="tvSeries && tvSeries.length > 0" class="flex justify-center">
      <MainButton
        label="Load more tv series"
        bgColor="bg-green-500"
        fontWeight="font-bold"
        @click="getMoreTvSeries()"
      />
    </section>
  </main>
</template>