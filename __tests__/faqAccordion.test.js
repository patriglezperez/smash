document.body.innerHTML = `
  <div id="faq-container">
    <div class="faq__item">
      <div class="faq__question" data-target="answer1">Question 1</div>
      <div id="answer1" class="faq__answer" style="max-height: 0;"></div>
    </div>
  </div>
`

function setupAccordionInteractions() {
  const faqQuestions = document.querySelectorAll('.faq__question')
  faqQuestions.forEach((question) => {
    question.addEventListener('click', () => {
      const target = question.getAttribute('data-target')
      const answer = document.getElementById(target)

      if (answer) {
        if (answer.style.maxHeight) {
          answer.style.maxHeight = null
        } else {
          answer.style.maxHeight = '100px'
        }
      }
    })
  })
}

test('Clicking a question expands its answer', () => {
  setupAccordionInteractions()

  const question = document.querySelector('.faq__question')
  const answer = document.getElementById('answer1')

  // Mock inicial
  jest.spyOn(answer.style, 'maxHeight', 'get').mockReturnValueOnce('')

  // Simula el clic para expandir
  question.click()
  jest.spyOn(answer.style, 'maxHeight', 'get').mockReturnValueOnce('100px')
  expect(answer.style.maxHeight).toBe('100px')

  // Simula el clic para contraer
  question.click()
  jest.spyOn(answer.style, 'maxHeight', 'get').mockReturnValueOnce('')
  expect(answer.style.maxHeight).toBe('')
})
