<script setup>
defineProps({
  date: {
    type: Date,
    required: true,
  },
});
</script>

<template>
  <div>
    <h2 class="ml-5 text-5xl">
      {{
        date.toLocaleDateString("en-us", {
          month: "numeric",
          day: "numeric",
          year: "numeric",
        })
      }}
    </h2>
    <h2 class="ml-5 text-5xl">
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
