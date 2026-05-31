/**
 * Custom JavaScript
 * Script utama untuk platform BookingJasa
 */

// Global variables
let searchTimeout
let currentPage = 1
let isLoading = false
let loadMoreResults
let submitService
let loadDashboardStats
let loadNotifications
let updatePagination

// Document ready
$(document).ready(() => {
  initializeComponents()
  bindEvents()
  loadInitialData()
})

/**
 * Initialize components
 */
function initializeComponents() {
  // Initialize tooltips
  $('[data-bs-toggle="tooltip"]').tooltip()

  // Initialize popovers
  $('[data-bs-toggle="popover"]').popover()

  // Initialize date pickers
  if ($(".datepicker").length) {
    $(".datepicker").flatpickr({
      locale: "id",
      dateFormat: "Y-m-d",
      minDate: "today",
      disable: [
        (date) => {
          // Disable Sundays (0 = Sunday)
          return date.getDay() === 0
        },
      ],
    })
  }

  // Initialize time pickers
  if ($(".timepicker").length) {
    $(".timepicker").flatpickr({
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i",
      time_24hr: true,
      minTime: "08:00",
      maxTime: "20:00",
    })
  }

  // Initialize back to top button
  initBackToTop()

  // Initialize search functionality
  initSearch()
}

/**
 * Bind events
 */
function bindEvents() {
  // Search form submission
  $("#searchForm").on("submit", (e) => {
    if ($("#searchResults").length) {
      e.preventDefault()
      performSearch()
    }
  })

  // Real-time search
  $("#searchKeyword").on("input", () => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(performSearch, 500)
  })

  // Filter changes
  $(".filter-select").on("change", () => {
    performSearch()
  })

  // Price range filter
  $("#priceRange").on("input", function () {
    $("#priceValue").text("Rp " + formatNumber($(this).val()))
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(performSearch, 500)
  })

  // Load more results
  $("#loadMore").on("click", () => {
    loadMoreResults()
  })

  // Booking form submission
  $("#bookingForm").on("submit", (e) => {
    e.preventDefault()
    submitBooking()
  })

  // Service form submission
  $("#serviceForm").on("submit", (e) => {
    e.preventDefault()
    submitService()
  })

  // Image upload preview
  $(".image-upload").on("change", function () {
    previewImage(this)
  })

  // Rating stars
  $(".rating-stars").on("click", ".star", function () {
    setRating($(this))
  })

  // Confirm dialogs
  $(".confirm-action").on("click", (e) => {
    if (!confirm("Apakah Anda yakin ingin melakukan tindakan ini?")) {
      e.preventDefault()
    }
  })

  // Auto-hide alerts
  setTimeout(() => {
    $(".alert").fadeOut()
  }, 5000)
}

/**
 * Load initial data
 */
function loadInitialData() {
  // Load featured services on homepage
  if ($("#featuredServices").length) {
    loadFeaturedServices()
  }

  // Load categories
  if ($("#categoriesGrid").length) {
    loadCategories()
  }

  // Load dashboard data
  if ($(".dashboard-stats").length) {
    loadDashboardStats()
  }

  // Load notifications
  if ($("#notificationDropdown").length) {
    loadNotifications()
    setInterval(loadNotifications, 30000) // Refresh every 30 seconds
  }
}

/**
 * Initialize back to top button
 */
function initBackToTop() {
  const backToTop = $("#backToTop")

  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      backToTop.fadeIn()
    } else {
      backToTop.fadeOut()
    }
  })

  backToTop.on("click", () => {
    $("html, body").animate({ scrollTop: 0 }, 800)
    return false
  })
}

/**
 * Initialize search functionality
 */
function initSearch() {
  // Auto-complete for location
  if ($("#searchLocation").length) {
    $("#searchLocation").on("input", function () {
      const query = $(this).val()
      if (query.length >= 2) {
        // Implement location autocomplete here
        // This would typically connect to a location API
      }
    })
  }
}

/**
 * Perform search
 */
function performSearch() {
  if (isLoading) return

  isLoading = true
  currentPage = 1

  const formData = {
    keyword: $("#searchKeyword").val(),
    location: $("#searchLocation").val(),
    category: $("#categoryFilter").val(),
    min_price: $("#minPrice").val(),
    max_price: $("#maxPrice").val() || $("#priceRange").val(),
    sort: $("#sortBy").val(),
    page: currentPage,
  }

  // Show loading
  showLoading("#searchResults")

  $.ajax({
    url: "/ajax/search_services",
    method: "GET",
    data: formData,
    dataType: "json",
    success: (response) => {
      if (response.success) {
        displaySearchResults(response.data)
        updatePagination(response.pagination)
      } else {
        showError("Terjadi kesalahan saat mencari layanan")
      }
    },
    error: () => {
      showError("Terjadi kesalahan koneksi")
    },
    complete: () => {
      isLoading = false
      hideLoading("#searchResults")
    },
  })
}

/**
 * Display search results
 */
function displaySearchResults(services) {
  const container = $("#searchResults")
  let html = ""

  if (services.length === 0) {
    html = `
            <div class="col-12">
                <div class="text-center py-5">
                    <i class="fas fa-search fa-3x text-muted mb-3"></i>
                    <h4>Tidak ada layanan ditemukan</h4>
                    <p class="text-muted">Coba ubah kata kunci atau filter pencarian Anda</p>
                </div>
            </div>
        `
  } else {
    services.forEach((service) => {
      html += createServiceCard(service)
    })
  }

  container.html(html)

  // Animate cards
  container.find(".service-card").addClass("fade-in")
}

/**
 * Create service card HTML
 */
function createServiceCard(service) {
  const rating = service.avg_rating ? Number.parseFloat(service.avg_rating).toFixed(1) : "Baru"
  const reviewCount = service.total_reviews || 0
  const price = formatCurrency(service.price)

  return `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card service-card h-100">
                <div class="position-relative">
                    <img src="/assets/images/${service.image}" class="card-img-top" alt="${service.title}">
                    <span class="badge bg-primary position-absolute top-0 end-0 m-2">
                        ${service.category_name}
                    </span>
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${service.title}</h5>
                    <p class="card-text text-muted flex-grow-1">${truncateText(service.description, 100)}</p>
                    
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <div class="d-flex align-items-center">
                            <img src="/assets/images/${service.provider_image}" 
                                 class="rounded-circle me-2" width="24" height="24" alt="Provider">
                            <small class="text-muted">${service.provider_name}</small>
                        </div>
                        <div class="text-end">
                            <div class="service-rating">
                                ${createStarRating(service.avg_rating)}
                                <small class="text-muted">(${reviewCount})</small>
                            </div>
                        </div>
                    </div>
                    
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="service-price">${price}</div>
                        <a href="/service_detail?id=${service.id}" class="btn btn-primary btn-sm">
                            Lihat Detail
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `
}

/**
 * Load featured services
 */
function loadFeaturedServices() {
  $.ajax({
    url: "/ajax/get_featured_services",
    method: "GET",
    dataType: "json",
    success: (response) => {
      if (response.success) {
        displayFeaturedServices(response.data)
      }
    },
    error: () => {
      console.error("Failed to load featured services")
    },
  })
}

/**
 * Display featured services
 */
function displayFeaturedServices(services) {
  const container = $("#featuredServices")
  let html = ""

  services.forEach((service) => {
    html += createServiceCard(service)
  })

  container.html(html)
}

/**
 * Load categories
 */
function loadCategories() {
  $.ajax({
    url: "/ajax/get_categories",
    method: "GET",
    dataType: "json",
    success: (response) => {
      if (response.success) {
        displayCategories(response.data)
      }
    },
    error: () => {
      console.error("Failed to load categories")
    },
  })
}

/**
 * Display categories
 */
function displayCategories(categories) {
  const container = $("#categoriesGrid")
  let html = ""

  categories.forEach((category) => {
    html += `
            <div class="col-lg-2 col-md-4 col-6 mb-4">
                <a href="/search?category=${category.id}" class="category-card">
                    <div class="category-icon">
                        <i class="${category.icon}"></i>
                    </div>
                    <h6 class="mb-0">${category.name}</h6>
                </a>
            </div>
        `
  })

  container.html(html)
}

/**
 * Submit booking
 */
function submitBooking() {
  const form = $("#bookingForm")
  const submitBtn = form.find('button[type="submit"]')
  const originalText = submitBtn.html()

  // Validate form
  if (!validateBookingForm()) {
    return
  }

  // Show loading
  submitBtn.html('<span class="loading-spinner me-2"></span>Memproses...')
  submitBtn.prop("disabled", true)

  const formData = new FormData(form[0])

  $.ajax({
    url: "/ajax/create_booking",
    method: "POST",
    data: formData,
    processData: false,
    contentType: false,
    dataType: "json",
    success: (response) => {
      if (response.success) {
        showSuccess("Booking berhasil dibuat! Anda akan diarahkan ke halaman pembayaran.")
        setTimeout(() => {
          window.location.href = "/customer/bookings"
        }, 2000)
      } else {
        showError(response.message || "Terjadi kesalahan saat membuat booking")
      }
    },
    error: () => {
      showError("Terjadi kesalahan koneksi")
    },
    complete: () => {
      submitBtn.html(originalText)
      submitBtn.prop("disabled", false)
    },
  })
}

/**
 * Validate booking form
 */
function validateBookingForm() {
  let isValid = true
  const form = $("#bookingForm")

  // Clear previous errors
  form.find(".is-invalid").removeClass("is-invalid")
  form.find(".invalid-feedback").remove()

  // Validate required fields
  form.find("[required]").each(function () {
    if (!$(this).val()) {
      $(this).addClass("is-invalid")
      $(this).after('<div class="invalid-feedback">Field ini wajib diisi</div>')
      isValid = false
    }
  })

  // Validate date
  const bookingDate = $("#bookingDate").val()
  if (bookingDate && new Date(bookingDate) < new Date()) {
    $("#bookingDate").addClass("is-invalid")
    $("#bookingDate").after('<div class="invalid-feedback">Tanggal booking tidak boleh di masa lalu</div>')
    isValid = false
  }

  return isValid
}

/**
 * Load available time slots
 */
function loadAvailableTimeSlots(serviceId, date) {
  if (!serviceId || !date) return

  $.ajax({
    url: "/ajax/get_available_times",
    method: "GET",
    data: {
      service_id: serviceId,
      date: date,
    },
    dataType: "json",
    success: (response) => {
      if (response.success) {
        displayTimeSlots(response.data)
      }
    },
    error: () => {
      console.error("Failed to load time slots")
    },
  })
}

/**
 * Display time slots
 */
function displayTimeSlots(timeSlots) {
  const container = $("#timeSlots")
  let html = ""

  timeSlots.forEach((slot) => {
    const disabled = !slot.available ? "disabled" : ""
    const className = slot.available ? "btn-outline-primary" : "btn-outline-secondary"

    html += `
            <button type="button" class="btn ${className} time-slot me-2 mb-2" 
                    data-time="${slot.time}" ${disabled}>
                ${slot.time}
            </button>
        `
  })

  container.html(html)

  // Bind time slot selection
  $(".time-slot").on("click", function () {
    if (!$(this).prop("disabled")) {
      $(".time-slot").removeClass("btn-primary").addClass("btn-outline-primary")
      $(this).removeClass("btn-outline-primary").addClass("btn-primary")
      $("#bookingTime").val($(this).data("time"))
    }
  })
}

/**
 * Preview uploaded image
 */
function previewImage(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader()

    reader.onload = (e) => {
      const preview = $(input).siblings(".image-preview")
      if (preview.length) {
        preview.attr("src", e.target.result).show()
      } else {
        $(input).after(
          `<img src="${e.target.result}" class="image-preview img-thumbnail mt-2" style="max-width: 200px;">`,
        )
      }
    }

    reader.readAsDataURL(input.files[0])
  }
}

/**
 * Set rating stars
 */
function setRating(starElement) {
  const rating = starElement.data("rating")
  const container = starElement.closest(".rating-stars")

  container.find(".star").each(function (index) {
    if (index < rating) {
      $(this).removeClass("far").addClass("fas text-warning")
    } else {
      $(this).removeClass("fas text-warning").addClass("far")
    }
  })

  container.find('input[type="hidden"]').val(rating)
}

/**
 * Create star rating HTML
 */
function createStarRating(rating) {
  let html = ""
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      html += '<i class="fas fa-star text-warning"></i>'
    } else if (i === fullStars && hasHalfStar) {
      html += '<i class="fas fa-star-half-alt text-warning"></i>'
    } else {
      html += '<i class="far fa-star text-warning"></i>'
    }
  }

  return html
}

/**
 * Utility functions
 */
function formatCurrency(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount)
}

function formatNumber(number) {
  return new Intl.NumberFormat("id-ID").format(number)
}

function truncateText(text, length) {
  if (text.length <= length) return text
  return text.substring(0, length) + "..."
}

function showLoading(selector) {
  $(selector).html(`
        <div class="text-center py-5">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-2 text-muted">Memuat data...</p>
        </div>
    `)
}

function hideLoading(selector) {
  // Loading will be replaced by actual content
}

function showSuccess(message) {
  showAlert(message, "success")
}

function showError(message) {
  showAlert(message, "danger")
}

function showWarning(message) {
  showAlert(message, "warning")
}

function showAlert(message, type) {
  const alertHtml = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            <i class="fas fa-${type === "success" ? "check-circle" : type === "danger" ? "exclamation-circle" : "exclamation-triangle"} me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `

  // Remove existing alerts
  $(".alert").remove()

  // Add new alert at the top of main content
  $(".main-content").prepend(alertHtml)

  // Auto-hide after 5 seconds
  setTimeout(() => {
    $(".alert").fadeOut()
  }, 5000)

  // Scroll to top to show alert
  $("html, body").animate({ scrollTop: 0 }, 300)
}

// Export functions for global use
window.BookingJasa = {
  performSearch,
  loadAvailableTimeSlots,
  submitBooking,
  showSuccess,
  showError,
  showWarning,
  formatCurrency,
  formatNumber,
}
