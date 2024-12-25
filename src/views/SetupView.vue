<script setup>
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import { mdiCheckAll, mdiChevronLeft, mdiChevronRight } from "@mdi/js";
import QrcodeVue from "qrcode.vue";

import MainLayout from "@/layouts/MainLayout.vue";
import BaseButton from "@/components/BaseButton.vue";
import SetupPrompt from "@/components/setup/SetupPrompt.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import FormCheckRadio from "@/components/FormCheckRadio.vue";

const qrData = "http://10.4.21.32:5173/setup";

const router = useRouter();
if (Cookies.get("setupComplete") && Cookies.get("settings")) {
  router.push({
    name: "main",
  });
}

const setupState = ref(0);
const states = [
  {
    header: "Let's get started",
    text: "You will need a mouse and keyboard for local setup",
  },
  {
    header: "OpenWeatherMap API",
    text: "WaLLDOS uses OpenWeatherMap's one-call API for weather information. Account registration is free.",
    url: "https://home.openweathermap.org/users/sign_up",
    fields: [
      {
        id: "owm_key",
        name: "API Key",
        type: String,
      },
    ],
  },
  {
    header: "IP GEO API",
    text: "WaLLDOS uses the IP GEO API for location information. Account registration is free.",
    url: "https://getgeoapi.com/register/",
    fields: [
      {
        id: "geoapi_key",
        name: "API Key",
        type: String,
      },
    ],
  },
  {
    header: "Volumio",
    text: "WaLLDOS can connect to a Volumio device for playback information. Supports custom devices.",
    url: "https://volumio.com/",
    fields: [
      {
        id: "use_volumio",
        name: "Enable Volumio",
        type: Boolean,
      },
      {
        id: "volumio_name",
        name: "Speaker Name",
        type: String,
        placeholder: "My Speakers",
      },
      {
        id: "volumio_server",
        name: "Speaker Hostname",
        type: String,
        placeholder: "http://volumio.local",
      },
    ],
  },
];

const newSettings = reactive({
  use_volumio: false,
});

const checkSettings = computed(() => {
  return states.every((state) => {
    if (!state.fields) return true;
    return state.fields.every((field) => {
      if (
        (field.id == "volumio_name" || field.id == "volumio_server") &&
        !newSettings.use_volumio
      ) {
        return true;
      }

      const value = newSettings[field.id];
      return (
        value !== undefined &&
        value !== null &&
        (typeof value === "string" ? value.trim() !== "" : true)
      );
    });
  });
});

function saveSettings() {
  Cookies.set("setupComplete", true, {
    expires: 7,
    path: "",
    sameSite: "strict",
  });
  Cookies.set("settings", JSON.stringify(newSettings), {
    expires: 7,
    path: "",
    sameSite: "strict",
  });

  router.push({
    name: "main",
  });
}
</script>

<template>
  <MainLayout centered>
    <div class="text-7xl space-y-[20px]">
      <h4 class="-ml-2">Welcome to</h4>
      <h1 class="levelFont text-[200pt] scale-y-110 scale-90f">WaLLDOS</h1>
    </div>

    <div class="relative overflow-hidden w-full h-[800px]">
      <div
        v-for="(state, index) in states"
        :key="index"
        class="absolute transition-transform duration-300 ease-in-out w-full grid space-y-10"
        :class="{
          'translate-x-0': setupState === index,
          'translate-x-full': setupState < index,
          '-translate-x-full': setupState > index,
        }"
      >
        <SetupPrompt :prompt="state" class="px-10" />

        <hr class="border-2 border-black my-2" />

        <div class="w-auto text-4xl text-gray-800 grid gap-4 px-10">
          <FormField
            v-for="field of state.fields"
            :key="field.id"
            :label="field.name"
          >
            <FormControl
              v-if="field.type == String"
              v-model="newSettings[field.id]"
              :input-value="newSettings[field.id]"
              :placeholder="field.placeholder"
            />
            <FormCheckRadio
              v-else-if="field.type == Boolean"
              v-model="newSettings[field.id]"
              :input-value="newSettings[field.id] ?? false"
              :name="field.name"
              class=""
            />
          </FormField>
        </div>
      </div>

      <div
        class="absolute transition-transform duration-300 ease-in-out w-full"
        :class="{
          'translate-x-0': setupState === 4,
          'translate-x-full': setupState < 4,
          '-translate-x-full': setupState > 4,
        }"
      >
        <h2 v-if="!checkSettings" class="text-6xl">
          Your settings are incomplete!
        </h2>
        <h2 v-else class="text-6xl">Setup complete, enjoy your WaLLDOS</h2>
      </div>
    </div>

    <div class="space-x-4">
      <BaseButton
        v-if="setupState"
        :icon="mdiChevronLeft"
        :icon-size="100"
        :small="false"
        rounded-full
        color="portalOrange"
        @click="setupState -= 1"
      />
      <BaseButton
        v-if="setupState <= 3"
        :icon="mdiChevronRight"
        :icon-size="100"
        :small="false"
        rounded-full
        color="portalBlue"
        @click="setupState += 1"
      />
      <BaseButton
        v-if="setupState == 4"
        :icon="mdiCheckAll"
        :icon-size="100"
        :small="false"
        :icon-inset="2"
        rounded-full
        color="portalBlue"
        :disabled="!checkSettings"
        @click="saveSettings()"
      />
    </div>

    <template v-if="null">
      <hr class="border-2 border-black mb-5 w-full" />

      <div class="text-6xl space-x-10 place-items-center flex justify-center">
        <div>
          <h3>Can't interact?</h3>
          <h4 class="text-4xl">Scan for remote setup</h4>
        </div>
        <div class="self-center pt-5">
          <qrcode-vue
            :value="qrData"
            :size="300"
            level="H"
            render-as="svg"
            class="border-[10px] w-[300px] border-white shadow-xl"
          />
        </div>
      </div>
    </template>
  </MainLayout>
</template>
