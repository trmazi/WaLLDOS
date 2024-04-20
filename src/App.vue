<script setup>
import { reactive, onMounted } from "vue";
import * as Mdi from "@mdi/js";
import axios from "axios";
import WeatherAPI from "./weather.json";
import AirPlayAPI from "./airplay.json";
import BaseIcon from "./components/BaseIcon.vue";

const data = reactive({
  date: new Date(),
});

window.setInterval(() => {
  data.date = new Date();
}, 1000);

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

function getBirthday() {
  const uri = window.location.search.substring(1);
  const params = new URLSearchParams(uri);
  const birthday = params.get("birthday");

  if (birthday) {
    const today = new Date();
    const birthdayDate = new Date(0);
    birthdayDate.setUTCSeconds(parseInt(birthday));

    if (
      birthdayDate.getMonth() == today.getMonth() &&
      birthdayDate.getDate() == today.getDate()
    ) {
      return true;
    }
  }
  return false;
}

function getWeedDay() {
  const today = new Date();
  const holidayDate = new Date(0);
  holidayDate.setUTCSeconds(parseInt(1713592580));

  if (
    holidayDate.getMonth() == today.getMonth() &&
    holidayDate.getDate() == today.getDate()
  ) {
    return true;
  }
  return false;
}

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
  var Today = new Date();
  if (date > Today.getDate()) {
    return "border-gray-500 text-gray-400";
  } else if (date == Today.getDate()) {
    return "border-black";
  } else {
    return "border-gray-300 text-gray-300";
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
  if (date == data.date.getDate()) {
    var currentHr = data.date.getHours();
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

  const conditionList = {
    // Thunderstorms
    200: Mdi.mdiWeatherLightningRainy,
    201: Mdi.mdiWeatherLightningRainy,
    202: Mdi.mdiWeatherLightningRainy,
    210: Mdi.mdiWeatherLightningRainy,
    211: Mdi.mdiWeatherLightningRainy,
    212: Mdi.mdiWeatherLightningRainy,
    221: Mdi.mdiWeatherLightningRainy,
    230: Mdi.mdiWeatherLightningRainy,
    231: Mdi.mdiWeatherLightningRainy,
    232: Mdi.mdiWeatherLightningRainy,

    // Drizzle
    300: Mdi.mdiWeatherPartlyRainy,
    301: Mdi.mdiWeatherPartlyRainy,
    302: Mdi.mdiWeatherPartlyRainy,
    310: Mdi.mdiWeatherPartlyRainy,
    311: Mdi.mdiWeatherPartlyRainy,
    312: Mdi.mdiWeatherPartlyRainy,
    313: Mdi.mdiWeatherPartlyRainy,
    314: Mdi.mdiWeatherPartlyRainy,
    321: Mdi.mdiWeatherPartlyRainy,

    // Rain
    500: Mdi.mdiWeatherPartlyRainy,
    501: Mdi.mdiWeatherPartlyRainy,
    502: Mdi.mdiWeatherRainy,
    503: Mdi.mdiWeatherRainy,
    504: Mdi.mdiWeatherRainy,
    511: Mdi.mdiWeatherSnowyRainy,
    520: Mdi.mdiWeatherRainy,
    521: Mdi.mdiWeatherRainy,
    522: Mdi.mdiWeatherRainy,
    523: Mdi.mdiWeatherRainy,

    // Snow
    600: Mdi.mdiWeatherSnowy,
    601: Mdi.mdiWeatherSnowy,
    602: Mdi.mdiWeatherSnowyHeavy,
    611: Mdi.mdiWeatherSnowy,
    612: Mdi.mdiWeatherSnowy,
    613: Mdi.mdiWeatherPartlySnowyRainy,
    615: Mdi.mdiWeatherPartlySnowyRainy,
    616: Mdi.mdiWeatherSnowyRainy,
    620: Mdi.mdiWeatherSnowy,
    621: Mdi.mdiWeatherSnowy,
    622: Mdi.mdiWeatherSnowyHeavy,

    // Atmosphere
    701: Mdi.mdiWeatherPartlyRainy,
    711: Mdi.mdiWeatherFog,
    721: Mdi.mdiWeatherHazy,
    731: Mdi.mdiWeatherDust,
    741: Mdi.mdiWeatherFog,
    751: Mdi.mdiWeatherDust,
    761: Mdi.mdiWeatherDust,
    762: Mdi.mdiWeatherDust,
    771: Mdi.mdiWeatherDust,
    781: Mdi.mdiWeatherTornado,

    // Clear
    800: Mdi.mdiWeatherSunny,

    // Clouds
    801: Mdi.mdiWeatherPartlyCloudy,
    802: Mdi.mdiWeatherPartlyCloudy,
    803: Mdi.mdiWeatherPartlyCloudy,
    804: Mdi.mdiWeatherCloudy,
  };
  return conditionList[day.weather.find((x) => x.id).id];
}

var nowPlaying = {
  state: "idle",
  title: null,
  artist: null,
  album: null,
  currentTime: null,
  maxTime: null,
  repeat: null,
  shuffle: null,
  albumArt: null,
};

var albumArt;

async function testAirPlay() {
  const uri = window.location.search.substring(1);
  const params = new URLSearchParams(uri);
  const identifier = params.get("identifier");

  const response = await axios.get(`${AirPlayAPI.server}`);
  const data = await response.data;
  if (data["status"] == "ok" && identifier != null) {
    await getNowPlaying(identifier);
    return true;
  }
  return false;
}

async function getNowPlaying(identifier) {
  const oldTitle = nowPlaying["title"];
  const response = await axios.get(
    `${AirPlayAPI.apiServer}nowPlaying?identifier=${identifier}`
  );
  const data = await response.data;
  if (data["status"] == "ok") {
    nowPlaying = data["data"];

    if (nowPlaying["shuffle"] == "off") {
      nowPlaying["shuffle"] = false;
    }

    if (nowPlaying["repeat"] == "off") {
      nowPlaying["repeat"] = false;
    }

    if (nowPlaying["title"] != oldTitle) {
      getArt();
    }
    return true;
  }
  return false;
}

function getArt() {
  albumArt = `${
    AirPlayAPI.apiServer
  }coverArt?identifier=BE0B6C80-EF57-4D78-9D90-27C30AC73DDE&rand=${Math.random()}`;
  var ArtElement = document.getElementById("art");
  ArtElement.src = albumArt;
}

function formatTime(totalSeconds) {
  var minutes = Math.floor(totalSeconds / 60);
  var seconds = totalSeconds % 60;

  seconds = seconds < 10 ? "0" + seconds : seconds;

  return `${minutes}:${seconds}`;
}

function calculatePercentage(currentTime, maxTime) {
  return ((currentTime / maxTime) * 100).toFixed(2); // Fix to two decimal places
}

function trimString(string) {
  var length = 18;
  var trimmedString =
    string.length > length ? string.substring(0, length - 3) + "..." : string;
  return trimmedString;
}
</script>

<template>
  <div
    class="p-12 w-screen h-screen leading-loose shadow-[inset_0_-2px_50px_rgba(0,0,0,0.9)] bg-red-100"
  >
    <div
      class="pl-[200px] pr-[30px] w-full h-full grid content-between justify-center"
    >
      <div class="grid grid-cols-1 gap-2 text-7xl">
        <div class="flex justify-between -mb-[40px]">
          <div>
            <h4 class="levelFont">
              {{ data.date.toLocaleString("en-us", { weekday: "long" }) }},
            </h4>
            <h4 class="levelFont">
              {{ data.date.toLocaleString("en-us", { month: "long" }) }}
            </h4>
          </div>
          <div
            v-if="testAirPlay() && nowPlaying.state != 'idle'"
            class="levelFont w-[450px]"
          >
            <div>
              <h2 class="levelFont text-[40px] pb-2">What's Playing?</h2>
              <h2 class="text-gray-500 text-[20px]">Living Room</h2>
            </div>
            <card class="pt-5 my-3 rounded-lg max-h-40 bg-red-50">
              <div class="flex justify-start">
                <div class="grow text-[30px] pr-3">
                  <div class="w-full -ml-2 flex items-center">
                    <BaseIcon
                      v-if="nowPlaying.state == 'playing'"
                      :path="Mdi.mdiPlay"
                      size="40"
                    />
                    <BaseIcon
                      v-if="nowPlaying.state == 'paused'"
                      :path="Mdi.mdiPause"
                      size="40"
                    />
                    <BaseIcon
                      v-if="nowPlaying.state == 'seeking'"
                      :path="Mdi.mdiFastForward"
                      size="40"
                    />
                    <BaseIcon
                      v-if="nowPlaying.state == 'loading'"
                      :path="Mdi.mdiLoading"
                      size="40"
                    />
                    <BaseIcon
                      v-if="nowPlaying.state == 'stopped'"
                      :path="Mdi.mdiStop"
                      size="40"
                    />
                    <BaseIcon
                      v-if="nowPlaying.repeat"
                      :path="Mdi.mdiRepeat"
                      size="20"
                    />
                    <BaseIcon
                      v-if="nowPlaying.shuffle"
                      :path="Mdi.mdiShuffle"
                      size="20"
                    />
                  </div>
                  <div class="flex justify-between text-xl">
                    <p>{{ formatTime(nowPlaying.currentTime) }}</p>
                    <p>{{ formatTime(nowPlaying.maxTime) }}</p>
                  </div>
                  <div class="h-4 bg-gray-200 rounded-lg">
                    <div
                      class="h-4 bg-gray-600 rounded-lg"
                      :style="{
                        width:
                          calculatePercentage(
                            nowPlaying.currentTime,
                            nowPlaying.maxTime
                          ) + '%',
                      }"
                    ></div>
                  </div>
                </div>
                <div class="grow text-[20px] text-right pr-3">
                  <h5 class="font-dark text-[30px]">
                    {{ trimString(nowPlaying.title) }}
                  </h5>
                  <p>{{ trimString(nowPlaying.artist) }}</p>
                  <p>{{ trimString(nowPlaying.album) }}</p>
                </div>
                <img
                  id="art"
                  :src="albumArt"
                  class="rounded-lg w-[90px] h-[90px]"
                />
              </div>
            </card>
          </div>
        </div>

        <div class="flex items-baseline">
          <h1 class="levelFont text-[600pt]">
            {{ doubleDate(data.date.getDate()) }}
          </h1>
          <h2 class="">{{ getOrdinal(data.date.getDate()) }}</h2>
        </div>

        <div class="flex place-items-center place-content-between w-full">
          <div>
            <h2 class="ml-5 text-5xl">
              {{
                data.date.toLocaleDateString("en-us", {
                  month: "numeric",
                  day: "numeric",
                  year: "numeric",
                })
              }}
            </h2>
            <h2 class="ml-5 text-5xl">
              {{
                data.date.toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })
              }}
            </h2>
          </div>
          <div v-if="getBirthday()" class="grid justify-items-center">
            <img class="w-50" :src="`/warn/cake.png`" />
            <h4 class="text-2xl levelFont">Happy Birthday!</h4>
          </div>
          <div v-if="getWeedDay()" class="grid justify-items-center">
            <img class="w-50" :src="`/warn/weed.png`" />
            <h4 class="text-2xl levelFont">Happy Holidays!</h4>
          </div>
        </div>
        <div class="grid grid-flow-row gap-2">
          <hr class="border-2 border-black" />
          <div class="flex w-full gap-2 overflow-hidden">
            <div
              v-for="id in Array.from({ length: 60 }, (x, i) => i)"
              :key="id"
              :class="
                id <= data.date.getSeconds() ? 'border-black' : 'invisible'
              "
              class="border-r-2 w-2 h-12"
            />
          </div>
        </div>
      </div>

      <div class="w-full grid grid-flow-row justify-end">
        <hr class="w-full border-2 border-black mb-5" />
        <div class="w-full grid grid-cols-5 gap-6">
          <div
            v-for="day of getWeek()"
            :key="day"
            :class="dateClass(day.getDate())"
            class="border-2 w-36 h-40 flex justify-center place-items-center"
          >
            <div
              v-if="currentWeather"
              class="grid justify-items-center levelFont"
            >
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

        <div class="mb-12 mt-20 w-1/2">
          <img src="/logo.png" alt="Aperture Logo" />
        </div>
      </div>
    </div>
  </div>
</template>
