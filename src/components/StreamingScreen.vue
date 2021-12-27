<script setup lang="ts">
import {
  ref,
  defineProps,
  defineEmits,
} from 'vue';


// const props = defineProps<{
//   mediaStream: MediaStream
// }>();

// const emit = defineEmits<{(eventName: 'update:', value: number): void }>();


</script>

<template>
  <!-- TODO: 後で :srcObject.prop="mediaStream" に置き換え -->
  <video
    src="mock/sample1.mp4"
    autoplay
    width="400"
  />
  <video
    src="mock/sample2.mp4"
    autoplay
    width="400"
  />
</template>
