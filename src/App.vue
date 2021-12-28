<script setup lang`="ts">
import {
  reactive,
  onMounted, ref,
} from 'vue';
import ScreenCapture from './components/ScreenCapture.vue';
import StramingScreen from './components/StreamingScreen.vue';


const mediaStream1 = ref(new MediaStream());


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
      <v-row>
        <v-col
          cols="12"
          sm="3"
        >
          <ScreenCapture
            v-model:mediaStream="mediaStream1"
          />
        </v-col>
        <v-col
          cols="12"
          sm="9"
        >
          <StramingScreen
            v-model:mediaStream1="mediaStream1"
          />
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>
