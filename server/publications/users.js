Meteor.publish('myData', function () {
  var user = Meteor.users.findOne(this.userId);
  if (user) {
    return UserData.find({facebookId: user.services.facebook.id});
  }
});

Meteor.publish('userData', function () {
  return UserData.find({}, {fields: {
    facebookId: 1,
    firstName: 1,
    lastName: 1,
    username: 1,
    cost: 1,
    boss: 1
  }});
});
