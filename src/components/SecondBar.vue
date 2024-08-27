<script setup>
defineProps({
  date: {
    type: Date,
    required: true,
  },
});
</script>

<template>
  <div class="grid grid-flow-row gap-2">
    <div class="flex w-full gap-2 overflow-hidden">
      <div
        v-for="id in Array.from({ length: 60 }, (x, i) => i)"
        :key="id"
        :class="id <= date.getSeconds() ? 'border-black' : 'invisible'"
        class="border-r-2 w-2 h-12"
      />
    </div>
  </div>
</template>
