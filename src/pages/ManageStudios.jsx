import React, { Component } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import { Table, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Loader from "react-loader-spinner";
import Swal from "sweetalert2";

import { API_URL } from "../support/API_URL";

import NotFound from "./NotFound";

class ManageStudios extends Component {
  state = {
    loading: true,
    dataStudios: [],
    studioId: -1,
    indexEdit: -1,
    isEditOpen: false,
    isAddOpen: false
  };

  async componentDidMount() {
    try {
      var { data } = await Axios.get(`${API_URL}/studios`);
      this.setState({ dataStudios: data });
      setTimeout(() => this.setState({ loading: false }), 1000);
    } catch (err) {
      console.log(err);
    }
  }

  /* ============================================================/
  /                          BUTTON                              /
  ==============================================================*/

  btnAdd = () => {
    const ref = this.refs;
    var newName = ref.add_name.value;
    var newTotalSeat = ref.add_totalSeat.value;
    var newObj = { name: newName, totalSeat: newTotalSeat };
    if ({ ...(newObj !== "") }) {
      Axios.post(`${API_URL}/studios/`, newObj)
        .then(() => {
          Axios.get(`${API_URL}/studios`)
            .then(res => {
              Swal.fire({
                icon: "success",
                title: "New Studio Added",
                showConfirmButton: false,
                allowOutsideClick: false,
                timerProgressBar: true,
                timer: 1000
              }).then(() => {
                this.setState({ dataStudio: res.data, isAddOpen: false });
                window.location.reload(false);
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

  btnDelete = index => {
    Swal.fire({
      title: `Are you sure deleting ${this.state.dataStudios[index].name}?`,
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true
    }).then(res => {
      if (res.value) {
        var dataStudio = this.state.dataStudios;
        this.setState({ studioId: dataStudio[index]["id"] });
        console.log("Deleted ID Movie", dataStudio[index]["id"]);
        dataStudio.splice(index, 1);
        this.setState({ dataStudio });
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          showConfirmButton: false,
          allowOutsideClick: false,
          timerProgressBar: true,
          timer: 1000
        })
          .then(() => {
            Axios.delete(`${API_URL}/studios/${this.state.studioId}`);
          })
          .catch(err => {
            console.log(err);
          });
      } else if (res.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: "error",
          title: "Cancelled",
          showConfirmButton: false,
          allowOutsideClick: false,
          timerProgressBar: true,
          timer: 1000
        });
      }
    });
  };

  btnEdit = index => {
    var { dataStudios } = this.state;
    this.setState({ isEditOpen: true, indexEdit: index, studioId: dataStudios[index].id });
  };

  btnSave = () => {
    const ref = this.refs;
    var editName = ref.edit_name.value;
    var editTotalSeat = ref.edit_totalSeat.value;
    var id = this.state.studioId;
    var newObj = { name: editName, totalSeat: editTotalSeat };
    if ({ ...(newObj !== "") }) {
      Axios.put(`${API_URL}/studios/${id}`, newObj)
        .then(() => {
          Axios.get(`${API_URL}/studios`)
            .then(res => {
              Swal.fire({
                icon: "success",
                title: "Studio updated",
                showConfirmButton: false,
                allowOutsideClick: false,
                timerProgressBar: true,
                timer: 1000
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

  /* ============================================================/
  /                        RENDER BODY                           /
  ==============================================================*/

  renderBody = () => {
    return this.state.dataStudios.map((val, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{val.name}</td>
          <td>{val.totalSeat}</td>
          <td>
            <button onClick={() => this.btnEdit(index)} className="btn btn-primary mr-3">
              <FaRegEdit />
            </button>
            <button onClick={() => this.btnDelete(index)} className="btn btn-danger">
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
    const { dataStudios, indexEdit } = this.state;
    const { AuthLogin, AuthRole } = this.props;
    // console.log("state", this.state.dataStudios);
    // console.log("manage studios", AuthRole);

    if (AuthLogin && AuthRole === "admin") {
      return (
        <div>
          {/*                 MODAL ADD                 */}
          <Modal size="md" isOpen={this.state.isAddOpen} toggle={() => this.setState({ isAddOpen: false })}>
            <ModalHeader>Add New Studio</ModalHeader>
            <ModalBody>
              <span>Studio Name:</span>
              <input ref="add_name" type="text" placeholder="Studio name" className="form-control mb-3" />
              <span>Total Seat:</span>
              <input ref="add_totalSeat" type="number" placeholder="Total seat" className="form-control" />
            </ModalBody>
            <ModalFooter>
              <button onClick={() => this.setState({ isAddOpen: false })} className="btn btn-danger">
                Cancel
              </button>
              <button onClick={this.btnAdd} className="btn btn-primary">
                Save
              </button>
            </ModalFooter>
          </Modal>

          {/*                MODAL EDIT                 */}
          {indexEdit === -1 ? null : (
            <Modal size="md" isOpen={this.state.isEditOpen} toggle={() => this.setState({ isEditOpen: false })}>
              <ModalHeader>Edit {dataStudios[indexEdit].name}</ModalHeader>
              <ModalBody>
                <span>Studio Name:</span>
                <input
                  ref="edit_name"
                  type="text"
                  defaultValue={dataStudios[indexEdit].name}
                  className="form-control mb-3"
                />
                <span>Total Seat:</span>
                <input
                  ref="edit_totalSeat"
                  type="number"
                  defaultValue={dataStudios[indexEdit].totalSeat}
                  className="form-control"
                />
              </ModalBody>
              <ModalFooter>
                <button onClick={() => this.setState({ isEditOpen: false })} className="btn btn-danger">
                  Cancel
                </button>
                <button onClick={this.btnSave} className="btn btn-primary">
                  Save
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
              <h2 className="mt-4 mb-2">Manage Studios</h2>
              <button onClick={() => this.setState({ isAddOpen: true })} className="btn btn-warning font-smaller mb-3">
                Add New Studio
              </button>
              <Table className="text-center" style={{ width: 800 }}>
                <thead>
                  <tr>
                    <th style={{ width: 100 }}>#</th>
                    <th style={{ width: 300 }}>Studio Name</th>
                    <th style={{ width: 200 }}>Total Seat</th>
                    <th style={{ width: 200 }}>Action</th>
                  </tr>
                </thead>
                <tbody>{this.renderBody()}</tbody>
              </Table>
            </center>
          )}
        </div>
      );
    }

    return <NotFound />;
  }
}

const mapStateToProps = state => {
  return {
    AuthLogin: state.Auth.login,
    AuthRole: state.Auth.role
  };
};

export default connect(mapStateToProps)(ManageStudios);
