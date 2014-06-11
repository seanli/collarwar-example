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
};

Facebook.prototype.query = function (query, method) {
  var self = this;
  var method = (typeof method === 'undefined') ? 'get' : method;
  var data = Meteor.sync(function (done) {
    self.fb[method](query, function (err, res) {
      done(null, res);
    });
  });
  return data.result;
};

var buildResultFriendObject = function (friend, user) {
  var boss = null;
  if (user.boss) {
    var bossData = Meteor.users.findOne({'services.facebook.id': user.boss});
    boss = {};
    boss.facebookId = bossData.services.facebook.id;
    boss.firstName = bossData.services.facebook.first_name;
    boss.lastName = bossData.services.facebook.last_name;
  }
  var isWorker = Meteor.user().services.facebook.id === user.boss;
  return {
    facebookId: user.facebookId,
    firstName: friend.first_name,
    lastName: friend.last_name,
    mutualFriendCount: friend.mutual_friend_count,
    cost: user.cost,
    boss: boss,
    isWorker: isWorker
  };
};

Meteor.methods({
  getUserFriends: function () {
    if (Meteor.user()) {
      var fb = new Facebook();
      var query = 'SELECT uid, first_name, last_name, username, mutual_friend_count FROM user WHERE uid in (SELECT uid2 FROM friend WHERE uid1=me()) ORDER BY mutual_friend_count DESC';
      var fbFriends = fb.query(query, 'fql')['data'];
      var result = [];
      _.each(fbFriends, function (friend) {
        var userDatum = UserData.findOne({facebookId: friend.uid});
        if (!userDatum) {
          var newUserDatum = {
            facebookId: friend.uid,
            firstName: friend.first_name,
            lastName: friend.last_name,
            username: friend.username,
            cost: 100,
            bank: 1000,
            boss: null,
            workers: []
          }
          userDatum = UserData.insert(newUserDatum);
          console.log(userDatum.firstName);
        }
        result.push(buildResultFriendObject(friend, userDatum));
      });
      return result;
    } else {
      return null;
    }
  },
});
