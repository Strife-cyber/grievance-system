<script setup lang="ts">
import AOS from 'aos'
import { onMounted } from 'vue'

onMounted(() => {
  AOS.init({
    duration: 2000,
  })
})
</script>

<template>
  <footer class="bg-gradient-to-b from-pastel to-reddish text-white py-8">
    <div class="container mt-5 mx-auto px-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <!-- Footer Links Section -->
        <div data-aos="fade-up" data-aos-delay="100">
          <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
          <ul>
            <li><a href="#" class="text-black hover:text-white font-montaga">Home</a></li>
            <li>
              <a href="#" class="text-black hover:text-white font-montaga">Submit a Grievance</a>
            </li>
            <li>
              <a href="#" class="text-black hover:text-white font-montaga">Track Your Grievance</a>
            </li>
            <li><a href="#" class="text-black hover:text-white font-montaga">About Us</a></li>
          </ul>
        </div>

        <!-- Contact Section -->
        <div data-aos="fade-up" data-aos-delay="200">
          <h3 class="text-lg font-semibold mb-4">Contact Us</h3>
          <ul>
            <li>
              <span class="text-white">Email: </span
              ><a
                href="mailto:support@grievancesystem.com"
                class="text-black hover:text-white font-montaga"
                >support@grievancesystem.com</a
              >
            </li>
            <li>
              <span class="text-white">Phone: </span
              ><a href="tel:+123456789" class="text-black hover:text-white font-montaga"
                >+1 (234) 567-89</a
              >
            </li>
            <li><span class="text-white">Address: </span>123 University St, City, Country</li>
          </ul>
        </div>

        <!-- Social Media Section -->
        <div data-aos="fade-up" data-aos-delay="300">
          <h3 class="text-lg font-semibold mb-4">Follow Us</h3>
          <div class="flex space-x-4">
            <a href="#" class="text-black hover:text-white font-montaga">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="text-black hover:text-white font-montaga">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#" class="text-black hover:text-white font-montaga">
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a href="#" class="text-black hover:text-white font-montaga">
              <i class="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Copyright Section -->
      <div class="mt-8 border-t border-gray-700 pt-4 text-center">
        <p class="text-white text-sm">© 2025 Student Grievance System. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
