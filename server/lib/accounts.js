Accounts.config({
  oauthSecretKey: Base64.encode(process.env.SECRET)
});

Accounts.onCreateUser(function (options, user) {
  if (options.profile) {
    options.profile.facebookId = user.services.facebook.id;
    user.profile = options.profile;
    user.email = user.services.facebook.email;
    var userData = {
      facebookId: user.services.facebook.id,
      firstName: user.services.facebook.first_name,
      lastName: user.services.facebook.last_name,
      username: user.services.facebook.username,
      gender: user.services.facebook.gender,
      cost: 100,
      bank: 1000,
      boss: null,
      workers: []
    }
    UserData.insert(userData);
  }
  return user;
});
