import React, { Component } from "react";

export default class Table extends Component {
	constructor(props) {
		super(props);
		this.state = {
			people: [],
			isLoaded: false,
		};
	}

	componentDidMount() {
		fetch("https://randomuser.me/api/?results=3")
			.then((res) => res.json())
			.then((result) => {
				this.setState(() => ({
					people: result.results,
					isLoaded: true,
				}));
				console.log(this.state.people);
			});
	}

	render() {
		const { people, isLoaded } = this.state;
		if (isLoaded) {
			return (
				<div>
					Employees:
					<table>
						<tr>
							<th>Name</th>
							<th>Email</th>
						</tr>
						{people.map((person) => {
							return (
								<tr>
									<th>
										{person.name.first} {person.name.last}
									</th>
									<th>{person.email}</th>
								</tr>
							);
						})}
					</table>
				</div>
			);
		} else {
			return <div>Name: Loading...</div>;
		}
	}
}
