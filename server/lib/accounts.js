Accounts.config({
  oauthSecretKey: Base64.encode(process.env.SECRET)
});

Accounts.onCreateUser(function (options, user) {
  if (options.profile) {
    options.profile.facebookId = user.services.facebook.id;
    options.profile.firstName = user.services.facebook.first_name;
    options.profile.lastName = user.services.facebook.last_name;
    options.profile.username = user.services.facebook.username;
    options.profile.gender = user.services.facebook.gender;
    user.profile = options.profile;
    user.price = 100;
    user.bank = 1000;
  }
  return user;
});
