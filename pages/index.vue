<script setup lang="ts">
  // const mainStore = useMainStore();
  // await callOnce(mainStore.fetch);

  const toMovies = async () => {
    await navigateTo('/movie')
  }
  const test = [
    {
      id: 1,
      name: "satu"
    },
    {
      id: 2,
      name: "dua"
    },
    {
      id: 3,
      name: "tiga"
    }
  ]
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
      <CardsVertical :data="test"/>
    </section>
    <!-- <section id="popularTvSeries">

    </section> -->
  </main>
</template>