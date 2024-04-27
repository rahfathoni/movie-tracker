<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    default: "button"
  },
  bgColor: {
    type: String,
    default: "bg-cust-gray"
  },
  fontWeight: {
    type: String,
    default: "font-normal"
  }
})
</script>

<template>
  <button 
    :class="`${bgColor} ${fontWeight} text-[14px] py-[10px] px-[29px] rounded-full`"
  >
    {{ label }}
  </button>
</template>