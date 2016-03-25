var Twitch = require("twitch-sdk")

$("#menu-toggle").click(function(e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");
});

var twitchClientID = 'syycpa74n97fjuwsqnx7czskwu64k8x'

Twitch.init({clientId: 'syycpa74n97fjuwsqnx7czskwu64k8x', electron: true}, function(error, status) {
  if (error) {
    // error encountered while loading
    console.log(error);
  }
  // the sdk is now loaded
  if (status.authenticated) {
    console.log(status)
  }
});

angular
.module('App', ['ngRoute'])
.factory('Twitch', function() {
  return Twitch
})
.controller("MainCtrl", function($scope, $sce, Twitch) {

  var userList = ['rumbleroyale', 'suzzysaur', 'garenaphesports','glocogaming','halo','moonducktv','twitch']

  $scope.playerToWatch = 'halo'
  $scope.userToLook = null
  $scope.twitchEmbed = 'http://player.twitch.tv/?channel='+$scope.playerToWatch+'&html5'
  $scope.twitchChatEmbed = 'http://www.twitch.tv/'+$scope.playerToWatch+'/chat'
  $scope.defaultPlayer = $sce.trustAsResourceUrl($scope.twitchEmbed)
  $scope.defaultChat = $sce.trustAsResourceUrl($scope.twitchChatEmbed)

  $scope.userList = []

  $scope.onlineList = []
  $scope.offlineList = []

  for ( i=0; i<userList.length;i++) {
    Twitch.api({method: '/users/'+userList[i]}, function(error, user) {
      $scope.userList.push()
      $scope.userToLook = user.name
      $scope.checkOnlineStatus(user)
      $scope.$apply()
    });
  }

  $scope.checkOnlineStatus = function(user) {
      // var combinedUserList = userList.join(',')
      Twitch.api({method: '/streams/'+$scope.userToLook}, function(error, streamObject) {
        if(streamObject.stream)
          { 
            $scope.onlineList.push(user)
          }
        else
          { 
            $scope.offlineList.push(user)
          }

        $scope.$apply()
      });
    }

    $scope.showStream = function(name) {
      $scope.twitchEmbed = 'http://player.twitch.tv/?channel='+name+'&html5'
      $scope.twitchChatEmbed = 'http://www.twitch.tv/'+name+'/chat'
      $scope.defaultPlayer = $sce.trustAsResourceUrl($scope.twitchEmbed)
      $scope.defaultChat = $sce.trustAsResourceUrl($scope.twitchChatEmbed)
    }

    $scope.twitchLogin = function() {
      console.log('Twitch Login')
      Twitch.login({
        scope: ['user_read', 'channel_read']
      });
    }
  })