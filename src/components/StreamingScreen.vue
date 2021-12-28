<script setup lang="ts">
import {
  ref,
  reactive,
  onMounted, computed, defineProps,
} from 'vue';


const props = defineProps<{
  mediaStream1: MediaStream
}>();


const canvas = ref<HTMLCanvasElement>();
const video1 = ref<HTMLVideoElement>();
const video2 = ref<HTMLVideoElement>();

const cvSize = reactive({
  width: 1280,
  height: 720,
});

const p = ref<number>(8); // screen内部のpadding

const subCvConfig = reactive({
  mag: 1.5,
  position: 'bottom-right',
});

const subCanvasPosition = computed(() => {
  if (video2.value === undefined) {
    return {
      x: 0,
      y: 0,
    };
  }
  switch (subCvConfig.position) {
    case 'top-left':
      return {
        x: p.value,
        y: p.value,
      };
    case 'top-right':
      return {
        x: cvSize.width - p.value - subCvConfig.mag *cvSize.width,
        y: p.value,
      };
    case 'bottom-left':
      return {
        x: p.value,
        y: cvSize.height - p.value - subCvConfig.mag * cvSize.height,
      };
    case 'bottom-right':
      return {
        x: cvSize.width - p.value - (cvSize.width / subCvConfig.mag),
        y: cvSize.height - p.value - (cvSize.height / subCvConfig.mag),
      };
    default:
      return {
        x: p.value,
        y: p.value,
      };
  }
});


const drawCanvas = () => {
  if (
    canvas.value === undefined ||
    video1.value === undefined ||
    video2.value === undefined
  ) return;
  const context:CanvasRenderingContext2D|null = canvas.value.getContext('2d');
  if (context === null) return;
  context.fillStyle = '#F3F5FB';
  context.fillRect(0, 0, cvSize.width, cvSize.height);
  context.drawImage(
      video1.value,
      0, 0,
      cvSize.width, cvSize.height,
  );
  context.drawImage(
      video2.value,
      subCanvasPosition.value.x, subCanvasPosition.value.y,
      cvSize.width / subCvConfig.mag,
      cvSize.height / subCvConfig.mag,
  );
  requestAnimationFrame(drawCanvas);
};


// Events
onMounted(() => {
  drawCanvas();
});


// const props = defineProps<{
//   mediaStream: MediaStream
// }>();

// const emit = defineEmits<{(eventName: 'update:', value: number): void }>();


</script>

<template>
  <!-- TODO: 後で :srcObject.prop="mediaStream" に置き換え -->
  <div>
    <p>canvas</p>
    <canvas
      ref="canvas"
      :width="cvSize.width"
      :height="cvSize.height"
    />
  </div>
  <div style="opacity: 0">
    <video
      ref="video1"
      :srcObject.prop="mediaStream1"
      autoplay
      controls
      width="200"
    />
    <video
      ref="video2"
      src="mock/sample2.mp4"
      autoplay
      width="200"
    />
  </div>
  <p>ここ</p>
  <video
    autoplay
    width="400"
  />
  <p>ここ</p>
</template>
