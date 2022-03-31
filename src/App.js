import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route } from "react-router-dom";

import PeopleList from "./components/people-list.component";
// import EditPerson from "./components/edit-person.component";
// import Error from "./Error";
// {/* <Route path="/edit/:id" component={<EditPerson />} /> */}
// {/* <Route path="*" component={<Error />} /> */}

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={<PeopleList />} />
    </BrowserRouter>
    // <p>Hello</p>
  );
}

export default App;
