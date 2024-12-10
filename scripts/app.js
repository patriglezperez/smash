window.addEventListener('DOMContentLoaded', function () {
  document.querySelector('body').classList.add('loaded')

  setupHamburgerMenu()
  initializeSwiper()
  initializeEmployees()
  renderOpinions(opinions, 'opinions-container')
  renderBenefits(benefitsData, 'benefits-container')
  setupPromoModal()
  onScrollInit($('.os-animation'))
  renderFAQ(faqData, 'faq-container')
  toggleTheme()
})

// Function to manage the hamburger menu
function setupHamburgerMenu() {
  const menuToggle = document.querySelector('.header__menu-toggle')
  const menuClose = document.querySelector('.header__menu-close')
  const menu = document.querySelector('.header__menu')
  const overlay = document.querySelector('.header__overlay')

  if (menuToggle && menu && overlay && menuClose) {
    menuToggle.addEventListener('click', () => {
      menu.classList.add('header__menu--active')
      overlay.classList.add('header__overlay--active')
      menuToggle.classList.add('hidden')
    })

    menuClose.addEventListener('click', () => {
      menu.classList.remove('header__menu--active')
      overlay.classList.remove('header__overlay--active')
      menuToggle.classList.remove('hidden')
    })

    overlay.addEventListener('click', () => {
      menu.classList.remove('header__menu--active')
      overlay.classList.remove('header__overlay--active')
    })
  } else {
    console.error('Hamburger menu items not found.')
  }
}

//Functions for displaying employees and their information
function renderEmployees(employees, containerId) {
  const container = document.getElementById(containerId)

  if (!container) {
    console.error(`Container with id "${containerId}" not found.`)
    return
  }

  employees.forEach((employee) => {
    const card = document.createElement('div')
    card.classList.add('employee-card')
    card.classList.add('border-bg')
    card.innerHTML = `
      <div class="employee-card__details">
        <img src="${employee.profilePicture}" alt="${employee.name}" class="employee-card__image">
      </div>
      <p class="employee-card__title" id="employee-title-${employee.name}">My position is:</p>
      <p class="employee-card__email" id="employee-info-${employee.name}">${employee.position}</p>

      <ul class="employee-card__values">
        <li class="employee-card__value employee-card__value--icon-person" data-info="name" data-name="${employee.name}">
          <div class="employee-card__icon-container">
            <img src="./src/images/icons/user--yellow.png" alt="user yellow" class="employee-card__icon employee-card__icon--yellow">
            <img src="./src/images/icons/user--purple.png" alt="user purple" class="employee-card__icon employee-card__icon--purple">
          </div>
        </li>
        <li class="employee-card__value employee-card__value--icon-mail" data-info="email" data-email="${employee.email}">
          <div class="employee-card__icon-container">
            <img src="./src/images/icons/mail--yellow.png" alt="mail yellow" class="employee-card__icon employee-card__icon--yellow">
            <img src="./src/images/icons/mail--purple.png" alt="mail purple" class="employee-card__icon employee-card__icon--purple">
          </div>
        </li>
        <li class="employee-card__value employee-card__value--icon-position" data-info="position" data-position="${employee.position}">
          <div class="employee-card__icon-container">
            <img src="./src/images/icons/home--yellow.png" alt="position yellow" class="employee-card__icon employee-card__icon--yellow">
            <img src="./src/images/icons/home--purple.png" alt="position purple" class="employee-card__icon employee-card__icon--purple">
          </div>
        </li>
        <li class="employee-card__value employee-card__value--icon-phone" data-info="phone" data-phone="${employee.phone}">
          <div class="employee-card__icon-container">
            <img src="./src/images/icons/phone--yellow.png" alt="phone yellow" class="employee-card__icon employee-card__icon--yellow">
            <img src="./src/images/icons/phone--purple.png" alt="phone purple" class="employee-card__icon employee-card__icon--purple">
          </div>
        </li>
      </ul>
    `

    container.appendChild(card)
  })

  setupHoverEvents(employees)
}

function setupHoverEvents(employees) {
  employees.forEach((employee) => {
    const card = document.querySelector(
      `.employee-card:has(img[src="${employee.profilePicture}"])`
    )
    const titleElement = card.querySelector('.employee-card__title')
    const infoElement = card.querySelector('.employee-card__email')
    const values = card.querySelectorAll('.employee-card__value')

    let fixedInfo = null

    titleElement.textContent = 'My position is:'
    infoElement.textContent = employee.position

    values.forEach((value) => {
      value.addEventListener('mouseover', () => {
        if (fixedInfo !== null) return

        const dataInfo = value.getAttribute('data-info')
        updateInfo(dataInfo, value, titleElement, infoElement)
      })

      value.addEventListener('mouseout', () => {
        if (fixedInfo !== null) return

        titleElement.textContent = 'My position is:'
        infoElement.textContent = employee.position
      })

      value.addEventListener('click', () => {
        const dataInfo = value.getAttribute('data-info')
        fixedInfo = dataInfo
        updateInfo(dataInfo, value, titleElement, infoElement)
      })
    })

    function updateInfo(dataInfo, value, titleElement, infoElement) {
      if (dataInfo === 'name') {
        titleElement.textContent = 'My name is:'
        infoElement.textContent = value.getAttribute('data-name')
      } else if (dataInfo === 'email') {
        titleElement.textContent = 'My email address is:'
        infoElement.textContent = value.getAttribute('data-email')
      } else if (dataInfo === 'position') {
        titleElement.textContent = 'My position is:'
        infoElement.textContent = value.getAttribute('data-position')
      } else if (dataInfo === 'phone') {
        titleElement.textContent = 'My phone number is:'
        infoElement.textContent = value.getAttribute('data-phone')
      }
    }

    document.addEventListener('click', (event) => {
      if (!card.contains(event.target)) {
        fixedInfo = null
        titleElement.textContent = 'My position is:'
        infoElement.textContent = employee.position
      }
    })
  })
}

function initializeEmployees() {
  if (typeof employees === 'undefined' || employees.length === 0) {
    console.error('No employees found in employees.js file')
    return
  }

  renderEmployees(employees, 'employees-container')
}

//Functions for managing the customer feedback and the slider
function initializeSwiper() {
  const swiper = new Swiper('.mySwiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  })

  return swiper
}

function renderOpinions(opinions, containerId) {
  const container = document.getElementById(containerId)

  if (!container) {
    console.error(`Container with id "${containerId}" not found.`)
    return
  }

  opinions.forEach((opinion) => {
    const slide = document.createElement('div')
    slide.classList.add('swiper-slide')

    slide.innerHTML = `
      <blockquote class="border-bg opinion">
        <p>"${opinion.text}"</p>
        <footer class="opinion__author">— ${opinion.author}</footer>
      </blockquote>
    `

    container.appendChild(slide)
  })

  initializeSwiper()
}

//Functions for bring the benefits infoematic and paint it in the DOM.
function renderBenefits(benefitsData, containerId) {
  const container = document.getElementById(containerId)

  if (!container) {
    console.error(`Container with id "${containerId}" not found.`)
    return
  }

  container.innerHTML = `
    <div class="benefits__list--buttons container">
      ${benefitsData.buttons
        .map(
          (button) =>
            `<button class="button button--secondary" data-group="${button.group}">${button.label}</button>`
        )
        .join('')}
    </div>
    <div class="benefits__list container"></div>
  `

  renderBenefitGroup(
    benefitsData.groups[benefitsData.buttons[0].group],
    container.querySelector('.benefits__list')
  )

  const buttons = container.querySelectorAll('.button[data-group]')
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const groupKey = button.getAttribute('data-group')
      renderBenefitGroup(
        benefitsData.groups[groupKey],
        container.querySelector('.benefits__list')
      )
    })
  })
}

function renderBenefitGroup(groupItems, listContainer) {
  listContainer.innerHTML = groupItems
    .map(
      (item) => `
      <div class="benefits__item benefits__item--active border-bg">
        <img src="${item.icon}" alt="${item.alt}" class="benefits__icon">
        <h3 class="benefits__item-title">${item.title}</h3>
        <p class="benefits__item-description">${item.description}</p>
      </div>
    `
    )
    .join('')
}

//Function to magane the modal and validate the email
function setupPromoModal() {
  const ctaButton = document.querySelector('.cta__button')
  const modal = document.getElementById('promo-modal')
  const closeModal = modal.querySelector('.modal__close')
  const promoForm = modal.querySelector('#promo-form')
  const emailInput = promoForm.querySelector('.modal__input')
  const errorMessage = promoForm.querySelector('.modal__error')
  const successMessage = modal.querySelector('#promo-success-message')
  const successImage = modal.querySelector('#promo-success-image')

  if (
    !ctaButton ||
    !modal ||
    !closeModal ||
    !promoForm ||
    !emailInput ||
    !errorMessage ||
    !successMessage ||
    !successImage
  ) {
    console.error('Modal elements not found.')
    return
  }

  ctaButton.addEventListener('click', (e) => {
    e.preventDefault()
    modal.style.display = 'flex'
    resetForm()
  })

  closeModal.addEventListener('click', closePromoModal)

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closePromoModal()
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      closePromoModal()
    }
  })

  // Validar correo al soltar una tecla
  emailInput.addEventListener('keyup', () => {
    if (isValidEmail(emailInput.value)) {
      emailInput.classList.remove('modal__input--error')
      errorMessage.style.display = 'none'
    } else {
      emailInput.classList.add('modal__input--error')
      errorMessage.style.display = 'block'
    }
  })

  // Validar al enviar el formulario
  promoForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = emailInput.value

    if (isValidEmail(email)) {
      successMessage.classList.remove('hidden')
      successImage.classList.remove('hidden')
      promoForm.style.display = 'none'
    } else {
      emailInput.classList.add('modal__input--error')
      errorMessage.style.display = 'block'
    }
  })

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  function resetForm() {
    emailInput.value = ''
    emailInput.classList.remove('modal__input--error')
    errorMessage.style.display = 'none'
    successMessage.classList.add('hidden')
    successImage.classList.add('hidden')
    promoForm.style.display = 'flex'
  }

  function closePromoModal() {
    modal.style.display = 'none'
    resetForm()
  }
}

//Get data for the accordion and FAQ accesibility
function renderFAQ(data, containerId) {
  const container = document.getElementById(containerId)

  if (!container) {
    console.error(`Container with id "${containerId}" not found.`)
    return
  }

  data.forEach((faq, index) => {
    const faqItem = document.createElement('div')
    faqItem.classList.add('faq__item')

    faqItem.innerHTML = `
      <div class="faq__question border-bg" tabindex="0" data-target="answer${index}" aria-expanded="false">
        <span>${faq.question}</span>
        <span class="faq__icon">+</span>
      </div>
      <div id="answer${index}" class="faq__answer" style="max-height: 0;" aria-hidden="true">
        <p>${faq.answer}</p>
      </div>
    `

    container.appendChild(faqItem)
  })

  setupAccordionInteractions()
}

function setupAccordionInteractions() {
  const faqQuestions = document.querySelectorAll('.faq__question')

  faqQuestions.forEach((question) => {
    question.addEventListener('click', () => toggleFAQ(question))
    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        toggleFAQ(question)
      }
    })
  })
}

function toggleFAQ(question) {
  const target = question.getAttribute('data-target')
  const answer = document.getElementById(target)

  if (answer) {
    const isExpanded = question.getAttribute('aria-expanded') === 'true'

    document.querySelectorAll('.faq__answer').forEach((item) => {
      item.style.maxHeight = null
      item.setAttribute('aria-hidden', 'true')
    })

    document.querySelectorAll('.faq__question').forEach((item) => {
      item.setAttribute('aria-expanded', 'false')
      item.classList.remove('faq__question--active')
    })

    if (!isExpanded) {
      answer.style.maxHeight = answer.scrollHeight + 'px'
      answer.setAttribute('aria-hidden', 'false')
      question.setAttribute('aria-expanded', 'true')
      question.classList.add('faq__question--active')
    }
  }
}

// Función para alternar entre Dark/Light Mode
function toggleTheme() {
  const themeToggleInput = document.querySelector('.theme__toggle input') // Captura el checkbox
  if (!themeToggleInput) {
    console.error('Theme toggle input not found')
    return
  }

  // Establece el tema inicial desde las preferencias guardadas
  const savedTheme = localStorage.getItem('theme') || 'light' // Por defecto será 'light'
  document.body.dataset.theme = savedTheme
  themeToggleInput.checked = savedTheme === 'dark' // Sincroniza el checkbox con el tema

  // Alterna entre temas al cambiar el estado del checkbox
  themeToggleInput.addEventListener('change', () => {
    const newTheme = themeToggleInput.checked ? 'dark' : 'light'
    document.body.dataset.theme = newTheme
    localStorage.setItem('theme', newTheme) // Guarda la preferencia en localStorage
    console.log(savedTheme)
  })
}

module.exports = {
  toggleTheme
}
