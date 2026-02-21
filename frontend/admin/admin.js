// Navigation functionality
const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll(".content-section");
const pageTitle = document.getElementById("pageTitle");
const pageSubtitle = document.getElementById("pageSubtitle");
const todayCount = document.getElementById("todayCount");
const pendingCount = document.getElementById("pendingCount");

// Section data
const sectionData = {
  cars: {
    title: "Car Bookings",
    subtitle: "Manage and track all car rental bookings",
    todayCount: 24,
    pendingCount: 8,
  },
  hotels: {
    title: "Hotel Bookings",
    subtitle: "Manage and track all hotel reservations",
    todayCount: 15,
    pendingCount: 5,
  },
  flights: {
    title: "Flight Bookings",
    subtitle: "Manage and track all flight ticket bookings",
    todayCount: 32,
    pendingCount: 12,
  },
};

// Switch between sections
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    const sectionName = item.getAttribute("data-section");

    // Update active nav item
    navItems.forEach((nav) => nav.classList.remove("active"));
    item.classList.add("active");

    // Update active section
    sections.forEach((section) => section.classList.remove("active"));
    const activeSection = document.getElementById(`${sectionName}-section`);
    if (activeSection) {
      activeSection.classList.add("active");
    }

    // Update header content
    const data = sectionData[sectionName];
    if (data) {
      pageTitle.textContent = data.title;
      pageSubtitle.textContent = data.subtitle;
      todayCount.textContent = data.todayCount;
      pendingCount.textContent = data.pendingCount;
    }
  });
});

// Action buttons functionality
document.addEventListener("click", (e) => {
  const target = e.target.closest(".action-btn");
  if (!target) return;

  const row = target.closest("tr");
  const bookingId = row?.querySelector(".booking-id")?.textContent || "Unknown";

  if (target.classList.contains("view")) {
    alert(`View details for booking: ${bookingId}`);
    // Here you would typically open a modal with booking details
  } else if (target.classList.contains("edit")) {
    alert(`Edit booking: ${bookingId}`);
    // Here you would typically open an edit form
  } else if (target.classList.contains("delete")) {
    if (confirm(`Are you sure you want to delete booking ${bookingId}?`)) {
      alert(`Booking ${bookingId} deleted`);
      // Here you would typically make an API call to delete the booking
      row.style.animation = "fadeOut 0.3s ease";
      setTimeout(() => row.remove(), 300);
    }
  }
});

// Logout functionality
document.querySelector(".logout-btn").addEventListener("click", () => {
  if (confirm("Are you sure you want to logout?")) {
    // Clear any stored tokens
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to login page
    window.location.href = "travel_login_html.html";
  }
});

// Add fade out animation
const style = document.createElement("style");
style.textContent = `
  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.95);
    }
  }
`;
document.head.appendChild(style);

// Mobile sidebar toggle (for responsive design)
function createMobileToggle() {
  if (window.innerWidth <= 768) {
    const sidebar = document.querySelector(".sidebar");
    const mainContent = document.querySelector(".main-content");

    // Create toggle button if it doesn't exist
    if (!document.querySelector(".mobile-toggle")) {
      const toggleBtn = document.createElement("button");
      toggleBtn.className = "mobile-toggle";
      toggleBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `;
      toggleBtn.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 1000;
        background: var(--primary);
        border: none;
        border-radius: 8px;
        padding: 10px;
        cursor: pointer;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: var(--shadow-md);
      `;

      toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("open");
      });

      document.body.appendChild(toggleBtn);

      // Close sidebar when clicking outside
      mainContent.addEventListener("click", () => {
        if (sidebar.classList.contains("open")) {
          sidebar.classList.remove("open");
        }
      });
    }
  }
}

// Initialize mobile toggle on load and resize
createMobileToggle();
window.addEventListener("resize", createMobileToggle);

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = "smooth";

console.log("Admin Dashboard loaded successfully!");
