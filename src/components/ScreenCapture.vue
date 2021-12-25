<template>
  <v-btn
    color="primary"
    class="font-weight-bold"
    elevation="0"
    @click="onClickSelectButton"
  >
    画面1
  </v-btn>
  <video
    :srcObject.prop="videoSrc"
    autoplay
  />
</template>

<script lang="ts">
import {
  ref,
  reactive,
  defineComponent,
} from 'vue';
import useMediaDevice from '../composables/useMediaDevice';

export default defineComponent({
  setup() {
    const videoSrc = ref<MediaStream>(new MediaStream());

    const {getDisplayMedia} = useMediaDevice();
    console.log(getDisplayMedia);

    // screen capture api
    async function startCapture(displayMediaOptions) {
      let captureStream = null;

      try {
        captureStream = await getDisplayMedia();
      } catch (err) {
        console.error('Error: ' + err);
      }
      return captureStream;
    }

    const onClickSelectButton = async () => {
      const mediaStream = await getDisplayMedia();
      if (!mediaStream.active) {
        console.log(mediaStream);
        console.log('active');
        return false;
      }
      console.log('mode');

      videoSrc.value = mediaStream;
    };

    return {
      videoSrc,
      onClickSelectButton,
    };
  },
});
</script>

<style lang="scss">

</style>
