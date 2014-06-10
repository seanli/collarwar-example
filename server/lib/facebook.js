function Facebook () {
  this.fb = Meteor.require('fbgraph');
  if (Meteor.user()) {
    this.accessToken = Meteor.user().services.facebook.accessToken;
    this.fb.setAccessToken(this.accessToken);
    this.options = {
      timeout: 3000,
      pool: { maxSockets: Infinity },
      headers: { connection: 'keep-alive' }
    }
    this.fb.setOptions(this.options);
  } else {
    throw new Meteor.Error(403, 'You must login to use Facebook Graph API.');
  }
}

Facebook.prototype.query = function (query, method) {
  var self = this;
  var method = (typeof method === 'undefined') ? 'get' : method;
  var data = Meteor.sync(function (done) {
    self.fb[method](query, function (err, res) {
      done(null, res);
    });
  });
  return data.result;
}

Meteor.methods({
  getUserFriends: function () {
    if (Meteor.user()) {
      var fb = new Facebook();
      var query = 'SELECT uid, first_name, last_name, mutual_friend_count FROM user WHERE uid in (SELECT uid2 FROM friend WHERE uid1=me()) ORDER BY mutual_friend_count DESC';
      return fb.query(query, 'fql')['data'];
    } else {
      return null;
    }
  },
});
