import React, { Component } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default class EditPerson extends Component {
  params = useParams();

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
    console.log(this.props);
    axios
      .get("http://localhost:5000/people/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          familyname: response.data.familyname,
          forename: response.data.forename,
          dic: response.data.dic,
          din: response.data.din,
        });
      })
      .catch(function (error) {
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

  onChangeDin(e) {
    this.setState({
      din: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const person = {
      familyname: this.state.familyname,
      forename: this.state.forename,
      dic: this.state.dic,
      din: this.state.din,
    };

    console.log(person);

    axios
      .post(
        "http://localhost:5000/people/update/" + this.props.match.params.id,
        person
      )
      .then((res) => console.log(res.data));

    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Edit Person Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Family name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.familyname}
              onChange={this.onChangeFamilyname}
            />
          </div>
          <div className="form-group">
            <label>Fore name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.forename}
              onChange={this.onChangeForename}
            />
          </div>
          <div className="form-group">
            <label>ID code: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.dic}
              onChange={this.onChangeDic}
            />
          </div>
          <div className="form-group">
            <label>ID number: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.din}
              onChange={this.onChangeDin}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Edit Person Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
