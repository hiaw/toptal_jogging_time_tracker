describe('LoginViewTest', () => {
  before(async () => {
    await device.reloadReactNative()
  })

  // Login
  it('should show login page', async () => {
    await expect(element(by.label('Login'))).toBeVisible()
    await expect(element(by.label('Not yet registered?'))).toBeVisible()
  })

  it('should show register when click on no yet register', async () => {
    await element(by.label('Not yet registered?')).tap()
    await expect(element(by.label('Register'))).toBeVisible()
    await expect(element(by.label('Already registered?'))).toBeVisible()
  })

  it('should return to login page', async () => {
    await element(by.label('Already registered?')).tap()
    await expect(element(by.label('Login'))).toBeVisible()
  })
})
