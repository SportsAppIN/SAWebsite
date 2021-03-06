#!/usr/bin/env node

const Config = require('./config');
const app = require('./app');
const debug = require('debug')(Config.projectConf.projectId);
const http = require('http');

app.set('port', Config.serverConf.port);

const server = http.createServer(app);

server.listen(Config.serverConf.port);
server.on('error', onErrorHandler);
server.on('listening', onServerListening);


function onErrorHandler(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	const bind = typeof Config.serverConf.port === 'string'
		? 'Pipe ' + Config.serverConf.port
		: 'Port ' + Config.serverConf.port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
	case 'EACCES':
		console.error(bind + ' requires elevated privileges');
		process.exit(1);
		break;
	case 'EADDRINUSE':
		console.error(bind + ' is already in use');
		process.exit(1);
		break;
	default:
		throw error;
	}
}

function onServerListening() {
	const addr = server.address();
	const bind = typeof addr === 'string'
		? 'pipe ' + addr
		: 'port ' + addr.port;
	debug('Listening on ' + bind);
}
