// AOS Initialization
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
  easing: "ease-out-cubic",
});

// Music Control Variables
let isPlaying = false;
const bgMusic = document.getElementById("bgMusic");
const musicControl = document.getElementById("musicControl");
const musicIcon = document.getElementById("musicIcon");

// Toggle Music Function
function toggleMusic() {
  if (isPlaying) {
    bgMusic.pause();
    musicIcon.classList.remove("fa-volume-up");
    musicIcon.classList.add("fa-music");
    musicIcon.parentElement.classList.remove("animate-pulse");
  } else {
    bgMusic
      .play()
      .then(() => {
        musicIcon.classList.remove("fa-music");
        musicIcon.classList.add("fa-volume-up");
        musicIcon.parentElement.classList.add("animate-pulse");
      })
      .catch((error) => {
        console.log("Autoplay prevented:", error);
        musicIcon.classList.add("fa-volume-mute");
      });
  }
  isPlaying = !isPlaying;
}

// Show Full Invitation Function
window.showFullInvitation = function () {
  const navbar = document.getElementById("mainNav");
  const overlay = document.getElementById("lockOverlay");
  const mainContent = document.getElementById("mainContent");
  const musicControl = document.getElementById("musicControl");

  // Show navbar
  navbar.classList.add("translate-y-0");
  navbar.classList.remove("-translate-y-full");

  // Hide overlay
  overlay.classList.add("opacity-0");
  setTimeout(() => {
    overlay.classList.add("hidden");
  }, 500);

  // Show main content
  mainContent.classList.remove("invisible", "opacity-0");

  // Show music control
  musicControl.classList.remove("opacity-0");

  // Enable scrolling
  document.body.classList.remove("lock-scroll");

  // Play music
  bgMusic
    .play()
    .then(() => {
      musicIcon.classList.remove("fa-music");
      musicIcon.classList.add("fa-volume-up");
      musicIcon.parentElement.classList.add("animate-pulse");
      isPlaying = true;
    })
    .catch((error) => {
      console.log("Autoplay prevented:", error);
      musicIcon.classList.add("fa-volume-mute");
    });

  // Scroll ke section couple setelah konten muncul
  setTimeout(() => {
    document.getElementById("couple").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 500); // Tunggu 500ms agar transisi fade in selesai
};

// Event Listeners
document.addEventListener("visibilitychange", function () {
  if (document.hidden && isPlaying) {
    bgMusic.pause();
  } else if (!document.hidden && isPlaying) {
    bgMusic.play();
  }
});

window.addEventListener("beforeunload", function () {
  if (isPlaying) {
    bgMusic.pause();
  }
});

// Set countdown to Akad Nikah
const akadNikahDate = new Date("2028-01-15T09:00:00+07:00"); // Waktu Akad Nikah
const resepsiDate = new Date("2028-01-15T11:00:00+07:00"); // Waktu Resepsi

// Pilih tanggal yang ingin ditampilkan countdown
let countdownDate = akadNikahDate; // Ganti dengan resepsiDate jika ingin countdown ke resepsi

// Update the countdown every second
const countdownFunction = setInterval(() => {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  // Time calculations for days, hours, minutes and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the respective elements
  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;

  // If the countdown is over, display a message
  if (distance < 0) {
    clearInterval(countdownFunction);
    document.getElementById("days").innerHTML = "Waktu Habis";
    document.getElementById("hours").innerHTML = "00";
    document.getElementById("minutes").innerHTML = "00";
    document.getElementById("seconds").innerHTML = "00";
  }
}, 1000);

// Mobile Menu Toggle
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const menuIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", () => {
  const isExpanded = menuBtn.getAttribute("aria-expanded") === "true";

  menuBtn.setAttribute("aria-expanded", !isExpanded);
  mobileMenu.classList.toggle("hidden");

  // Toggle icon
  if (isExpanded) {
    menuIcon.classList.remove("fa-times");
    menuIcon.classList.add("fa-bars");
  } else {
    menuIcon.classList.remove("fa-bars");
    menuIcon.classList.add("fa-times");
  }
});

// Close mobile menu when clicking nav links
document.querySelectorAll("#mobileMenu .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    menuIcon.classList.remove("fa-times");
    menuIcon.classList.add("fa-bars");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

// Weather API
async function getWeather() {
  const lat = -6.828395924069004;
  const lon = 106.92212896845774;
  const apiKey = "YOUR_OPENWEATHER_API_KEY";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=id`
    );
    const data = await response.json();

    document.getElementById("temperature").textContent = `${Math.round(
      data.main.temp
    )}°C`;
    document.getElementById("weather-desc").textContent =
      data.weather[0].description;

    // Update weather icon
    const iconCode = data.weather[0].icon;
    const iconElement = document.getElementById("weather-icon");
    iconElement.className = getWeatherIcon(iconCode);
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
}

// Get weather icon class based on OpenWeather icon code
function getWeatherIcon(code) {
  const icons = {
    "01d": "fas fa-sun",
    "01n": "fas fa-moon",
    "02d": "fas fa-cloud-sun",
    "02n": "fas fa-cloud-moon",
    "03d": "fas fa-cloud",
    "03n": "fas fa-cloud",
    "04d": "fas fa-cloud",
    "04n": "fas fa-cloud",
    "09d": "fas fa-cloud-rain",
    "09n": "fas fa-cloud-rain",
    "10d": "fas fa-cloud-sun-rain",
    "10n": "fas fa-cloud-moon-rain",
    "11d": "fas fa-bolt",
    "11n": "fas fa-bolt",
    "13d": "fas fa-snowflake",
    "13n": "fas fa-snowflake",
    "50d": "fas fa-smog",
    "50n": "fas fa-smog",
  };
  return icons[code] || "fas fa-question";
}

// Share location
function shareLocation() {
  const locationUrl = "https://maps.app.goo.gl/y7vSXMSikKNiNAfS9";
  const text = "Lokasi Pernikahan Haikal & Rofiah";

  if (navigator.share) {
    navigator
      .share({
        title: "Lokasi Pernikahan",
        text: text,
        url: locationUrl,
      })
      .catch(console.error);
  } else {
    // Fallback for browsers that don't support Web Share API
    const dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = `${text}\n${locationUrl}`;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    alert("Link lokasi telah disalin!");
  }
}

// RSVP Form Handler
document
  .getElementById("rsvpForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Mencegah pengiriman formulir default

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    fetch(
      "https://script.google.com/macros/s/AKfycbxcNlDvrisCpSI8URP6dwaj2ALTGyFfUoCLb1Av0DLkOuvhSs8tTaE0X_bsrPimN9oE/exec",
      {
        // Ganti dengan URL Google Apps Script Anda
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        alert("Konfirmasi berhasil dikirim!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Terjadi kesalahan saat mengirim konfirmasi.");
      });
  });

// Call weather API when page loads
document.addEventListener("DOMContentLoaded", getWeather);

// Geolocation dan Weather Widget
function initializeLocationBasedFeatures() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Update weather widget dengan lokasi pengguna
        const weatherWidget = document.getElementById("id5bf36b6b00c");
        const widgetConfig = JSON.parse(weatherWidget.getAttribute("a"));
        widgetConfig.locs = [`${lat},${lon}`]; // Menambahkan lokasi pengguna
        weatherWidget.setAttribute("a", JSON.stringify(widgetConfig));

        // Reload widget dengan konfigurasi baru
        const oldScript = document.querySelector(
          'script[src*="cuacalab.id/widgetjs"]'
        );
        const newScript = document.createElement("script");
        newScript.src = oldScript.src;
        newScript.async = true;
        oldScript.parentNode.replaceChild(newScript, oldScript);

        // Update jarak ke lokasi acara
        calculateDistance(lat, lon, -6.828395924069004, 106.92212896845774); // Koordinat lokasi acara
      },
      function (error) {
        console.error("Error getting location:", error);
        // Fallback ke lokasi default (lokasi acara)
        const weatherWidget = document.getElementById("id5bf36b6b00c");
        const widgetConfig = JSON.parse(weatherWidget.getAttribute("a"));
        widgetConfig.locs = ["-6.828395924069004,106.92212896845774"];
        weatherWidget.setAttribute("a", JSON.stringify(widgetConfig));
      }
    );
  }
}

// Menghitung jarak antara lokasi pengguna dan lokasi acara
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius bumi dalam kilometer
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Jarak dalam kilometer

  // Update UI dengan informasi jarak
  const distanceInfo = document.getElementById("distance-info");
  if (distanceInfo) {
    distanceInfo.textContent = `Jarak dari lokasi Anda: ${distance.toFixed(
      1
    )} km`;
  }
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// Panggil fungsi saat halaman dimuat
document.addEventListener("DOMContentLoaded", initializeLocationBasedFeatures);

// Saat halaman dimuat, kunci scroll
document.body.classList.add("lock-scroll");

// Add active state to nav links based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionBottom = sectionTop + section.offsetHeight;
    const currentScroll = window.scrollY;

    if (currentScroll >= sectionTop && currentScroll < sectionBottom) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${section.id}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", updateActiveNavLink);

// Script untuk menampilkan widget cuaca
window.myWidgetParam = {
  id: 1,
  cityid: "1645528", // ID kota untuk Sukabumi
  appid: "", // Kosongkan jika tidak diperlukan
  units: "metric",
  containerid: "weather-widget",
  background: "transparent",
  color: "#000",
  font: "Arial",
  fontsize: "16",
  lang: "id",
};

// Script untuk memuat widget cuaca
!(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (!d.getElementById(id)) {
    js = d.createElement(s);
    js.id = id;
    js.src = "https://weatherwidget.io/js/widget.min.js";
    fjs.parentNode.insertBefore(js, fjs);
  }
})(document, "script", "weatherwidget-io-js");
