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
  <main id="moviePage" class="pb-[30px]">
    <section id="movies">
      <div class="flex items-center">
        <h2 class="font-medium text-[20px]">
          Movies
        </h2>
      </div>
      <!-- <MainTab :data="genres.movie" type="movie" /> -->
      <!-- <div>
        tab {{ search }}
      </div> -->
      <div>
        <CardsList :data="movies" type="movie"/>
      </div>
    </section>
    <section class="flex justify-center">
      <MainButton
        label="Load more movies"
        bgColor="bg-green-500"
        fontWeight="font-bold"
        @click="getMoreMovies()"
      />
    </section>
  </main>
</template>