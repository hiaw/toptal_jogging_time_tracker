describe('UserViewNavigationTest', () => {
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

  // Main Page
  it('should login as user 1', async () => {
    await element(by.label('Login')).tap()
    await expect(element(by.label('Time Logs'))).toBeVisible()
    /* await expect(element(by.label('Week'))).toBeVisible()*/
    await expect(element(by.label('Filter'))).toBeVisible()
    await expect(element(by.label('Add Time Log'))).toBeVisible()
    await expect(element(by.label('Open Statistics'))).toBeVisible()
  })

  // Filter
  it('should show filter', async () => {
    await element(by.label('Filter')).tap()
    await expect(element(by.label('OK'))).toBeVisible()
  })

  it('should close filter', async () => {
    await element(by.label('OK')).tap()
    await expect(element(by.label('Time Logs'))).toBeVisible()
  })

  // Add Time log Form
  it('should open add time log', async () => {
    await element(by.label('Add Time Log')).tap()
    await expect(element(by.label('Time Log'))).toBeVisible()
    await expect(element(by.label('Submit'))).toBeVisible()
    await expect(element(by.label('Cancel'))).toBeVisible()
  })

  it('should not be able to click submit', async () => {
    await element(by.label('Submit')).tap()
    await expect(element(by.label('Time Log'))).toBeVisible()
    await expect(element(by.label('Submit'))).toBeVisible()
    await expect(element(by.label('Cancel'))).toBeVisible()
  })

  it('should return when click cancel', async () => {
    await element(by.label('Cancel')).tap()
    await expect(element(by.label('Time Logs'))).toBeVisible()
  })

  // Statistics
  it('should show statistics', async () => {
    await element(by.label('Open Statistics')).tap()
    await expect(element(by.label('Statistics'))).toBeVisible()
    await expect(element(by.label('Record Speed'))).toBeVisible()
    await expect(element(by.label('Last Week Comparison'))).toBeVisible()
    await expect(element(by.label('Greatest Distance Day'))).toBeVisible()
    await expect(element(by.label('Cumulative'))).toBeVisible()
  })
})
