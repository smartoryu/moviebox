import React, { Component } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import { API_URL } from "../support/API_URL";
import { Modal, ModalBody } from "reactstrap";
// import { Redirect } from "react-router-dom";

class MovieDetails extends Component {
  state = {
    dataMovie: {},
    isTrailerOpen: false,
    isLogin: false,
    toLogin: false,
    toBuyTicket: false,
    content: ["genre", "producer", "director", "writer", "production", "casts"]
  };

  async componentDidMount() {
    // console.log(this.props);
    try {
      var { data } = await Axios.get(`${API_URL}/movies/${this.props.match.params.id}`);
      this.setState({ dataMovie: data });
    } catch (error) {
      console.log(error);
    }
  }

  toTitleCase = phrase => {
    return phrase
      .toLowerCase()
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  modalTrailer = () => {
    return (
      <Modal
        centered
        contentClassName="modal-trailer"
        size="lg"
        isOpen={this.state.isTrailerOpen}
        toggle={() => this.setState({ isTrailerOpen: false })}>
        <ModalBody centered className="p-0 bg-transparent">
          <div>
            <iframe
              title={`trailer-${this.state.dataMovie.title}`}
              width="700"
              height="393.75"
              src={this.state.dataMovie.trailer}
              alt="trailer not available"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </div>
        </ModalBody>
      </Modal>
    );
  };

  renderContent = () => {
    Object.keys(this.state.dataMovie).map((key, value) => {
      return (
        <div className="mt-1 d-flex">
          <div className="col-md-3 d-flex">
            <span className="mr-auto">{key}</span>
            <span className="ml-auto">:</span>
          </div>
          <div className="col-md-9 mr-auto">{value}</div>
        </div>
      );
    });
  };

  render() {
    const { dataMovie, content } = this.state;
    // let content = ["genre", "producer", "director", "writer", "production", "casts"];

    return (
      <div>
        {this.modalTrailer()}
        <div className="row d-flex mx-2">
          {/* SIDE POSTER */}
          <div className="col-md-3">
            <div className="d-flex flex-column">
              <div className="mx-auto d-block movielist">
                <div className="details-duration">{dataMovie.duration}</div>
                <img src={dataMovie.image} className="img-fluid img-thumbnail " alt="_poster" />
              </div>
              <button className="btn btn-warning w-50 mx-auto my-2">BUY TICKET</button>
              {/* <button className="btn btn-warning w-50 mx-auto my-2">TRAILER</button> */}
            </div>
          </div>

          {/* KEY OBJECT */}
          <div className="col-md-5">
            <div style={{ fontSize: "30px" }}>{dataMovie.title}</div>
            <table className="table table-borderless table-sm">
              <tbody>
                {content.map((key, id) => {
                  return (
                    <tr key={id} style={{}}>
                      <td>{this.toTitleCase(key)}</td>
                      <td>:</td>
                      <td>{dataMovie[`${key}`]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="text-center my-4">
              <div className="details-link">
                <span onClick={() => this.setState({ isTrailerOpen: true })}>Watch Trailer</span>
              </div>
            </div>

            <h5>SYNOPSIS</h5>
            <p>{dataMovie.synopsis}</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    AuthLogin: state.Auth.login,
    AuthRole: state.Auth.role
  };
};

export default connect(mapStateToProps)(MovieDetails);
