<script setup>
// import { reactive } from "vue";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import { mdiChevronRight } from "@mdi/js";
// import QrcodeVue from "qrcode.vue";

import MainLayout from "@/layouts/MainLayout.vue";
import BaseButton from "@/components/BaseButton.vue";

// const qrData = "http://10.4.21.32:5173/setup";

const router = useRouter();
if (Cookies.get("setupComplete")) {
  router.push({
    name: "main",
  });
}

function saveSettings() {
  Cookies.set("setupComplete", true);

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

    <div class="text-7xl space-y-10 place-items-center justify-center">
      <h4>Let's get started</h4>
      <BaseButton
        :icon="mdiChevronRight"
        :icon-size="100"
        :small="false"
        rounded-full
        color="portalBlue"
        @click="saveSettings()"
      />
      <h4 class="text-4xl">
        You will need a keyboard and mouse for local setup
      </h4>
    </div>

    <!-- <hr class="border-2 border-black mb-5 w-full" />

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
    </div> -->
  </MainLayout>
</template>
