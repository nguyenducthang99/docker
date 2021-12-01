import React, { Component } from "react";
import Router from "next/router";

export default class _error extends Component {
  componentDidMount = () => {
    Router.push("/public/components");
  };

  render() {
    return <div />;
  }
}
