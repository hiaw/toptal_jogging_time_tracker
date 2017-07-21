describe('Add Time Log', () => {
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
  })
})
