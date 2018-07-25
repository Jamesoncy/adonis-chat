var AppConstants = {
    appName: 'test',
    url: window.API_URL,
    endpoint: '/api',
    companyInformation: {
      name: 'test',
      email: 'test@trest.com'
    }
};

angular.module('app').constant('AppConstants', AppConstants)