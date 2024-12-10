const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

test('Valid email should return true', () => {
  expect(isValidEmail('test@example.com')).toBe(true)
})

test('Invalid email should return false', () => {
  expect(isValidEmail('invalid-email')).toBe(false)
})

test('Empty email should return false', () => {
  expect(isValidEmail('')).toBe(false)
})
