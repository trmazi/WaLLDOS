<script setup>
defineProps({
  date: {
    type: Date,
    required: true,
  },
});
</script>

<template>
  <div class="ml-5 grid grid-cols-1 align-baseline text-5xl">
    <h2>
      {{
        date.toLocaleDateString("en-us", {
          month: "numeric",
          day: "numeric",
          year: "numeric",
        })
      }}
    </h2>
    <h2>
      {{
        date.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })
      }}
    </h2>
  </div>
</template>
