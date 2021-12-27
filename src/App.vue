<script setup lang`="ts">
import {
  reactive,
  onMounted, ref,
} from 'vue';
import ScreenCapture from './components/ScreenCapture.vue';
import StramingScreen from './components/StreamingScreen.vue';


const mediaStream = ref(new MediaStream());


// console.log(mediaStream);
// console.log('test');
// console.log(new MediaStream());
// console.log(mediaStream);
// console.log(mediaStream.value);
// console.log('test-end');
// onMounted(() => {
//   mediaStream.value = new MediaStream();
//   console.log('onMounted');
//   console.log(mediaStream);
// });


</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <StramingScreen />
        <ScreenCapture
          v-model:mediaStream="mediaStream"
        />
      </v-container>
    </v-main>
  </v-app>
</template>
