<script setup>
import ApertureLogo from "@/components/ApertureLogo.vue";

defineProps({
  centered: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div
    :class="centered ? 'text-center' : 'pl-[200px]'"
    class="p-12 w-screen h-screen shadow-[inset_0_-2px_50px_rgba(0,0,0,0.9)] bg-red-100"
  >
    <div class="w-full h-full grid content-between">
      <slot />
      <div :class="centered ? 'pl-[150px]' : ''">
        <ApertureLogo />
      </div>
    </div>
  </div>
</template>
