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

  // Buttons
  it('should click on the admin button', async () => {
    await element(by.label('Admin')).tap()
    await expect(element(by.label('admin@test.com'))).toBeVisible()
  })

  it('should click on the manager button', async () => {
    await element(by.label('Manager')).tap()
    await expect(element(by.label('manager@test.com'))).toBeVisible()
  })

  it('should click on the user1 button', async () => {
    await element(by.label('User1')).tap()
    await expect(element(by.label('user1@test.com'))).toBeVisible()
  })

  it('should click on the user2 button', async () => {
    await element(by.label('User2')).tap()
    await expect(element(by.label('user2@test.com'))).toBeVisible()
  })
})
