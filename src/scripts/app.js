angular.module('App', ['ui.router'])

  .config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'home.html'
      })

      .state('countries', {
        url: '/countries',
        templateUrl: 'countries.html',
        controller: 'countryCtrl'
      });

  })

  .factory('countryRequest', function($http){
      var countryData = [];

      $http.get('http://api.geonames.org/countryInfoJSON?username=cyborgspider', {cache:true})

        .success(function(data){
          countryData = data.geonames;
          return countryData;
        })

        .error(function(){
          return console.log('Error retrieving data');
        });
  })

  .controller('countryCtrl', function($scope, countryRequest){
    $scope.countryData = countryRequest;
  });
