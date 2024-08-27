<script setup>
import axios from "axios";
import * as Mdi from "@mdi/js";
import VolumioAPI from "../volumio.json";
import { ref } from "vue";

import BaseIcon from "./BaseIcon.vue";

var nowPlaying = null;

const shouldTrim = ref({
  title: false,
  artist: false,
  album: false,
});

const albumArt = ref("");

async function getNowPlaying() {
  const oldTitle = nowPlaying?.title;
  const response = await axios.get(`${VolumioAPI.server}/api/v1/getState`);
  const data = await response.data;

  if (data != undefined) {
    nowPlaying = data;

    if (nowPlaying["title"] != oldTitle) {
      albumArt.value = `${VolumioAPI.server}${nowPlaying["albumart"]}`;
      // Reset shouldTrim to false for the new song
      shouldTrim.value = {
        title: false,
        artist: false,
        album: false,
      };
    }
    return true;
  }
  return false;
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

function shouldMarquee(text) {
  return text && text.length > 18;
}

function handleAnimationEnd(field) {
  shouldTrim.value[field] = true;
}
</script>

<template>
  <div
    v-if="getNowPlaying() && nowPlaying?.title"
    class="levelFont w-[500px] grid grid-cols-2"
  >
    <div>
      <h2 class="text-gray-500 text-[20px]">{{ VolumioAPI.name }}</h2>
      <h2 class="text-[40px] pb-2">What's Playing?</h2>
      <div class="flex justify-start">
        <div class="w-[70%] flex space-x-2 items-start">
          <div class="-ml-2 flex items-center">
            <BaseIcon
              v-if="nowPlaying.status == 'play'"
              :path="Mdi.mdiPlay"
              size="40"
            />
            <BaseIcon
              v-if="nowPlaying.status == 'pause'"
              :path="Mdi.mdiPause"
              size="40"
            />
          </div>
          <div class="grow text-[30px] pr-3">
            <div class="flex justify-between text-xl">
              <p>{{ formatTime(nowPlaying.seek / 1000) }}</p>
              <p>{{ formatTime(nowPlaying.duration) }}</p>
            </div>
            <div class="h-4 bg-gray-200 rounded-lg">
              <div
                class="h-4 bg-gray-600 rounded-lg"
                :style="{
                  width:
                    calculatePercentage(
                      nowPlaying.seek / 1000,
                      nowPlaying.duration
                    ) + '%',
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center w-full">
      <div class="text-[20px] text-right pr-3 w-full">
        <div
          v-if="shouldMarquee(nowPlaying.title) && !shouldTrim.title"
          class="marquee-container"
        >
          <h5
            class="marqueeClass font-dark text-[30px] marquee-content"
            @animationend="handleAnimationEnd('title')"
          >
            {{ nowPlaying.title }}
          </h5>
        </div>
        <div v-else>
          <h5 class="font-dark text-[30px]">
            {{ trimString(nowPlaying.title) }}
          </h5>
        </div>

        <div
          v-if="shouldMarquee(nowPlaying.artist) && !shouldTrim.artist"
          class="marquee-container"
        >
          <p
            class="marqueeClass marquee-content"
            @animationend="handleAnimationEnd('artist')"
          >
            {{ nowPlaying.artist }}
          </p>
        </div>
        <div v-else>
          <p>{{ trimString(nowPlaying.artist) }}</p>
        </div>

        <div
          v-if="shouldMarquee(nowPlaying.album) && !shouldTrim.album"
          class="marquee-container"
        >
          <p
            class="marqueeClass marquee-content"
            @animationend="handleAnimationEnd('album')"
          >
            {{ nowPlaying.album }}
          </p>
        </div>
        <div v-else>
          <p>{{ trimString(nowPlaying.album) }}</p>
        </div>
      </div>
      <img :src="albumArt" class="rounded-lg w-[90px] h-[90px]" />
    </div>
  </div>
</template>
