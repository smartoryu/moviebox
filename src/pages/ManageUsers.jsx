import React, { Component } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import { Table, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Loader from "react-loader-spinner";

import { API_URL } from "../support/API_URL";
import NotFound from "./NotFound";

class ManageUsers extends Component {
  state = {
    loading: false,
    dataUsers: [],
    userId: -1
  };

  async componentDidMount() {
    try {
      var { data } = await Axios.get(`${API_URL}/users`);
      this.setState({ dataUsers: data });
      setTimeout(() => this.setState({ loading: false }), 500);
    } catch (err) {
      console.log(err);
    }
  }

  /* ============================================================/
  /                        RENDER BODY                           /
  ==============================================================*/

  renderBody = () => {
    return this.state.dataUsers.map((val, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{val.username}</td>
          <td>{val.role}</td>
          <td>
            <button onClick={() => this.btnEdit(index)} className="btn btn-primary action">
              <FaRegEdit />
            </button>
            <button onClick={() => this.btnDelete(index)} className="btn btn-danger action">
              <FaRegTrashAlt />
            </button>
          </td>
        </tr>
      );
    });
  };

  /* ============================================================/
  /                           RENDER                             /
  ==============================================================*/

  render() {
    const { AuthLogin, AuthRole } = this.props;
    // console.log("state", this.state.dataUsers);

    if (AuthLogin && AuthRole === "admin") {
      return (
        <div>
          {this.state.loading ? (
            <center>
              <Loader className="align-content-center" type="TailSpin" color="#3f3f3f" height={50} width={50} />
            </center>
          ) : (
            <center>
              <h2 className="mt-4 mb-2">Manage Users</h2>
              <button
                // onClick={() => this.setState({ isAddOpen: true })}
                className="btn btn-warning font-smaller mb-3">
                Add New User
              </button>
              <Table className="text-center" style={{ width: 800 }}>
                <thead>
                  <tr>
                    <th style={{ width: 100 }}>#</th>
                    <th style={{ width: 300 }}>Username</th>
                    <th style={{ width: 200 }}>Role</th>
                    <th style={{ width: 200 }}>Action</th>
                  </tr>
                </thead>
                <tbody>{this.renderBody()}</tbody>
              </Table>
            </center>
          )}
        </div>
      );
    } else {
      return <NotFound />;
    }
  }
}

const mapStateToProps = state => {
  return {
    AuthLogin: state.Auth.login,
    AuthRole: state.Auth.role
  };
};

export default connect(mapStateToProps)(ManageUsers);
