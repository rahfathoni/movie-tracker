<script setup lang="ts">
  const route = useRoute();
  const mainStore = useMainStore();
  const { fetchDetailData, fetchDetailVideo, fetchDetailCast, fetchDetailSimilar } = mainStore;  
  const { id } = route.params;
  await fetchDetailData(id as String, 'tv');
  await fetchDetailVideo(id as String, 'tv');
  await fetchDetailCast(id as String, 'tv');
  await fetchDetailSimilar(id as String, 'tv');
  const { detail, getOneVideoKey } = storeToRefs(mainStore);
</script>

<template>
  <main id="detailTvSeries">
    <DetailsDescription 
      :title="detail.data.name"
      :poster_path="detail.data.poster_path"
      :genres="detail.data.genres"
      :video_keys="getOneVideoKey"
      :description="detail.data.overview"
    />
    <DetailsCast 
      class="pt-[48px]"
      :cast="detail.cast"
    />
    <section id="popularTvSeries">
      <div class="flex justify-between items-center">
        <h2 class="font-medium text-[20px]">
          Related Tv Series
        </h2>
      </div>
      <div>
        <CardsHorizontal :data="detail.similar" type="tv"/>
      </div>
    </section>
  </main>
</template>