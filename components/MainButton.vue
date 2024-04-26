<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    default: "button"
  }
})
</script>

<template>
  <button 
    class="bg-cust-gray text-sm py-[10px] px-[29px] rounded-full"
  >
    {{ label }}
  </button>
</template>