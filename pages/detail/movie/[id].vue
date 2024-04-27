<script setup lang="ts">
  const route = useRoute();
  const mainStore = useMainStore();
  const { fetchDetailData, fetchDetailVideo, fetchDetailCast, fetchDetailSimilar } = mainStore;  
  const { id } = route.params;
  await fetchDetailData(id as String, 'movie');
  await fetchDetailVideo(id as String, 'movie');
  await fetchDetailCast(id as String, 'movie');
  await fetchDetailSimilar(id as String, 'movie');
  const { detail, getOneVideoKey } = storeToRefs(mainStore);
</script>

<template>
  <main id="detailMovie">
    <DetailsDescription 
      :title="detail.data.title"
      :poster_path="detail.data.poster_path"
      :genres="detail.data.genres"
      :video_keys="getOneVideoKey"
      :description="detail.data.overview"
    />
    <DetailsCast 
      class="pt-[48px]"
      :cast="detail.cast"
    />
    <section id="popularMovies">
      <div class="flex justify-between items-center">
        <h2 class="font-medium text-[20px]">
          Related Movies
        </h2>
      </div>
      <div>
        <CardsHorizontal :data="detail.similar" type="movie"/>
      </div>
    </section>
  </main>
</template>