<script setup lang="ts">
import AOS from 'aos'
import { onMounted } from 'vue'

defineProps({
  heading: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
})

onMounted(() => {
  AOS.init({ duration: 2000 })
})
</script>

<template>
  <div class="bg-white p-6 rounded-lg w-[40vh] shadow-lg text-center" data-aos="fade-up">
    <div class="text-yellow-500 text-5xl mb-4">
      <i :class="icon"></i>
    </div>
    <h3 data-aos="fade-right" class="text-xl font-bold mb-2 font-montaga">{{ heading }}</h3>
    <p data-aos="fade-left" class="text-gray-600">
      {{ details }}
    </p>
  </div>
</template>
