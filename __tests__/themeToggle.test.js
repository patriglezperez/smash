const { toggleTheme } = require('../scripts/app')

beforeEach(() => {
  document.body.innerHTML = `
    <div class="theme__toggle container">
      <label class="switch">
        <input type="checkbox">
        <span class="slider"></span>
      </label>
    </div>
  `
})

test('Toggles theme from light to dark', () => {
  document.body.dataset.theme = 'light'
  window.toggleTheme() // Llama a la función desde window
  const themeToggleInput = document.querySelector('.theme__toggle input')
  themeToggleInput.checked = true // Simula el cambio a "dark"
  themeToggleInput.dispatchEvent(new Event('change')) // Simula el evento
  expect(document.body.dataset.theme).toBe('dark')
})

test('Toggles theme from dark to light', () => {
  document.body.dataset.theme = 'dark'
  window.toggleTheme() // Llama a la función desde window
  const themeToggleInput = document.querySelector('.theme__toggle input')
  themeToggleInput.checked = false // Simula el cambio a "light"
  themeToggleInput.dispatchEvent(new Event('change')) // Simula el evento
  expect(document.body.dataset.theme).toBe('light')
})
