<script setup lang="ts">
import { ref } from 'vue'
import logo from '../assets/sgs-logo.svg'
import { checkLogin } from '@/stores/cookie'

// Reactive state for login
const loggedIn = ref(checkLogin() != null)

// Mobile menu toggle state
const isMobileMenuOpen = ref(false)
const toggleMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <nav class="bg-white font-sans dark:bg-black shadow-md">
    <div class="mx-auto px-4 sm:px-6 py-2 lg:px-8">
      <div class="flex justify-between items-center">
        <!-- Logo Section -->
        <div class="flex items-center gap-4">
          <a href="/">
            <img :src="logo" class="w-16 animate-fade-in" alt="Sgs Logo" />
          </a>
          <h1
            class="text-primary text-2xl font-montaga hover:text-secondary cursor-pointer transition-all duration-300"
          >
            SGSystem
          </h1>
        </div>

        <!-- Navbar Links Section -->
        <div class="hidden md:flex space-x-6 items-end">
          <a
            href="/"
            class="text-black font-montaga hover:underline hover:text-secondary transition-all duration-300"
            >Home</a
          >
          <a
            href="/file-grievance"
            class="text-black font-montaga hover:underline hover:text-secondary transition-all duration-300"
            >Grievances</a
          >
          <a
            href="/view-status"
            class="text-black font-montaga hover:underline hover:text-secondary transition-all duration-300"
            >View Status</a
          >
          <a
            href="/contact-us"
            class="text-black font-montaga hover:underline hover:text-secondary transition-all duration-300"
            >Contact Us</a
          >
        </div>

        <!-- Right Side (Login/Sign-Up or Profile/Logout) -->
        <div class="hidden md:flex items-center space-x-4">
          <!-- If user is a guest -->
          <template v-if="!loggedIn">
            <a
              href="/login"
              class="text-white font-montaga bg-golden hover:bg-light p-3 w-24 text-center rounded-md transition-all duration-300 transform hover:scale-105"
              >Login</a
            >
            <a
              href="/register"
              class="text-white font-montaga bg-golden hover:bg-light p-3 w-32 text-center rounded-md transition-all duration-300 transform hover:scale-105"
              >Get Started</a
            >
          </template>
          <!-- If user is logged in -->
          <template v-else>
            <a
              href="/profile"
              class="text-white font-montaga bg-golden hover:bg-light p-3 w-24 text-center rounded-md transition-all duration-300 transform hover:scale-105"
              >Profile</a
            >
            <a
              href="/logout"
              class="text-white font-montaga bg-golden hover:bg-light p-3 w-24 text-center rounded-md transition-all duration-300 transform hover:scale-105"
              >Logout</a
            >
          </template>
        </div>

        <!-- Mobile Menu (Hamburger) -->
        <div class="md:hidden">
          <button
            @click="toggleMenu"
            id="mobile-menu-button"
            class="text-golden focus:outline-none transition-transform duration-300 transform"
            :class="{ 'rotate-90': isMobileMenuOpen }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Dropdown -->
    <transition
      name="fade-slide"
      enter-active-class="transition-transform transition-opacity duration-500"
      leave-active-class="transition-transform transition-opacity duration-500"
    >
      <div
        v-if="isMobileMenuOpen"
        id="mobile-menu"
        class="md:hidden px-2 bg-white dark:bg-black shadow-inner"
      >
        <hr />
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            href="/"
            class="text-gray-800 p-3 rounded-md hover:text-white hover:bg-light block font-montaga transition-all duration-300"
            >Home</a
          >
          <a
            href="/file-grievance"
            class="text-gray-800 p-3 rounded-md hover:text-white hover:bg-light block font-montaga transition-all duration-300"
            >Grievances</a
          >
          <a
            href="/view-status"
            class="text-gray-800 p-3 rounded-md hover:text-white hover:bg-light block font-montaga transition-all duration-300"
            >View Status</a
          >
          <a
            href="/contact-us"
            class="text-gray-800 p-3 rounded-md hover:text-white hover:bg-light block font-montaga transition-all duration-300"
            >Contact Us</a
          >

          <!-- For logged in user -->
          <template v-if="loggedIn">
            <a
              href="/profile"
              class="text-gray-800 p-3 rounded-md hover:text-white hover:bg-light block font-montaga transition-all duration-300"
              >Profile</a
            >
            <a
              href="/logout"
              class="text-gray-800 p-3 rounded-md hover:text-white hover:bg-light block font-montaga transition-all duration-300"
              >Logout</a
            >
          </template>

          <!-- For guest user -->
          <template v-else>
            <a
              href="/login"
              class="text-gray-800 p-3 rounded-md hover:text-white hover:bg-light block font-montaga transition-all duration-300"
              >Login</a
            >
            <a
              href="/register"
              class="text-gray-800 p-3 rounded-md hover:text-white hover:bg-light block font-montaga transition-all duration-300"
              >Sign Up</a
            >
          </template>
          <hr />
        </div>
      </div>
    </transition>
  </nav>
</template>

<style scoped>
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10%);
}
.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
