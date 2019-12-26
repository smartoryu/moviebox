import React, { Component } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import { SuspendThunkAction } from "../redux/action";
import { Table, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

import { API_URL } from "../support/API_URL";
import Loader from "react-loader-spinner";
import Swal from "sweetalert2";
import NotFound from "./NotFound";

class ManageUsers extends Component {
  state = {
    loading: false,
    dataUsers: [],
    userId: -1,
    indexEdit: -1,
    isEditOpen: false,
    tooltipOpen: false
  };

  async componentDidMount() {
    try {
      var { data } = await Axios.get(`${API_URL}/users?role=user`);
      this.setState({ dataUsers: data });
      setTimeout(() => this.setState({ loading: false }), 500);
    } catch (err) {
      console.log(err);
    }
  }

  /* ============================================================/
  /                          BUTTON                              /
  ==============================================================*/

  btnEdit = index => {
    this.setState({
      indexEdit: index,
      isEditOpen: true,
      userId: this.state.dataUsers[index].id
    });
  };

  btnSave = () => {
    console.log("saved");
    // this.setState({ isEditOpen: false });

    const ref = this.refs;
    var id = this.state.userId;
    var password = this.props.AuthPass;
    var editName = ref.edit_name.value;
    var editUsername = ref.edit_username.value;
    var editDummy = ref.edit_dummy.value;
    var editRole = ref.edit_role.value;
    var newObj = { name: editName, username: editUsername, password, dummy: editDummy, role: editRole };
    if ({ ...(newObj !== "") }) {
      Axios.put(`${API_URL}/users/${id}`, newObj)
        .then(() => {
          Axios.get(`${API_URL}/users`)
            .then(res => {
              Swal.fire({
                icon: "success",
                title: "User updated",
                showConfirmButton: false,
                allowOutsideClick: false,
                timerProgressBar: true,
                timer: 800
              }).then(() => {
                window.location.reload(false);
                this.setState({ dataStudio: res.data, isEditOpen: false });
              });
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Ooops...",
        text: "Data incomplete!"
      });
    }
  };

  btnCancel = () => {
    this.setState({ indexEdit: -1 });
  };

  btnDelete = index => {
    console.log("suspended");
    this.props.SuspendThunkAction(this.state.dataUsers[index]);
  };

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
            <button onClick={() => this.btnDelete(index)} className="btn btn-danger action">
              <FaRegTrashAlt />
            </button>
            <button onClick={() => this.btnEdit(index)} className="btn btn-primary action">
              <FaRegEdit />
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
    const { dataUsers, indexEdit, isEditOpen } = this.state;
    // console.log("state", this.state.dataUsers);

    if (AuthLogin && AuthRole === "admin") {
      return (
        <div>
          {/*                MODAL EDIT                 */}
          {indexEdit === -1 ? null : (
            <Modal centered size="sm" isOpen={isEditOpen} toggle={() => this.setState({ isEditOpen: false })}>
              <ModalHeader>Edit: </ModalHeader>
              <ModalBody>
                <span>Name:</span>
                <input
                  ref="edit_name"
                  type="text"
                  defaultValue={dataUsers[indexEdit].name}
                  className="form-control mb-3"
                />
                <span>Username:</span>
                <input
                  ref="edit_username"
                  type="text"
                  defaultValue={dataUsers[indexEdit].username}
                  className="form-control mb-3"
                />
                <span>Dummy:</span>
                <input
                  ref="edit_dummy"
                  type="text"
                  defaultValue={dataUsers[indexEdit].dummy}
                  className="form-control mb-3"
                />
                <span>Role:</span>
                {dataUsers[indexEdit].role === "user" ? (
                  <select ref="edit_role" defaultValue="user" className="form-control">
                    {/* <option value="admin">admin</option> */}
                    <option value="user">user</option>
                    <option value="writer">writer</option>
                  </select>
                ) : (
                  <select ref="edit_role" defaultValue="writer" className="form-control">
                    {/* <option value="admin">admin</option> */}
                    <option value="user">user</option>
                    <option value="writer">writer</option>
                  </select>
                )}
              </ModalBody>
              <ModalFooter>
                <button onClick={() => this.btnSave(indexEdit)} className="btn btn-success action">
                  Save
                </button>
                <button onClick={this.btnCancel} className="btn btn-danger action">
                  Cancel
                </button>
              </ModalFooter>
            </Modal>
          )}

          {/*                   TABLE                   */}
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
    AuthName: state.Auth.name,
    AuthPass: state.Auth.password,
    AuthDummy: state.Auth.dummy,
    AuthRole: state.Auth.role
  };
};

export default connect(mapStateToProps, { SuspendThunkAction })(ManageUsers);
