<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import ApertureLogo from "@/components/ApertureLogo.vue";

defineProps({
  centered: {
    type: Boolean,
    default: false,
  },
});

const scalingContainer = ref(null);
const scaleApp = () => {
  const baseWidth = 1080;
  const baseHeight = 1920;

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const scaleX = windowWidth / baseWidth;
  const scaleY = windowHeight / baseHeight;

  const scale = Math.min(scaleX, scaleY);

  if (scalingContainer.value) {
    scalingContainer.value.style.transform = `scale(${scale})`;
    scalingContainer.value.style.transformOrigin = "top left";
    scalingContainer.value.style.width = `${baseWidth}px`;
    scalingContainer.value.style.height = `${baseHeight}px`;
  }
};

onMounted(() => {
  scaleApp();
  window.addEventListener("resize", scaleApp);
});

onUnmounted(() => {
  window.removeEventListener("resize", scaleApp);
});
</script>

<template>
  <div id="scaling-container" ref="scalingContainer">
    <div
      :class="centered ? 'text-center' : 'pl-[200px]'"
      class="p-12 w-full h-full shadow-[inset_0_-2px_50px_rgba(0,0,0,0.9)] bg-red-100"
    >
      <div class="w-full h-full grid content-between">
        <slot />
        <div :class="centered ? 'pl-[150px]' : ''">
          <ApertureLogo />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#scaling-container {
  overflow: hidden;
  position: relative;
}

body {
  scrollbar-gutter: stable both-edges; /* Prevent layout shifts due to scrollbar */
}

::-webkit-scrollbar {
  width: 8px; /* Narrower scrollbar */
}

::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.5); /* Custom scrollbar styling */
  border-radius: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}
</style>
