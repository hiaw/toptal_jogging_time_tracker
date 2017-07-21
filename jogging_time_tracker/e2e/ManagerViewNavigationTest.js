xdescribe('ManagerViewNavigationTest', () => {
  before(async () => {
    await device.reloadReactNative()
  })

  // Login
  it('should show login page', async () => {
    await expect(element(by.label('Login'))).toBeVisible()
    await expect(element(by.label('Not yet registered?'))).toBeVisible()
  })

  it('should click on the manager button', async () => {
    await element(by.label('Manager')).tap()
    await expect(element(by.label('Login'))).toBeVisible()
  })

  // Main Page
  it('should login as manager', async () => {
    await element(by.label('Login')).tap()
    await expect(element(by.label('Show My Timelogs'))).toBeVisible()
    await expect(element(by.label('Add User'))).toBeVisible()
  })

  // Add User Form
  it('should open add time log', async () => {
    await element(by.label('Add User')).tap()
    await expect(element(by.label('Submit'))).toBeVisible()
    await expect(element(by.label('Cancel'))).toBeVisible()
  })

  it('should not be able to click submit', async () => {
    await element(by.label('Submit')).tap()
    await expect(element(by.label('Submit'))).toBeVisible()
    await expect(element(by.label('Cancel'))).toBeVisible()
  })

  it('should return when click cancel', async () => {
    await element(by.label('Cancel')).tap()
    await expect(element(by.label('Add User'))).toBeVisible()
  })

  // Show my time log
  it('should open add time log', async () => {
    await element(by.label('Show My Timelogs')).tap()
    await expect(element(by.label('Time Logs'))).toBeVisible()
  })
})
