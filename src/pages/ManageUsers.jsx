import React, { Component } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Popover, PopoverHeader } from "reactstrap";
import { FaRegEdit, FaRegTrashAlt, FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import Loader from "react-loader-spinner";
import Swal from "sweetalert2";

import { API_URL } from "../support/API_URL";
import NotFound from "./NotFound";

class ManageUsers extends Component {
  state = {
    loading: false,
    dataUsers: [],
    userId: -1,
    indexEdit: -1,
    isEditOpen: false,
    popIndex: -1,
    popSave: false,
    popCancel: false
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
    this.setState({ isEditOpen: false });

    // const ref = this.refs;
    // var editUsername = ref.edit_username.value;
    // var editRole = ref.edit_role.value;
    // var id = this.state.userId;
    // var newObj = { username: editUsername, Role: editRole };
    // if ({ ...(newObj !== "") }) {
    //   Axios.put(`${API_URL}/users/${id}`, newObj)
    //     .then(() => {
    //       Axios.get(`${API_URL}/users`)
    //         .then(res => {
    //           Swal.fire({
    //             icon: "success",
    //             title: "User updated",
    //             showConfirmButton: false,
    //             allowOutsideClick: false,
    //             timerProgressBar: true,
    //             timer: 800
    //           }).then(() => {
    //             window.location.reload(false);
    //             this.setState({ dataStudio: res.data, isEditOpen: false });
    //           });
    //         })
    //         .catch(err => {
    //           console.log(err);
    //         });
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // } else {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Ooops...",
    //     text: "Data incomplete!"
    //   });
    // }
  };

  btnCancel = () => {
    this.setState({ indexEdit: -1 });
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
            {val.role === "admin" ? null : (
              <button onClick={() => this.btnDelete(index)} className="btn btn-danger action">
                <FaRegTrashAlt />
              </button>
            )}
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
    const { dataUsers, indexEdit, isEditOpen, popSave, popCancel } = this.state;
    // console.log("state", this.state.dataUsers);

    if (AuthLogin && AuthRole === "admin") {
      return (
        <div>
          {/*                MODAL EDIT                 */}
          {indexEdit === -1 ? null : (
            <Modal centered size="sm" isOpen={isEditOpen} toggle={() => this.setState({ isEditOpen: false })}>
              <ModalHeader>Edit: </ModalHeader>
              <ModalBody>
                <span>Username:</span>
                <input
                  ref="edit_username"
                  type="text"
                  defaultValue={dataUsers[indexEdit].username}
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
                <button
                  id="popsave"
                  onMouseEnter={() => this.setState({ popSave: true })}
                  onMouseLeave={() => this.setState({ popSave: false })}
                  onClick={() => this.btnSave(indexEdit)}
                  className="btn btn-success action">
                  <FaRegCheckCircle />
                </button>
                <button
                  id="popcancel"
                  onMouseEnter={() => this.setState({ popCancel: true })}
                  onMouseLeave={() => this.setState({ popCancel: false })}
                  onClick={this.btnCancel}
                  className="btn btn-danger action">
                  <FaRegTimesCircle />
                </button>
                <Popover placement="bottom" target="popsave" isOpen={popSave}>
                  <PopoverHeader>Save</PopoverHeader>
                </Popover>
                <Popover placement="bottom" target="popcancel" isOpen={popCancel}>
                  <PopoverHeader>Cancel</PopoverHeader>
                </Popover>
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
    AuthRole: state.Auth.role
  };
};

export default connect(mapStateToProps)(ManageUsers);
