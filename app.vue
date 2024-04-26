<template>
  <NuxtLayout >
    <div class="grid grid-cols-12">
      <Sidebar class="col-span-1 max-w-[60px]"/>
      <div class="col-span-11 ml-none lg:ml-[-30px]">
        <MainHeader />
        <NuxtPage />
      </div>
    </div>
  </NuxtLayout>
</template>
