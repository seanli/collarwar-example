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
