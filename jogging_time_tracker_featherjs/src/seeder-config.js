module.exports = {
  services: [
    {
      count: 10,
      path: 'timelogs',
      template: {
        date: '{{date.past}}',
        distance: '{{random.number}}',
        duration: '{{random.number}}',
      },
    },
  ],
}
