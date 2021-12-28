<script setup lang="ts">
import {
  ref,
  reactive,
  onMounted, computed, defineProps,
} from 'vue';


const props = defineProps<{
  mediaStream1: MediaStream
  mediaStream2: MediaStream
  mediaStream3: MediaStream
}>();


const canvas = ref<HTMLCanvasElement>();
const video1 = ref<HTMLVideoElement>();
const video2 = ref<HTMLVideoElement>();
const video3 = ref<HTMLVideoElement>();


const cvSize = reactive({
  width: 1280,
  height: 720,
});

const p = ref<number>(8); // screen内部のpadding

const subCvConfig = reactive({
  mag: 2,
  position: 'bottom-right',
});

const subCvPos = computed(() => {
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


// メイン画面, サブ画面を 指定IDで振り分ける
const cvId = reactive({
  main: 'video1',
  sub: 'video2',
});

const calcSelectedDom = (id) => {
  switch (id) {
    case 'video1':
      return video1.value;
    case 'video2':
      return video2.value;
    case 'video3':
      return video3.value;
    default:
      return video1.value;
  }
};

// TODO: これ、綺麗にしたい
const selectedMainDom = computed(() => {
  return calcSelectedDom(cvId.main);
});
const selectedSubDom = computed(() => {
  return calcSelectedDom(cvId.sub);
});


const drawCanvas = () => {
  if (
    canvas.value === undefined ||
    selectedMainDom.value === undefined ||
    selectedSubDom.value === undefined
  ) return;
  const context:CanvasRenderingContext2D|null = canvas.value.getContext('2d');
  if (context === null) return;
  context.fillStyle = '#F3F5FB';
  context.fillRect(0, 0, cvSize.width, cvSize.height);
  context.drawImage(
      selectedMainDom.value,
      0, 0,
      cvSize.width, cvSize.height,
  );
  if (cvId.sub !== '') {
    context.drawImage(
        selectedSubDom.value,
        subCvPos.value.x, subCvPos.value.y,
        cvSize.width / subCvConfig.mag,
        cvSize.height / subCvConfig.mag,
    );
  }
  requestAnimationFrame(drawCanvas);
};


// Events
onMounted(() => {
  drawCanvas();
});

</script>

<template>
  <div style="position: relative">
    <canvas
      ref="canvas"
      style="position: absolute; top: 0;left: 0;"
      :width="cvSize.width"
      :height="cvSize.height"
    />
    <div style="opacity: 0; position: absolute; top: 0;left: 0;">
      <!--      <video-->
      <!--        ref="video1"-->
      <!--        src="mock/sample1.mp4"-->
      <!--        autoplay-->
      <!--        controls-->
      <!--        width="200"-->
      <!--      />-->
      <!--      <video-->
      <!--        ref="video2"-->
      <!--        src="mock/sample2.mp4"-->
      <!--        autoplay-->
      <!--        width="200"-->
      <!--      />-->
      <video
        ref="video1"
        :srcObject.prop="mediaStream1"
        autoplay
        controls
        width="200"
      />
      <video
        ref="video2"
        :srcObject.prop="mediaStream2"
        autoplay
        width="200"
      />
      <video
        ref="video3"
        :srcObject.prop="mediaStream3"
        autoplay
        width="200"
      />
    </div>
  </div>
  <!-- Controller -->
  <div>
    <v-btn
      class="ma-2"
      @click="()=>{cvId.main='video1';cvId.sub=''}"
    >
      エディタ
    </v-btn>
    <v-btn
      class="ma-2"
      @click="()=>{cvId.main='video1';cvId.sub='video2'}"
    >
      エディタ + ブラウザ
    </v-btn>
    <v-btn
      class="ma-2"
      @click="()=>{let a=cvId.main; cvId.main=cvId.sub; cvId.sub=a}"
    >
      交換
    </v-btn>
    <v-btn
      class="ma-2"
      @click="()=>{cvId.main='video3';cvId.sub=''}"
    >
      授業資料
    </v-btn>
  </div>
</template>
