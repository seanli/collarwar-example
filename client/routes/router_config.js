Router.configure({
  layoutTemplate: "layout",
  notFoundTemplate: "notFound",
  loadingTemplate: "loading",
  waitOn: function () {
    return [Meteor.subscribe('myData')];
  }
});
