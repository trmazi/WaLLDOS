<script setup>
defineProps({
  date: {
    type: Date,
    required: true,
  },
});

function getOrdinal(d) {
  if (d > 3 && d < 21) return "th";
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function doubleDate(date) {
  date = date.toString();
  if (date.length == 1) {
    date = `0${date}`;
  }
  return date;
}
</script>

<template>
  <div class="flex items-baseline">
    <h1 class="levelFont text-[600pt] scale-y-110 scale-90">
      {{ doubleDate(date.getDate()) }}
    </h1>
    <h2 class="">{{ getOrdinal(date.getDate()) }}</h2>
  </div>
</template>
