<template>
  <NuxtLayout >
    <div class="relative h-screen flex">
      <Sidebar class="px-1 md:px-5"/>
      <div class="flex-1 overflow-y-auto md:pl-[23px] md:pr-[72px] px-2">
        <MainHeader />
        <NuxtPage />
      </div>
    </div>
  </NuxtLayout>
</template>
