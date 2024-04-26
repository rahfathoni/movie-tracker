<script setup lang="ts">
  const props = defineProps<{
    data: {
      id: Number,
      name: String
    }[];
  }>();
  const { data } = props;
</script>

<template>
  <div id="cards">
    <div v-for="datum in data" :key="datum.id">
      {{datum.id}} - {{ datum.name }}
    </div>
  </div>
</template>