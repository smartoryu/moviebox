import React, { Component } from "react";
import Loader from "react-loader-spinner";

export default class Loading extends Component {
  render() {
    return (
      <div>
        <center>
          <Loader
            type="MutatingDots"
            color="#3f3f3f"
            height={100}
            width={100}
            // timeout={3000} //3 secs
          />
        </center>
      </div>
    );
  }
}
