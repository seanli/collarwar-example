if (Meteor.isClient) {
  ClientFriends = new Meteor.Collection(null);
  populateClientFriends = function () {
    Meteor.call('getUserFriends', {}, function (err, friends) {
      if (err) {
        throw err;
      }
      ClientFriends.remove({});
      _.each(friends.slice(0, 10), function (friend) {
        ClientFriends.insert(friend);
      });
    });
  };
  searchClientFriends = function (term) {
    Meteor.call('getUserFriends', {}, function (err, friends) {
      if (err) {
        throw err;
      }
      ClientFriends.remove({});
      _.each(friends, function (friend) {
        var normalizedFullName = friend.first_name.toLowerCase() + ' ' + friend.last_name.toLowerCase();
        if (normalizedFullName.indexOf(term.toLowerCase()) >= 0) {
          ClientFriends.insert(friend);
        }
      });
    });
  }
}
