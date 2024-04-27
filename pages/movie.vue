<script setup lang="ts">
  const mainStore = useMainStore();
  mainStore.$patch({ search: {
    page: 1,
    genre: {
      id: '',
      name: ''
    }
  }});
  const { fetchInitialAllMovies, fetchMoreMovies } = mainStore;
  await fetchInitialAllMovies();
  const { movies, search } = storeToRefs(mainStore);
  
  const getMoreMovies = async () => {
    await fetchMoreMovies();
  };
</script>


<template>
  <main id="moviePage">
    <section id="movies">
      <div class="flex items-center">
        <h2 class="font-medium text-[20px]">
          Movies
        </h2>
      </div>
      <!-- <TabsHorizontal :data="genres.movie" type="movie" /> -->
      <!-- <div>
        tab {{ search }}
      </div> -->
      <div>
        <CardsList :data="movies" type="movie"/>
      </div>
      <button @click="getMoreMovies()">click more</button>
    </section>
  </main>
</template>