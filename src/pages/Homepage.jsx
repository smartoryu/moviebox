import React, { Component } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Modal, ModalBody, ModalFooter } from "reactstrap";

import { API_URL } from "../support/API_URL";
import Loading from "../components/Loading";

class Homepage extends Component {
  state = {
    loading: true,
    dataMovies: []
  };

  async componentDidMount() {
    try {
      var { data } = await Axios.get(`${API_URL}/movies`);
      this.setState({ dataMovies: data, loading: false });
    } catch (error) {
      console.log(error);
    }
  }

  renderMovies = () => {
    return this.state.dataMovies.map((val, index) => {
      return (
        <div key={index} className="card px-1">
          <div className="img-container radius">
            <Link to={``}>
              <img src={val.image} alt="..." className="card-img-top" />
            </Link>
          </div>
          <div className="card-body">
            <h5 className="card-title mx-auto bold">{val.title}</h5>
          </div>
        </div>
      );
    });
  };

  render() {
    if (this.state.loading) {
      // console.log("dataMovies", this.state.dataMovies);
      return <Loading />;
    }

    return (
      <div className="mx-3">
        {/* {console.log(this.props.AuthLogin, this.props.AuthPass)} */}
        {this.props.AuthDummy.length ? (
          <Modal centered size="sm" isOpen={this.props.AuthLogin}>
            <ModalBody>You should update your password first.</ModalBody>
            <ModalFooter>
              <button className="btn btn-dark btn-sm">
                <Link to="/change_password" style={{ textDecoration: "none", color: "inherit" }}>
                  Ok!
                </Link>
              </button>
            </ModalFooter>
          </Modal>
        ) : null}

        <div className="card-deck mt-5 mx-6 px-5">{this.renderMovies()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    AuthLogin: state.Auth.login,
    AuthDummy: state.Auth.dummy
  };
};

export default connect(mapStateToProps)(Homepage);
