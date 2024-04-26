
import { IconsSearch } from '#build/components';
<template>
  <header class="grid grid-cols-12 py-[40px]">
    <h1 name="title" class="text-[35px] font-semibold md:col-span-2 col-span-12 leading-9 md:text-left text-center">
      The<br class="hidden md:inline"/> Movie<br class="hidden md:inline"/> Tracker
    </h1>
    <div class="md:col-span-8 col-span-12 flex justify-center items-center mt-2 sm:mt-none">
      <input 
        autocomplete="off" 
        name="search" 
        placeholder="&#8203;Search a movie or a series" 
        class="bg-cust-gray border-none rounded-full h-[57px] w-[630px] placeholder-black px-8 text-xl min-w-stretch-cust"
      />
    </div>
  </header>
</template>

<style scoped>
  input::placeholder {
    text-align: center;
  }
</style>