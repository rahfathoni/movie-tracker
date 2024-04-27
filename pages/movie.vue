<script setup lang="ts">
  const mainStore = useMainStore();
  mainStore.$patch({ search: {
    page: 1,
    genre: {
      id: 0,
      name: ''
    }
  }});
  const { fetchInitialAllMovies, fetchMoreMovies, fetchGenreList } = mainStore;
  await fetchInitialAllMovies();
  await callOnce(async () => {
    await fetchGenreList('movie');
  })

  const { movies, genres, search } = storeToRefs(mainStore);
  
  const getMoreMovies = async () => {
    await fetchMoreMovies();
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
      await fetchInitialAllMovies()
      return;
    }
    mainStore.$patch({search: {
      page: 1,
      genre: {
        id: select.id,
        name: select.name
      }
    }});
    await fetchInitialAllMovies()
  }
</script>


<template>
  <main id="moviePage" class="pb-[30px]">
    <section id="movies">
      <div class="flex items-center">
        <h2 class="font-medium text-[20px]">
          Movies
        </h2>
      </div>
      <div>
        <MainTab 
          :data="genres.movie" 
          type="movie" 
          @clickGenre="filterByGenre"
          :selectedGenreId="search.genre.id"
        />
      </div>
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