angular.module('app.factory')
    .factory('IndexFactory', ['$http', 'GlobalFactory', Factory])

function Factory($http, GlobalFactory) {
    var factory = {}
    factory.getRequest = getApiSample
    
    return factory

    function makeRequest( method, url, callback, requestBody = {}) {
        return $http({
            'url': url,
            'method': method,
            'data': requestBody,
            ignoreLoadingBar: true
        })
        .then(function(response) {
            callback(response.data);
        })
        .catch(GlobalFactory.dataFactoryError);
    }

    function getApiSample(callback) {
        GlobalFactory.makeRequest('GET','https://reqres.in/api/users?page=2', callback, {})
    }
}