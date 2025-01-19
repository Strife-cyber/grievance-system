<script setup lang="ts">
import AOS from 'aos'
import { onMounted } from 'vue'
import avatar from '../assets/avatar.png'

onMounted(() => {
  // Optional: Add any dynamic behavior after mounting
  AOS.init({ duration: 2000 })
})
</script>

<template>
  <section class="flex flex-col-reverse md:flex-row items-center justify-between px-4 py-16">
    <!-- Avatar Image -->
    <img
      :src="avatar"
      data-aos="zoom-in"
      alt="Avatar"
      class="w-[20rem] md:w-[25rem] mb-8 md:mb-0 mx-auto"
    />

    <!-- Text Section -->
    <div class="text-center md:text-left md:w-[50%]">
      <!-- Main Heading -->
      <h2
        data-aos="fade-right"
        class="text-3xl sm:text-4xl text-primary md:text-5xl font-pacifico font-semibold text-pretty mb-4"
      >
        Transforming Concerns into Solutions
      </h2>

      <!-- Subheading -->
      <p
        data-aos="fade-right"
        class="text-lg sm:text-xl font-pacifico text-lightest mb-6 animate-fade-in-up"
      >
        Simplifying grievance management with a modern and effective approach.
      </p>

      <!-- Action Buttons -->
      <div class="flex justify-center md:justify-start gap-10 mt-[3rem]">
        <!-- Get Started Button -->
        <a
          href="#get-started"
          data-aos="flip-left"
          class="bg-golden text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:bg-pastel hover:scale-105 flex items-center gap-3 animate-fade-in-down"
        >
          <span class="text-[10px] font-bold">Get Started</span>
          <!-- FontAwesome Play Icon for "Get Started" -->
          <i class="fas fa-play"></i>
        </a>

        <!-- Learn More Button -->
        <a
          href="#learn-more"
          data-aos="flip-left"
          class="bg-transparent text-golden border-2 border-golden font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:bg-pastel hover:text-white hover:scale-105 flex items-center gap-3 animate-fade-in-down"
        >
          <span class="text-[10px] font-bold">Learn More</span>
          <!-- FontAwesome Info Icon for "Learn More" -->
          <i class="fas fa-info-circle"></i>
        </a>
      </div>
    </div>
  </section>
</template>
