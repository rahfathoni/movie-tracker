<script setup lang="ts">
  const route = useRoute();
  const mainStore = useMainStore();
  const { getDetailData, getDetailVideo, getDetailCast, getDetailSimilar } = mainStore;  
  const { id } = route.params;
  await getDetailData(id as String, 'tv');
  await getDetailVideo(id as String, 'tv');
  await getDetailCast(id as String, 'tv');
  await getDetailSimilar(id as String, 'tv');
  const { detail } = storeToRefs(mainStore);
</script>

<template>
  <main id="detail">
    <!-- <DetailsDescription 
      :title="detail.data.title"
      :poster_path="detail.data.poster_path"
      video_keys=""
      :genre="[]"
      description=""
    /> -->
    {{ detail }}
  </main>
</template>