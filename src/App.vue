<script setup lang`="ts">
import {
  reactive,
  onMounted, ref,
} from 'vue';
import ScreenCapture from './components/ScreenCapture.vue';
import StramingScreen from './components/StreamingScreen.vue';


const mediaStream1 = ref(new MediaStream());
const mediaStream2 = ref(new MediaStream());
const mediaStream3 = ref(new MediaStream());


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
      <v-container fluid>
        <v-row>
          <v-col
            cols="12"
            sm="2"
          >
            <ScreenCapture
              v-model:mediaStream="mediaStream1"
              class="mb-1"
              name="コーディング画面"
              preview
            />
            <ScreenCapture
              v-model:mediaStream="mediaStream2"
              class="mb-1"
              name="結果表示"
              preview
            />
            <ScreenCapture
              v-model:mediaStream="mediaStream3"
              class="mb-1"
              name="授業資料"
              preview
            />
          </v-col>
          <v-col
            cols="12"
            sm="10"
          >
            <StramingScreen
              v-model:mediaStream1="mediaStream1"
              v-model:mediaStream2="mediaStream2"
              v-model:mediaStream3="mediaStream3"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
