import React, { Component } from 'react';
import gql from 'graphql-tag';

class SongCreate extends Component {
	constructor(props) {
		super(props);

		this.state = { title: '' };
	}

	onSubmit(event) {
		event.preventDefault();
	}

	render() {
		return (
			<div>
				<h3>Create a New Song</h3>
				<form onSubmit={this.onSubmit.bind(this)}>
					<label htmlFor="title">Song Title:</label>
					<input
						onChange={(event) => this.setState({ title: event.target.value })}
						value={this.state.title}
						type="text"
						name="title"
					/>
				</form>
			</div>
		);
	}
}

const mutation = gql`
	mutation {
		addSong(title: "Dog Call") {
			id
			title
		}
	}
`;

export default SongCreate;
