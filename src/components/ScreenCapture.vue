<script lang="ts" setup>
import {
  defineProps,
  defineEmits,
  ref,
} from 'vue';
import useMediaDevice from '../composables/useMediaDevice';

const props = defineProps<{
  mediaStream: MediaStream
}>();
const emit = defineEmits(['update:mediaStream']);


const videoSrc = ref<MediaStream>(new MediaStream());

const {getDisplayMedia} = useMediaDevice();

const onClickSelectButton = async () => {
  const ms: MediaStream = await getDisplayMedia();
  if (!ms.active) {
    return false;
  }
  videoSrc.value = ms;
  emit('update:mediaStream', ms);
};

</script>


<template>
  <v-btn
    color="primary"
    class="font-weight-bold"
    elevation="0"
    @click="onClickSelectButton"
  >
    画面1
  </v-btn>
  {{ mediaStream }}aa
  <video
    :srcObject.prop="videoSrc"
    autoplay
    width="400"
  />
</template>
