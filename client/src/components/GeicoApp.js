/** Replace these with your own API keys, username and roomId from Chatkit  */

/*
const testToken = "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/dfaf1e22-2d33-45c9-b4f8-31f634621d24/token"
const instanceLocator = "v1:us1:dfaf1e22-2d33-45c9-b4f8-31f634621d24"
const roomId = 9806194
const username = 'perborgen'
*/
import React from 'react';
import './geicoapp.css';
import Axios from 'axios';
import Pusher from 'pusher-js';
import uuid from 'uuid';

class GeicoApp extends React.Component {
	constructor() {
		super();
		this.state = {
			messages: [
				{ id: uuid.v4(), senderId: 'AI', text: 'Welcome to Turtle Talk' }
			],
			lastMessage: '',
			userMessage: '',
			AITurn: false
		};
	}

	componentDidMount() {
		const pusher = new Pusher('148d05b7d4512ec48c54', {
			cluster: 'mt1',
			encrypted: true
		});

		const channel = pusher.subscribe('chat');
		channel.bind('chat-response', data => {
			const msg = {
				text: data.message,
				user: 'AI'
			};

			this.setState({
				messages: [
					...this.state.messages,
					{
						id: uuid.v4(),
						senderId: msg.user,
						text: msg.text
					}
				]
			});
		});
	}

	handleChange = e => {
		this.setState({ userMessage: e.target.value });
	};

	handleSubmit = e => {
		e.preventDefault();
		if (!this.state.userMessage.trim()) return;

		const msg = {
			id: uuid.v4(),
			senderId: 'Human',
			text: this.state.userMessage
		};

		this.setState({
			messages: [...this.state.messages, msg]
		});

		fetch('http://localhost:5000', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				message: this.state.userMessage
			})
		});

		this.setState({ userMessage: '' });
	};

	// sendMessage = text => {
	// 	let message = { id: uuid.v4(), senderId: 'User', text: text };
	// 	let messages = this.state.messages;
	// 	messages.push(message);

	// 	this.setState({
	// 		messages: messages,
	// 		lastMessage: text,
	// 		AITurn: true
	// 	});
	// };

	render() {
		const convo = () =>
			this.state.messages.map(message => {
				return (
					<div
						key={message.id}
						className={`message-${message.senderId} message`}
						// {console.log(message.senderId)}
						// className=''
					>
						<div>{message.senderId}</div>
						<div>{message.text}</div>
						<br />
					</div>
				);
			});

		return (
			<div className='app'>
				<Title />
				<div className='window'>
					<div className='conversations'>{convo()}</div>
					<div className='send-form'>
						<form onSubmit={this.handleSubmit} className='send-message-form'>
							<input
								value={this.state.userMessage}
								onChange={this.handleChange}
								placeholder='Type your message and press ENTER'
								autoFocus
								type='text'
							/>
						</form>
					</div>
				</div>
				{/* <MessageList
					roomId={this.state.roomId}
					messages={this.state.messages}
				/>
				<SendMessageForm sendMessage={this.sendMessage} /> */}
			</div>
		);
	}
}

// class MessageList extends React.Component {
// 	render() {
// 		return (
// 			<ul className='message-list'>
// 				{this.props.messages.map((message, index) => {
// 					return (
// 						<li key={message.id} className='message'>
// 							<div>{message.senderId}</div>
// 							<div>{message.text}</div>
// 						</li>
// 					);
// 				})}
// 			</ul>
// 		);
// 	}
// }

// class SendMessageForm extends React.Component {
// 	constructor() {
// 		super();
// 		this.state = {
// 			userMessage: ''
// 		};
// 		this.handleChange = this.handleChange.bind(this);
// 		this.handleSubmit = this.handleSubmit.bind(this);
// 	}

// 	handleChange = e => {
// 		this.setState({ userMessage: e.target.value });
// 	};

// 	// handleChange(e) {
// 	// 	this.setState({
// 	// 		message: e.target.value
// 	// 	});
// 	// }

// 	handleSubmit(e) {
// 		e.preventDefault();
// 		this.props.sendMessage(this.state.message);
// 		this.setState({
// 			message: ''
// 		});
// 	}

// 	render() {
// 		return (
// 			<form onSubmit={this.handleSubmit} className='send-message-form'>
// 				<input
// 					onChange={this.handleChange}
// 					value={this.state.message}
// 					placeholder='Type your message and press ENTER'
// 					type='text'
// 				/>
// 			</form>
// 		);
// 	}
// }

function Title() {
	return <p className='title'>Turtle Talk</p>;
}

export default GeicoApp;
