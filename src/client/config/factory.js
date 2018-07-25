angular.module('app.factory', [])

angular.module('app.factory')
    .factory('GlobalFactory', ['$http', Factory])
    
function Factory($http) {
    var factory = {}
    factory.makeRequest = makeRequest
    factory.dataFactoryError = dataFactoryError
    
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
        .catch(dataFactoryError);
    }

    function dataFactoryError(errorResponse) {
        $log.error('XHR failed for HistoryService');
        $log.error(errorResponse);
        $state.go('login');
        return errorResponse;
    }
}