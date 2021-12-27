<script setup lang="ts">
import {
  ref,
  reactive,
  onMounted,
} from 'vue';


const canvas = ref<HTMLCanvasElement>();
const video = ref<HTMLVideoElement>();

const canvasSize = reactive({
  width: 640,
  height: 480,
});

const drawCanvas = () => {
  if (canvas.value === undefined || video.value === undefined) return;
  const context:CanvasRenderingContext2D|null = canvas.value.getContext('2d');
  if (context === null) return;
  context.fillStyle = '#F3F5FB';
  context.fillRect(0, 0, canvasSize.width, canvasSize.height);
  context.drawImage(
      video.value,
      0, 0,
      canvasSize.width, canvasSize.height,
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
      :width="canvasSize.width"
      :height="canvasSize.height"
    />
  </div>
  <div>
    <p>video</p>
    <video
      ref="video"
      src="mock/sample2.mp4"
      autoplay
      controls
      width="400"
    />
  </div>

<!--  <video-->
<!--    src="mock/sample2.mp4"-->
<!--    autoplay-->
<!--    width="400"-->
<!--  />-->
</template>
