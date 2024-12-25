<script setup>
defineProps({
  prompt: {
    type: Object,
    default: null,
  },
});
</script>

<template>
  <div class="space-y-10 place-items-center justify-center grid mb-4">
    <h2 class="text-7xl">{{ prompt?.header }}</h2>
    <h4 class="text-4xl">{{ prompt?.text }}</h4>
    <a
      v-if="prompt?.url"
      :href="prompt?.url"
      target="_blank"
      class="text-4xl text-blue-700 hover:text-blue-900"
      >{{ prompt?.url }}</a
    >
  </div>
</template>
