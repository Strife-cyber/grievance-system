<script setup lang="ts">
import AOS from 'aos'
import avatar from '../assets/avatar.png'
import { ref, onMounted, onUnmounted } from 'vue'
import FeatureCard from '@/widgets/FeatureCard.vue'
import SpeechBubble from '@/widgets/SpeechBubble.vue'

onMounted(() => {
  AOS.init({ duration: 3000 })
})

const greet = ref(true)

// Set interval for greeting toggle
const intervalId = setInterval(() => {
  greet.value = !greet.value
}, 5000)

// Cleanup the interval when the component is unmounted
onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<template>
  <section data-aos="fade-in" class="min-h-[100vh] flex flex-col items-center px-6 py-16">
    <!-- Heading Section -->
    <h2 class="font-semibold text-4xl font-pacifico text-black text-center mb-[10%]">
      Features That Define Excellence in Grievance Management
    </h2>

    <div class="flex justify-between xs:flex-col items-center w-full">
      <!-- Avatar Section -->
      <div class="relative w-full max-w-4xl xs:mt-12 flex justify-center mb-16">
        <div data-aos="zoom-in">
          <!-- Avatar -->
          <img :src="avatar" alt="Avatar" class="rounded-full relative z-10" />
          <!-- Speech Bubble -->
          <div
            class="absolute -top-[16vh] -right-[10vh] rounded-lg p-4 flex items-center text-sm md:text-base font-medium text-gray-700"
          >
            <!-- Speech Bubble -->
            <SpeechBubble
              :text="greet ? 'Hi !' : 'Explore !'"
              position="top"
              color="white"
              borderColor="yellow-400"
              textColor="yellow-500"
            />
          </div>
        </div>
      </div>

      <!-- Features Cards -->
      <div class="flex sm:flex-wrap gap-8 w-full xs:flex-col items-center">
        <FeatureCard
          icon="fas fa-brain"
          heading="AI-Powered Insights"
          details="Automatically prioritize grievances by urgency with AI-driven sentiment analysis."
        />
        <FeatureCard
          icon="fas fa-user-secret"
          heading="Confidentiality"
          details="Grievances are kept confidential, fostering trust and safety for users."
        />
        <FeatureCard
          icon="fas fa-clipboard-list"
          heading="Grievance Tracking"
          details="Track progress in real-time using unique grievance IDs with status updates."
        />
        <FeatureCard
          icon="fas fa-exchange-alt"
          heading="Appeal Process"
          details="Seamlessly escalate grievances to higher authorities with a structured workflow."
        />
        <FeatureCard
          icon="fas fa-users-cog"
          heading="Admin & Staff Tools"
          details="Efficiently manage grievances with AI-driven tools and comprehensive reporting."
        />
        <FeatureCard
          icon="fas fa-bell"
          heading="Real-Time Notifications"
          details="Stay updated with automatic email and in-app notifications for all grievance changes."
        />
      </div>
    </div>
  </section>
</template>
