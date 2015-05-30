var path = require('path');

var publicPath = path.join(__dirname, '../public');

/**
 * Handles a call to / and shows some text with links to login and registration
 */
exports.index = {
	auth: {
		mode: 'try',
		strategy: 'session'
	},
	handler: function (request, reply) {

		if (request.auth.isAuthenticated) {
			// The user is already logged in, redirect it to the hideout
			return reply.redirect('/dashboard');
		}

		var data =
		'<h1> Hi there! </h1>' +
		'<p> Would you like to <a href="login">login</a> or <a href="signup">signup</a>? </p>';

    return reply.view('index', {title: 'Main'});
	}
};

/**
 * Handles a call to /login and shows a login form
 */
exports.login = {
	auth: {
		mode: 'try',
		strategy: 'session'
	},
	handler: function (request, reply) {

		if (request.auth.isAuthenticated) {
			// The user is already logged in, redirect it to the hideout
			return reply.redirect('/dashboard');
		}

		var form =
		'<h1> Login </h1>' +
		'<form method="post" action="login">' +
		'	<p><input type="text"     name="email"    value="" placeholder="E-mail"></p>' +
		'	<p><input type="password" name="password" value="" placeholder="Password"></p>' +
		'	<p><input type="submit"   value="Login"></p>' +
		'</form>';

   		return reply.view('templates/login/index', {title: "Login"});
	}
};

/**
 * Handles a call to /signup and shows a registration form
 */
exports.signup = {
	auth: {
		mode: 'try',
		strategy: 'session'
	},
	handler: function (request, reply) {

		if (request.auth.isAuthenticated) {
			// The user is already logged in, redirect it to the hideout
			return reply.redirect('/dashboard');
		}

		var form =
		'<h1> Sign Up </h1>' +
		'<form method="post" action="signup">' +
		'	<p><input type="text" name="email"    value="" placeholder="E-mail"></p>' +
		'	<p><input type="password" name="password" value="" placeholder="Password"></p>' +
		'	<p><input type="submit" value="Sign Up"></p>' +
		'</form>';

    	return reply.view('templates/signup/index', {title: 'Sign Up'});
	}
};

/**
 * Handles a call to /dashboard and shows super secret stuff
 */
exports.secret = {
	auth: 'session',
	handler: function (request, reply) {
		var data =
		'<h1> Batman\'s super secret hideout! </h1>' +
		'<p> Welcome to this totally secret hideout, ' + request.auth.credentials.email + '. Would you like to <a href="logout">leave</a>? </p>';

    	return reply(data);
	}
};

exports.assets = {
	handler: {
		directory: {
			path: './public'
		}
	}
}
