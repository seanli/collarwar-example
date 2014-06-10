if (ServiceConfiguration.configurations.find().count() === 0) {
  console.log('Setting up Facebook credentails.');
  ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: process.env.FACEBOOK_APP_ID,
    secret: process.env.FACEBOOK_APP_SECRET
  });
}
