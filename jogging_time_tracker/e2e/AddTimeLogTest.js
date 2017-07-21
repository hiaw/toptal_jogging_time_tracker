xdescribe('Add Time Log', () => {
  before(async () => {
    await device.reloadReactNative()
  })

  // Login
  it('should login as user 1', async () => {
    await element(by.label('Login')).tap()
    await expect(element(by.label('Time Logs'))).toBeVisible()
    await expect(element(by.label('Add Time Log'))).toBeVisible()
  })

  // Add a Time log
  it('should open add time log', async () => {
    await element(by.label('Add Time Log')).tap()
    await expect(element(by.label('Time Log'))).toBeVisible()
  })

  // Date
  it('should open date selection', async () => {
    await element(by.id('timelog_form_date')).tap()
    await expect(element(by.label('Pick a date'))).toBeVisible()
  })

  it('should close date selection', async () => {
    await element(by.label('Confirm')).tap()
    await expect(element(by.label('Time Log'))).toBeVisible()
  })

  // Distance
  it('should enter distance and duration', async () => {
    await element(by.id('timelog_form_distance')).typeText('4000')
    await element(by.id('timelog_form_duration')).typeText('3600')
    await expect(element(by.label('Submit'))).toBeVisible()
  })

  // Submit
  it('should submit new time log', async () => {
    await element(by.label('Submit')).tap()
    await expect(element(by.label('Time Logs'))).toBeVisible()
    await expect(element(by.label('4 km'))).toBeVisible()
    await expect(element(by.label('4 km/h'))).toBeVisible()
    await expect(element(by.label('1:00:00'))).toBeVisible()
  })
})
