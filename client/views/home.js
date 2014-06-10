Template.home.rendered = function() {
  populateClientFriends();
};

Template.home.helpers({
  friends: function () {
    return ClientFriends.find().fetch();
  }
});

Template.home.events({
  'click #button-search-friends': function () {
    var term = $('#input-search-friends').val();
    searchClientFriends(term);
  },
  'submit #form-search-friends': function (e) {
    var term = $('#input-search-friends').val();
    searchClientFriends(term);
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
});
