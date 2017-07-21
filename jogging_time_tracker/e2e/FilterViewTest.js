xdescribe('FilterViewTest', () => {
  before(async () => {
    await device.reloadReactNative()
  })

  // Login
  it('should show login page', async () => {
    await expect(element(by.label('Login'))).toBeVisible()
  })

  // Main Page
  it('should login as user 1', async () => {
    await element(by.label('Login')).tap()
    await expect(element(by.label('Filter'))).toBeVisible()
  })

  // Filter
  it('should show filter', async () => {
    await element(by.label('Filter')).tap()
    await expect(element(by.label('OK'))).toBeVisible()
  })

  it('should open from date selection', async () => {
    await element(by.id('timelog_filter_fromdate')).tap()
    await expect(element(by.label('Pick a date'))).toBeVisible()
  })

  it('should close date selection', async () => {
    await element(by.label('Confirm')).tap()
    await expect(element(by.label('OK'))).toBeVisible()
  })

  it('should open to date selection', async () => {
    await element(by.id('timelog_filter_todate')).tap()
    await expect(element(by.label('Pick a date'))).toBeVisible()
  })

  it('should close date selection', async () => {
    await element(by.label('Confirm')).tap()
    await expect(element(by.label('OK'))).toBeVisible()
  })

  it('should close filter', async () => {
    await element(by.label('OK')).tap()
    await expect(element(by.label('Time Logs'))).toBeVisible()
  })
})
