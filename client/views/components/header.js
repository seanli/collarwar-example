Template.header.helpers({
  self: function () {
    if (Meteor.user()) {
      return UserData.findOne({facebookId: Meteor.user().profile.facebookId});
    } else {
      return null;
    }
  }
});

Template.header.events({
  'click #button-facebook': function () {
    Meteor.loginWithFacebook({
      requestPermissions: ['email', 'publish_actions']
    }, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('SUCCESS');
      }
    });
  },
  'click #link-logout': function () {
    Meteor.logout(function () {});
  },
  'click .ui.dropdown': function () {
    $('.ui.dropdown').dropdown('show');
  }
});
