if (Meteor.isClient) {
  ClientFriends = new Meteor.Collection(null);
  populateClientFriends = function () {
    Meteor.call('getUserFriends', {}, function (err, friends) {
      if (err) {
        throw err;
      }
      console.log(friends);
      ClientFriends.remove({});
      _.each(friends, function (friend) {
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
        var normalizedFullName = friend.firstName.toLowerCase() + ' ' + friend.lastName.toLowerCase();
        if (normalizedFullName.indexOf(term.toLowerCase()) >= 0) {
          ClientFriends.insert(friend);
        }
      });
    });
  }
}
