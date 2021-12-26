<script setup lang`="ts">
import {
  reactive,
  onMounted, ref,
} from 'vue';
import ScreenCapture from './components/ScreenCapture.vue';


const mediaStream = ref(new MediaStream());


console.log(mediaStream);
console.log('test');
console.log(new MediaStream());
console.log(mediaStream);
console.log(mediaStream.value);
console.log('test-end');
onMounted(() => {
  mediaStream.value = new MediaStream();
  console.log('onMounted');
  console.log(mediaStream);
});


</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <ScreenCapture
          v-model:mediaStream="mediaStream"
        />
        ---
        <!-- TODO: 後で :srcObject.prop="mediaStream" に置き換え -->
        <video
          src="mock/sample1.mp4"
          autoplay
          width="400"
        />
        ---
      </v-container>
    </v-main>
  </v-app>
</template>
