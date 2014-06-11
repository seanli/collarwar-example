Template.home.rendered = function() {
  populateClientFriends();
};

Template.home.helpers({
  friends: function () {
    return UserData.find();
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
