angular.module('app.layouts', [])
angular.module('app.services', [])
angular.module('app',
    ['ngCookies', 'templates', 'app.routes', 'app.factory', 'app.layouts', 'app.services']
)