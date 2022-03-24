import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Person = (props) => (
  <tr>
    <td>{props.person.familyname}</td>
    <td>{props.person.forename}</td>
    <td>{props.person.dic}</td>
    <td>{props.person.din}</td>
    <td>
      <Link to={"/edit/" + props.person._id}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deletePerson(props.person._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class PeopleList extends Component {
  constructor(props) {
    super(props);

    this.deletePerson = this.deletePerson.bind(this);

    this.state = { people: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/people/")
      .then((response) => {
        this.setState({ people: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deletePerson(id) {
    axios.delete("http://localhost:5000/people/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      people: this.state.people.filter((el) => el._id !== id),
    });
  }

  personList() {
    return this.state.people.map((person) => {
      return (
        <Person
          person={person}
          deletePerson={this.deletePerson}
          key={person._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Logged People</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Family name</th>
              <th>Forename name</th>
              <th>ID Code</th>
              <th>ID Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.personList()}</tbody>
        </table>
      </div>
    );
  }
}
