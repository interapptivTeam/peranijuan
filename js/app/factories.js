//AngularJS Factories

app.factory('NationalBudget', function ($resource) {
    var MyResource = $resource('queries.php',{
        query:'@query',
        department_code:'@department_code',
        year:'@year',
        limit:'@limit'
    }, { 
        search: {
            method: 'GET',
            params: {
                query: '@query',
		        department_code:'@department_code',
		        year:'@year',
		        limit:'@limit'
            }
        }
    }); 
    return MyResource;
});

app.factory('QueryFactory', function ($resource) {
    return $resource('queries.php', {}, {
        query:  {method: 'GET', isArray:false}
    });
});