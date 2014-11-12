/**
* Games.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

  	numPlayers: {
  		type: 'integer'
  	},

  	round: {
  		type: 'integer',
      defaultsTo: 0
  	},

  	currentUserTurn: {
  		type: 'integer',
      defaultsTo: 1
  	},

  	startDate: {
  		type: 'datetime'
  	},

  	endDate: {
  		type: 'datetime'
  	},

  	winner: {
  		type: 'integer'
  	},

    password: {
      type: 'string'
    },

    tempGameID: {
      type: 'integer'
    },

    inProgress: {
      type: 'boolean',
      defaultsTo: false
    }
  },

  beforeCreate: function (values, cb) {
    values.startDate = new Date().toISOString();
    var players = values.players.split(',').map(Number);

    if (players.length != values.numPlayers) {
      //Make sure submitted players are present and same as numPlayers
      return cb(new Error('Player Count Is Not Same As Submitted Players'));
    }

    //Add tempGameID to add realGameID to GameUsersLink in afterCreate
    values.tempGameID = Math.floor((Math.random() * 1000000) + 1000000);
    for (i = 0; i < players.length; i++) {
        GamesUsersLink.create({
          gameID: values.tempGameID,
          playerID: players[i]
        }).exec(function(err, gamesUsersLink) {
          //console.log(gamesUsersLink);
        });
    }
    //console.log(values);
    //console.log(players);
    cb();
  },

  afterCreate: function (values, cb) {
    GamesUsersLink.update({gameID: values.tempGameID}, {gameID: values.id}).exec(function afterwards(err, update) {
      if (err) {
        return;
      }
      //console.log(update);
    });
    //console.log(values);
    cb();
  }
};
