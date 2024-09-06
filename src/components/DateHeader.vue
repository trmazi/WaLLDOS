<script setup>
defineProps({
  date: {
    type: Date,
    required: true,
  },
});
</script>

<template>
  <div class="text-[70px]">
    <h4 class="levelFont">
      {{ date.toLocaleString("en-us", { weekday: "long" }) }},
    </h4>
    <h4 class="levelFont">
      {{ date.toLocaleString("en-us", { month: "long" }) }}
    </h4>
  </div>
</template>
