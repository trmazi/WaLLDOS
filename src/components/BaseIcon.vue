<script setup>
import { computed } from "vue";

const props = defineProps({
  path: {
    type: String,
    required: true,
  },
  size: {
    type: [String, Number],
    default: null,
  },
  inset: {
    type: [String, Number],
    default: null,
  },
});

const spanClass = computed(
  () => `inline-flex justify-center items-center ${props.w} ${props.h}`
);

const iconSize = computed(() => props.size ?? 16);
</script>

<template>
  <span :class="spanClass">
    <svg
      viewBox="0 0 24 24"
      :width="iconSize"
      :height="iconSize"
      class="inline-block"
      :class="inset == null ? 'p-0' : `p-${inset}`"
    >
      <path fill="currentColor" :d="path" />
    </svg>
    <slot />
  </span>
</template>
