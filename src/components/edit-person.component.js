import React, { Component } from "react";
import axios from "axios";

export default class EditPerson extends Component {
  constructor(props) {
    super(props);

    this.onChangeFamilyname = this.onChangeFamilyname.bind(this);
    this.onChangeForename = this.onChangeForename.bind(this);
    this.onChangeDic = this.onChangeDic.bind(this);
    this.onChangeDin = this.onChangeDin.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      familyname: "",
      forename: "",
      dic: 0,
      din: "",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/people/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          familyname: response.data.familyname,
          forename: response.data.forename,
          dic: response.data.dic,
          din: new Date(response.data.din),
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("http://localhost:5000/users/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map((user) => user.familyname),
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeFamilyname(e) {
    this.setState({
      familyname: e.target.value,
    });
  }

  onChangeForename(e) {
    this.setState({
      forename: e.target.value,
    });
  }

  onChangeDic(e) {
    this.setState({
      dic: e.target.value,
    });
  }

  onChangeDin(din) {
    this.setState({
      din: din,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      familyname: this.state.familyname,
      forename: this.state.forename,
      dic: this.state.dic,
      din: this.state.din,
    };

    console.log(exercise);

    axios
      .post(
        "http://localhost:5000/exercises/update/" + this.props.match.params.id,
        exercise
      )
      .then((res) => console.log(res.data));

    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Edit Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.familyname}
              onChange={this.onChangeFamilyname}
            >
              {this.state.users.map(function (user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.forename}
              onChange={this.onChangeForename}
            />
          </div>
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input
              type="text"
              className="form-control"
              value={this.state.dic}
              onChange={this.onChangeDic}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.din}
                onChange={this.onChangeDin}
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Edit Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
