<template>
  <NuxtLayout >
    <div class="grid grid-cols-12">
      <Sidebar class="col-span-1 max-w-[60px]"/>
      <div class="col-span-11">
        <Header />
        <NuxtPage />
      </div>
    </div>
  </NuxtLayout>
</template>
