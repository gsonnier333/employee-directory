import React, { Component } from "react";

export default class Table extends Component {
	constructor(props) {
		super(props);
		this.state = {
			people: [],
			isLoaded: false,
			origList: [],
		};
		this.firstSort = this.firstSort.bind(this);
		this.lastSort = this.lastSort.bind(this);
		this.usFilter = this.usFilter.bind(this);
		this.unsort = this.unsort.bind(this);
	}

	componentDidMount() {
		fetch("https://randomuser.me/api/?results=30&seed=badcompany")
			.then((res) => res.json())
			.then((result) => {
				let copy = Array.from(result.results); //copy the results so we can store them as two separate lists in our state instead of one list being pointed to by two different properties
				this.setState(() => ({
					people: result.results,
					isLoaded: true,
					origList: copy,
				}));
			});
	}

	firstSort(e) {
		e.preventDefault();

		let sorted = this.state.people.sort((person1, person2) =>
			person1.name.first > person2.name.first ? 1 : -1
		);

		this.setState((state) => ({
			people: sorted,
			isLoaded: state.isLoaded,
			origList: state.origList,
		}));
	}

	lastSort(e) {
		e.preventDefault();

		let sorted = this.state.people.sort((person1, person2) =>
			person1.name.last > person2.name.last ? 1 : -1
		);

		this.setState((state) => ({
			people: sorted,
			isLoaded: state.isLoaded,
			origList: state.origList,
		}));
	}

	usFilter(e) {
		e.preventDefault();

		let filtered = this.state.people.filter(
			(person) => person.location.country === "United States"
		);
		this.setState((state) => ({
			people: filtered,
			isLoaded: state.isLoaded,
			origList: state.origList,
		}));
	}

	unsort(e) {
		e.preventDefault();

		let unsorted = Array.from(this.state.origList); //copy original list so we don't accidentally point to it with state.people

		this.setState((state) => ({
			people: unsorted,
			isLoaded: state.isLoaded,
			origList: state.origList,
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
						<button onClick={this.usFilter}>
							Show only US employees
						</button>
						<button onClick={this.unsort}>Undo sort/filter</button>
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
