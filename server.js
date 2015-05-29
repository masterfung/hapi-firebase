var Hapi = require('hapi');
var Good = require('good');
var Routes = require('./routes');
var Config = require('./config');
// var User = require('./models/user').User;

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({ port: Config.server.port });

// Register the plugin
server.register(require('hapi-auth-cookie'), function (err) {
    if (err) {
        throw err;
    }

    // Set our strategy
    server.auth.strategy('session', 'cookie', {
        password: 'thepursuitofhapiness', // cookie secret
        cookie: 'session', // Cookie name
        isSecure: false, // required for non-https applications
        ttl: 24* 60 * 60 * 1000 // Set session to 1 day
    });
});

// Print some information about the incoming request for debugging purposes
server.ext('onRequest', function (request, reply) {
    console.log(request.path, request.query);
    return reply.continue();
});

//Routes
server.route(Routes.endpoints);

// Good logging & Start the server
server.register({
    register: Good,
    options: {
        reporters: [{
            reporter: require('good-console'),
            events: {
                response: '*',
                log: '*'
            }
        }]
    }
}, function (err) {
    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start(function () {
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});
