const Dialogflow = require('dialogflow');
const Pusher = require('pusher');
const config = require('./keys/dialogflow');
const push = require('./keys/pusher');
const getMovieInfo = require('./routes/favMovies');

const projectId = 'turtletalk-wvtuce';
const sessionId = '87345';
const languageCode = 'en-US';

const setup = {
	credentials: {
		private_key: config.private_key,
		client_email: config.client_email
	}
};

const pusher = new Pusher({
	appId: push.PUSHER_APP_ID,
	key: push.PUSHER_APP_KEY,
	secret: push.PUSHER_APP_SECRET,
	cluster: push.PUSHER_APP_CLUSTER,
	useTLS: true
});
const sessionClient = new Dialogflow.SessionsClient(setup);

const sessionPath = sessionClient.sessionPath(projectId, sessionId);

const processMessage = message => {
	let { message: messageA } = message;
	console.log(messageA);
	const request = {
		session: sessionPath,
		queryInput: {
			text: {
				text: messageA,
				languageCode
			}
		}
	};

	sessionClient
		.detectIntent(request)
		.then(responses => {
			const result = responses[0].queryResult;
			let y = pusher.trigger('chat', 'chat-response', {
				message: result.fulfillmentText
			});

			// console.log(result.fulfillmentText);
			// let x = responses[0].queryText;
			// console.log(x);
			// console.log(responses[0]);
			console.log(responses[0].queryResult.parameters);
			return y;
		})
		.catch(err => {
			console.error('ERROR:', err);
		});
};

module.exports = processMessage;
