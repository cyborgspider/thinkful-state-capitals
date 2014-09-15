angular
  .module('App', ['ui.router'])

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
      })

      .state('countries.country', {
        url: '/countries/:countryName',
        templateUrl: 'country-detail.html',
        controller: 'countryCtrl'
      });

  })

  .factory('countryRequest', function($http){
    return {
      getData: function(){
        return $http.get('http://api.geonames.org/countryInfoJSON?username=cyborgspider', {cache:true})

        // .then(function(result){
        //   return result.data.geonames;
        // });

        .success(function(data){
          return data;
        });
      }
    };
  })

  .controller('countryCtrl', function($scope, countryRequest){
    countryRequest.getData()

      // .then(function(data){
      //   $scope.countryData = data;
      // });

      .success(function(data){
        $scope.countryData = data.geonames;
      });

    $scope.loadDetailPage = function(country){
      console.log(country);
    };
  });
