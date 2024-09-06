<script setup>
import { onMounted } from "vue";
import axios from "axios";

import BaseIcon from "./BaseIcon.vue";
import conditionList from "../conditions.js";
import WeatherAPI from "../weather.json";

const props = defineProps({
  date: {
    type: Date,
    required: true,
  },
});

function getWeek() {
  var currentDate = new Date();
  var result = [new Date(currentDate)];
  for (var i = 0; i < 6; i++) {
    currentDate.setDate(currentDate.getDate() + 1);
    result.push(new Date(currentDate));
  }
  return result;
}

function dateClass(date) {
  if (date > props.date.getDate() || date < props.date.getDate()) {
    return "border-gray-500 text-gray-400";
  } else if (date == props.date.getDate()) {
    return "border-black";
  }
}

var currentWeather = null;

async function getCoords() {
  const response = await axios.get(
    `${WeatherAPI.locationServer}check?api_key=${WeatherAPI.locationKey}&format=json`
  );
  const currentLocation = await response.data;
  var data = {};
  data.lat = parseFloat(currentLocation.location.latitude);
  data.lon = parseFloat(currentLocation.location.longitude);
  return data;
}

async function getWeather() {
  const locData = await getCoords();
  const response = await axios.get(
    `${WeatherAPI.server}onecall?lat=${locData.lat}&lon=${locData.lon}&appid=${WeatherAPI.apiKey}&exclude=current,minutely,hourly&units=imperial`
  );
  currentWeather = await response.data;
}

window.setInterval(() => {
  getWeather();
}, 3600000);

onMounted(() => {
  getWeather();
});

function weatherFromDate(date) {
  const daily = currentWeather.daily;
  for (const day of daily) {
    var srvDate = new Date(0);
    srvDate.setUTCSeconds(day.dt);
    if (srvDate.getDate() == date) {
      return day;
    }
  }
  return null;
}

function getTemp(date) {
  const day = weatherFromDate(date);
  if (!day) {
    return null;
  }
  var temp = 0;
  if (date == props.date.getDate()) {
    var currentHr = props.date.getHours();
    if (currentHr >= 6 && currentHr < 12) {
      temp = Math.ceil(day.temp.morn);
    } else if (currentHr >= 12 && currentHr < 18) {
      temp = Math.ceil(day.temp.day);
    } else if (currentHr >= 18 && currentHr < 22) {
      temp = Math.ceil(day.temp.eve);
    } else {
      temp = Math.ceil(day.temp.night);
    }
  } else {
    temp = Math.ceil(day.temp.day);
  }

  return temp;
}

function getConditions(date) {
  const day = weatherFromDate(date);
  if (!day) {
    return null;
  }

  return conditionList[day.weather.find((x) => x.id).id];
}
</script>

<template>
  <div class="w-full grid grid-cols-5 gap-6">
    <div
      v-for="day of getWeek()"
      :key="day"
      :class="dateClass(day.getDate())"
      class="border-2 h-44 flex justify-center place-items-center"
    >
      <div v-if="currentWeather" class="grid justify-items-center levelFont">
        <h1 class="text-3xl mt-2">
          {{ day.toLocaleString("en-us", { weekday: "short" }) }}
        </h1>
        <BaseIcon :path="getConditions(day.getDate())" size="60" />
        <h1 class="levelFont text-[32px]">
          {{ getTemp(day.getDate()) }}<span class="text-4xl">°</span>
        </h1>
      </div>
    </div>
  </div>
</template>
