<script setup lang="ts">
  const mainStore = useMainStore();
  await callOnce(mainStore.getPopularList);

  const { movies, tvSeries } = storeToRefs(mainStore);

  const toMovies = async () => {
    await navigateTo('/movie')
  }
</script>

<template>
  <main id="homepage">
    <section id="popularMoviesTop" class="flex justify-between items-center">
      <h2 class="font-medium text-sm">
        Popular Movies
      </h2>
      <MainButton 
        label="Explore More" 
        @click="toMovies()"
      />
    </section>
    <section id="popularMoviesList">
      <CardsVertical :data="movies"/>
      {{ tvSeries }}
    </section>
    <!-- <section id="popularTvSeries">

    </section> -->
  </main>
</template>