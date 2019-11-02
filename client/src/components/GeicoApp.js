
import React from 'react';
import './geicoapp.css';
import Axios from 'axios';
import Pusher from 'pusher-js';
import uuid from 'uuid';
import TheMovieDB from '../TheMovieDB';
import { runInThisContext } from 'vm';
class GeicoApp extends React.Component {

	/* 
	 * 
	 */ 

	constructor() {
		super();
		let movieStateEnum = {
			favMovie : "favMovie", addingFavMovie : "addingFavMovie", readingFavoriteInput : "readingFavoriteInput", iterateMovies : "iterateMovies", 
			recommendingMovie : "recommendingMovie", handingRecommendationResponse : "handingRecommendationResponse"
		}
		this.state = { 
			movieStateEnum : movieStateEnum, 
			messages: [
				{ id: uuid.v4(), senderId: 'AI', text: 'Welcome to Turtle Talk!' }, 
				{ id: uuid.v4(), senderId: 'AI', text: "How are you feeling today?"}
			],	
			lastMessage: '',
			userMessage: '',
			AITurn: false, 
			movieState : movieStateEnum.favMovie, 
			favoriteMovies : [], 
			leastFavoriteMovies : [], 
			moviesToConsiderRecommending : [],  
			temporaryFavoriteMovies : [],
			genres : [ {
				"id": 28,
				score: 10
			  },
			  {
				"id": 12,
				score: 10
			  },
			  {
				"id": 16,
				score: 10
			  },
			  {
				"id": 35,
				score: 10
			  },
			  {
				"id": 80,
				score: 10
			  },
			  {
				"id": 99,
				score: 10
			  },
			  {
				"id": 18,
				score: 10
			  },
			  {
				"id": 10751,
				score: 10
			  },
			  {
				"id": 14,
				score: 10
			  },
			  {
				"id": 36,
				score: 10
			  },
			  {
				"id": 27,
				score: 10
			  },
			  {
				"id": 10402,
				score: 10
			  },
			  {
				"id": 9648,
				score: 10
			  },
			  {
				"id": 10749,
				score: 10
			  },
			  {
				"id": 878,
				score: 10
			  },
			  {
				"id": 10770,
				score: 10
			  },
			  {
				"id": 53,
				score: 10
			  },
			  {
				"id": 10752,
				score: 10
			  },
			  {
				"id": 37,
				score: 10
			  }]
		};
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

		this.setState({ 
			lastMessage: this.state.userMessage, 
			userMessage: "", 
			AITurn : true 
		 }); 
		 
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
	handleAI = async () => { 
		console.log(this.state.movieState);
		if (this.state.movieState === this.state.movieStateEnum.favMovie) 
		{ 
			var mv = new TheMovieDB();
			let response = await mv.getMoviesByKeyword(this.state.lastMessage); 
			let favoriteMovie = response.data.results  

			if (favoriteMovie.length === 1) 
			{ 
				console.log(favoriteMovie[0].id);
				var newFavoriteMovies = this.state.favoriteMovies; 
				newFavoriteMovies.push(favoriteMovie[0].id)

				this.setState({ 
					favoriteMovies : newFavoriteMovies, 
					movieState : this.state.movieStateEnum.addingFavMovie
				})
			} 
			else if (favoriteMovie.length > 1)  
			{ 
				let newMessages = [] 
				console.log(favoriteMovie);
				favoriteMovie.forEach((element, index) => {
					let message = { id: uuid.v4(), senderId: 'AI', text: `#${index}: ${element.name}` } 
					newMessages.push(message);
				}); 

				let message = {id: uuid.v4(), senderId: 'AI', text: `Enter the number of the Movie that most matches your favorite, or enter -1 if you don't see the title of your favorite movie!` } 
				newMessages.push(message); 
				let messages = this.state.messages.concat(newMessages); 
				console.log(messages);
				this.setState({ 
					messages : messages, 
					movieState : this.state.movieStateEnum.readingFavoriteInput, 
					temporaryFavoriteMovies : favoriteMovie, 
					AITurn : false
				});
			} 
			else 
			{ 
				console.log("Whoops")
			}
		}  
		else if (this.state.movieState === this.state.movieStateEnum.readingFavoriteInput) { 
			if (this.state.lastMessage === "-1") 
			{ 

			} 
			else 
			{ 
				try { 
					let index = parseInt(this.state.lastMessage); 
					let favoriteMovie = this.state.temporaryFavoriteMovies[index]; 
					
					console.log(favoriteMovie); 

					let movies = this.state.favoriteMovies 
					movies.push(favoriteMovie.id);
					this.setState({ 
						favoriteMovies : movies, 
						temporaryFavoriteMovies : [], 
						movieState : this.state.movieStateEnum.addingFavMovie	
					})
				} 
				catch { 
					let message = {id: uuid.v4(), senderId: 'AI', text: `Sorry we were unable to find your favorite movie!` } 
					console.log("sheesh")
					/* 
						Add this message to the messages list in state 
						Change the state to the popular / highest rated / newest movies flow 
					*/
				}
			}
		}
		else if (this.state.movieState === this.state.movieStateEnum.addingFavMovie) { 
			let favoriteMovieId = this.state.favoriteMovies[this.state.favoriteMovies.length - 1]
			
			console.log(favoriteMovieId);
			var mv = new TheMovieDB();
			let response = await mv.getMovieInformation(favoriteMovieId); 
			 
			let movieInformation = response.data;  
			let updatedGenres = this.state.genres

			response.data.genres.forEach(data => { 
				for (let i = 0; i < updatedGenres.length; i++) { 
					
				}
			})
		
			console.log(response);
		} 
		else if (this.state.movieState === this.state.movieStateEnum.iterateMovies) { //sort 

		} 
		else if (this.state.movieState === this.state.movieStateEnum.recommendingMovie) { 

		} 
		else if (this.state.movieState === this.state.movieStateEnum.handingRecommendationResponse) { 

		} 
		else { 
			alert("Fuck"); //change this eventually 
		}
	}

	render() { 	 
		if (this.state.AITurn) { 
			this.handleAI();
		}
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
