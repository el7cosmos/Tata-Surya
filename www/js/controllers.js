var serviceUrl = 'https://www.googleapis.com/freebase/v1/topic';
var httpConfig = {
  method: 'GET',
  params: {
    lang: 'id'
  },
  cache: true
}

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlanetsCtrl', function($scope, $http) {
  $scope.planets = [];

  httpConfig.url = serviceUrl + '/en/solar_system';
  $http(httpConfig).success(function(data, status, headers, config) {
    $scope.planets = data.property['/astronomy/star_system/planets'].values;
  });
})

.controller('PlanetCtrl', function($scope, $stateParams, $http, $filter) {
  $scope.planet = {};
  $scope.planet.name = $stateParams.planetName;
  $scope.planet.img = 'img/planets/' + $stateParams.planetName + '.jpg';

  httpConfig.url = serviceUrl + '/m/' + $stateParams.planetId;
  $http(httpConfig).success(function(data, status, headers, config) {
    if (data.property['/common/topic/description']) {
      $scope.planet.description = data.property['/common/topic/description'].values[0].value;
    }

    $scope.items = [];

    if (data.property['/astronomy/celestial_object/category']) {
      $scope.items.push({
        title: 'Kategori',
        description: data.property['/astronomy/celestial_object/category'].values[0].text
      });
    };
    if (data.property['/astronomy/orbital_relationship/periapsis']) {
      $scope.items.push({
        title: 'Periapsis',
        description: $filter('number')(data.property['/astronomy/orbital_relationship/periapsis'].values[0].value) + ' km'
      });
    };
    if (data.property['/astronomy/orbital_relationship/aoapsis']) {
      $scope.items.push({
        title: 'Apoapsis',
        description: $filter('number')(data.property['/astronomy/orbital_relationship/aoapsis'].values[0].value) + ' km'
      });
    };
    if (data.property['/astronomy/orbital_relationship/orbit_eccentricity']) {
      $scope.items.push({
        title: 'Eksentrisitas',
        description: $filter('number')(data.property['/astronomy/orbital_relationship/orbit_eccentricity'].values[0].value)
      });
    };
    if (data.property['/astronomy/orbital_relationship/orbital_period']) {
      $scope.items.push({
        title: 'Periode orbit',
        description: data.property['/astronomy/orbital_relationship/orbital_period'].values[0].value + ' hari'
      });
    };
    if (data.property['/astronomy/orbital_relationship/mean_orbital_speed']) {
      $scope.items.push({
        title: 'Kecepatan orbit rata-rata',
        description: $filter('number')(data.property['/astronomy/orbital_relationship/mean_orbital_speed'].values[0].value) + ' km/detik'
      });
    };
    if (data.property['/astronomy/orbital_relationship/semi_major_axis']) {
      $scope.items.push({
        title: 'Sumbu semi-mayor',
        description: $filter('number')(data.property['/astronomy/orbital_relationship/semi_major_axis'].values[0].value) + ' km'
      });
    };
    if (data.property['/astronomy/orbital_relationship/inclination']) {
      $scope.items.push({
        title: 'Inklinasi',
        description: data.property['/astronomy/orbital_relationship/inclination'].values[0].value + '°'
      });
    };
    // if (data.property['/astronomy/orbital_relationship/orbited_by']) {
    //   $scope.orbited_by = data.property['/astronomy/orbital_relationship/orbited_by'].values[0].value + '°';
    // };
  });
});
