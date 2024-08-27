<script setup>
import Events from "../events.json";

const props = defineProps({
  date: {
    type: Date,
    required: true,
  },
});

function testEvent(timestamp) {
  const eventDate = new Date(0);
  eventDate.setUTCSeconds(parseInt(timestamp));
  if (
    eventDate.getMonth() == props.date.getMonth() &&
    eventDate.getDate() == props.date.getDate()
  ) {
    return true;
  }
  return false;
}
</script>

<template>
  <template v-for="event of Events" :key="event.id">
    <div v-if="testEvent(event.timestamp)" class="grid justify-items-center">
      <img :class="event.size" :src="event.image" />
      <h4 class="text-2xl levelFont">{{ event.text }}</h4>
    </div>
  </template>
</template>
