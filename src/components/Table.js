import React, { Component } from "react";

export default class Table extends Component {
	constructor(props) {
		super(props);
		this.state = {
			people: [],
			isLoaded: false,
		};
		this.firstSort = this.firstSort.bind(this);
		this.lastSort = this.lastSort.bind(this);
	}

	componentDidMount() {
		fetch("https://randomuser.me/api/?results=10&seed=fakecompany")
			.then((res) => res.json())
			.then((result) => {
				this.setState(() => ({
					people: result.results,
					isLoaded: true,
				}));
			});
	}

	firstSort(e) {
		e.preventDefault();

		this.setState((state) => ({
			people: state.people.sort((person1, person2) =>
				person1.name.first > person2.name.first ? 1 : -1
			),
			isLoaded: true,
		}));
	}

	lastSort(e) {
		e.preventDefault();

		this.setState((state) => ({
			people: state.people.sort((person1, person2) =>
				person1.name.last > person2.name.last ? 1 : -1
			),
			isLoaded: true,
		}));
	}

	render() {
		const { people, isLoaded } = this.state;

		if (isLoaded) {
			console.log(people);
			return (
				<div>
					<div>
						<button onClick={this.firstSort}>
							Sort by first name
						</button>
						<button onClick={this.lastSort}>
							Sort by last name
						</button>
					</div>
					Employees:
					<table>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Date of Birth</th>
						</tr>
						{people.map((person) => {
							return (
								<tr>
									<th>
										{person.name.first} {person.name.last}
									</th>
									<th>{person.email}</th>
									<th>
										{new Date(
											person.dob.date
										).toLocaleDateString()}
									</th>
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
