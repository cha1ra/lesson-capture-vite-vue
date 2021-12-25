<template>
  <button
    @click="onClickSelectButton"
  >選択</button>
  <v-btn color="primary" class="font-weight-bold" elevation="0">
    画面1
  </v-btn>
  <div class="capture"></div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive
} from 'vue'
import useMediaDevice from "../composables/useMediaDevice"

export default defineComponent({
  setup () {
    const { getDisplayMedia } = useMediaDevice()
    console.log(getDisplayMedia)

    // screen capture api
    async function startCapture(displayMediaOptions) {
      let captureStream = null;

      try {
        captureStream = await getDisplayMedia
      } catch(err) {
        console.error("Error: " + err);
      }
      return captureStream;
    }

    const onClickSelectButton = async () => {
      const mediaStream = await getDisplayMedia()
      if (!mediaStream.active) {
        console.log(mediaStream)
        console.log('active')
        return false
      }
      console.log('mode')
    }


    const flag = ref()
    const state = reactive({

    })
    return {
      flag,
      state,
      onClickSelectButton
    }
  }
})
</script>

<style lang="scss">

</style>
