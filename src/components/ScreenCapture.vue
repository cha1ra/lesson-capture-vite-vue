<script lang="ts" setup>
import {
  defineProps,
  defineEmits,
  ref,
} from 'vue';
import useMediaDevice from '../composables/useMediaDevice';

const props = defineProps<{
  mediaStream: MediaStream
  preview: boolean
  name: string
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
  <v-card
    color="primary"
    class="font-weight-bold pa-2"
    elevation="0"
    @click="onClickSelectButton"
  >
    <div class="d-flex align-center">
      <div
        class="prev-icon mr-2"
      >
        <video
          :srcObject.prop="videoSrc"
          autoplay
          width="100"
        />
      </div>
      {{ name }}
    </div>
  </v-card>
</template>

<style lang="scss" scoped>
.prev-icon {
  height: 30px;
  width: 30px;
  background-color: #eee;
  border-radius: 4px;
  video {
    height: 30px;
    width: 30px;
    object-fit: fill;
    border-radius: 4px;
  }
}
</style>
