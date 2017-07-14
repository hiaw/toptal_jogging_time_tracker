module.exports = {
  delete: true,
  services: [
    {
      count: 10,
      path: 'timelogs',
      template: {
        date: () => new Date(),
        distance: () => Math.random() * 10000,
        duration: () => Math.random() * 100,
      },
    },
  ],
}
