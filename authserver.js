module.exports = function(){
    var faker = require("faker");
    var _ = require("lodash");

    faker.locale = "es";

    return {
        usuarios: _.times(100, function (n) {
            return {
                id: n,
                nombre: faker.name.firstName(),
                apellido: faker.name.lastName(),
                username: faker.internet.userName(),
				email: faker.internet.email(),
				password: faker.internet.password()
        	}
        })
    }
}

/*
module.exports = function(){
	var jsonServer = require('json-server')

	var server = jsonServer.create() // Returns an Express server
	var router = jsonServer.router('tempdb.json') // Returns an Express router

	server.use(jsonServer.defaults) // logger, static and cors middlewares
	server.use(router) // Mount router on '/'

	server.listen(4400)
}
*/