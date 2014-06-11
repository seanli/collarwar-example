Router.map(function () {
  this.route('home', {
    path: '/',
    template: 'home',
    waitOn: function () {
      return [Meteor.subscribe('userData')];
    }
  });
});
