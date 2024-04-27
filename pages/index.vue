<script setup lang="ts">
  const mainStore = useMainStore();
  const { getPopularMovie, getPopularTvSeries } = mainStore;
  await getPopularMovie();
  await getPopularTvSeries();
  const { movies, tvSeries } = storeToRefs(mainStore);
  
  const toMovies = async () => {
    await navigateTo('/movie');
  };
  const toTvSeries = async () => {
    await navigateTo('/tvseries');
  };
</script>

<template>
  <main id="homepage">
    <section id="popularMovies">
      <div class="flex justify-between items-center">
        <h2 class="font-medium text-[20px]">
          Popular Movies
        </h2>
        <MainButton 
          label="Explore More" 
          @click="toMovies()"
        />
      </div>
      <div>
        <CardsHorizontal :data="movies" type="movie"/>
      </div>
    </section>
    <section id="popularTvSeries">
      <div class="flex justify-between items-center">
        <h2 class="font-medium text-[20px]">
          Popular Tv Series
        </h2>
        <MainButton 
          label="Explore More" 
          @click="toTvSeries()"
        />
      </div>
      <div>
        <CardsHorizontal :data="tvSeries" type="tv"/>
      </div>
    </section>
  </main>
</template>