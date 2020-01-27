import React, { Component } from "react";
import Axios from "axios";
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, FormText, Input, Label } from "reactstrap";

import { API_URL } from "../support/API_URL";

// import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

class ManageMovies extends Component {
  state = {
    dataMovies: [],
    dataStudios: [],
    modalAdd: false,
    modalEdit: false,
    selectedIdEdit: -1,
    indexEdit: -1,
    addPosterFile: {
      addPosterFileName: "Select poster...",
      addPosterFile: undefined
    },
    editPosterFile: {
      editPosterFileName: "Select poster...",
      editPosterFile: undefined
    }
  };

  // async componentDidMount() {
  //   try {
  //     var movies = await Axios.get(`${API_URL}/movies`);
  //     try {
  //       var studios = await Axios.get(`${API_URL}/studios`);
  //     } catch (error) {
  //       console.log("studios", error);
  //     }
  //   } catch (error) {
  //     console.log("movies", error);
  //   } finally {
  //     this.setState({ dataMovies: movies.data, dataStudios: studios.data });
  //   }
  // }

  async componentDidMount() {
    try {
      var movies = await Axios.get(`${API_URL}/movies`);
    } catch (error) {
      console.log("movies", error);
    } finally {
      this.setState({ dataMovies: movies.data });
    }
  }

  btnEdit = index => {
    let editData = this.state.dataMovies;
    this.setState({
      modalEdit: true,
      indexEdit: index,
      selectedIdEdit: editData[index].id
    });
  };

  updateDataMovies = () => {
    let formData = new FormData();
    let data = {
      id: this.state.selectedIdEdit,
      title: this.refs.edit_title.value,
      duration: this.refs.edit_duration.value,
      studioId: this.refs.edit_studio.value,
      trailer: this.refs.edit_trailer.value,
      producer: this.refs.edit_producer.value,
      director: this.refs.edit_director.value,
      writer: this.refs.edit_writer.value,
      production: this.refs.edit_production.value,
      casts: this.refs.edit_casts.value,
      synopsis: this.refs.edit_synopsis.value
    };

    let Headers = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };

    formData.append("image", this.state.editPosterFile.editPosterFile);
    formData.append("data", JSON.stringify(data));

    console.log(formData);

    Axios.put(`${API_URL}/movies/${data.id}/update`, formData, Headers)
      .then(res => {
        console.log("updated");
        console.log(res.data);
        // this.setState({ dataMovies: res.data, modalEdit: false });
        return this.setState({ modalEdit: false });
      })
      .catch(err => console.log(err));
  };

  addPosterFileChange = e => {
    console.log(e.target.files[0]);
    let file = e.target.files[0];
    if (file) {
      this.setState({ ...this.state.addPosterFile, addPosterFileName: file.name, addPosterFile: e.target.files[0] });
    } else {
      this.setState({ ...this.state.addPosterFile, addPosterFileName: "Select poster...", addPosterFile: undefined });
    }
  };

  editPosterFileChange = e => {
    console.log(e.target.files[0]);
    let file = e.target.files[0];
    if (file) {
      this.setState({ ...this.state.editPosterFile, editPosterFileName: file.name, editPosterFile: e.target.files[0] });
    } else {
      this.setState({
        ...this.state.editPosterFile,
        editPosterFileName: "Select poster...",
        editPosterFile: undefined
      });
    }
  };

  render() {
    const { dataMovies, indexEdit, modalAdd } = this.state;

    return (
      <div>
        {/* =================== MODAL ADD =================== */}
        <Modal size="lg" isOpen={modalAdd} toggle={() => this.setState({ modalAdd: false })}>
          <ModalHeader>Add New Movie</ModalHeader>
          <ModalBody>
            <span>Poster Image:</span>
            <FormGroup>
              <Label for="uploadPoster">File</Label>
              <Input type="file" name="file" id="uploadPoster" />
              <FormText color="muted">Upload the poster.</FormText>
            </FormGroup>
            <span>Title:</span>
            <input type="text" ref="title" placeholder="Title" className="form-control mb-2" />
            <span>Duration:</span>
            <input type="text" ref="duration" placeholder="Duration" className="form-control mb-2" />
            <span>Studio:</span>
            <select ref="studio" className="form-control mb-2">
              <option value="1">Studio 1</option>
              <option value="2">Studio 2</option>
              <option value="3">Studio 3</option>
            </select>
            {/* <span>Genre:</span>
            <input type="text" ref="genre" className="form-control mb-2" /> */}
            <span>Producer:</span>
            <input type="text" ref="producer" placeholder="Producer" className="form-control mb-2" />
            <span>Director:</span>
            <input type="text" ref="director" placeholder="Director" className="form-control mb-2" />
            <span>Writer:</span>
            <input type="text" ref="writer" placeholder="Writer" className="form-control mb-2" />
            <span>Production:</span>
            <input type="text" ref="production" placeholder="Production" className="form-control mb-2" />
            <span>Casts:</span>
            <input type="text" ref="casts" placeholder="Casts" className="form-control mb-2" />
            <span>Trailer:</span>
            <input type="text" ref="trailer" placeholder="Trailer" className="form-control mb-2" />
            <span>Synopsis:</span>
            <textarea type="text" ref="synopsis" placeholder="Synopsis" className="form-control mb-2" />
          </ModalBody>
          <ModalFooter>
            <button onClick={this.btnSave} className="btn btn-primary">
              Save
            </button>
            <button onClick={() => this.setState({ modalAdd: false })} className="btn btn-danger">
              Cancel
            </button>
          </ModalFooter>
        </Modal>

        {/* =================== MODAL EDIT =================== */}
        {indexEdit === -1 ? null : (
          <Modal size="lg" isOpen={this.state.modalEdit} toggle={() => this.setState({ modalEdit: false })}>
            <ModalHeader>Edit Data {dataMovies[indexEdit].title}</ModalHeader>
            <ModalBody>
              <span>Poster Image:</span>
              <div className="d-flex mb-2">
                <img src={dataMovies[indexEdit].poster} width="100px" alt="..." />
                <FormGroup>
                  <Label for="editPosterFile">File</Label>
                  <Input type="file" name="file" id="editPosterFile" onChange={this.editPosterFileChange} />
                  <FormText color="muted">Upload the new poster.</FormText>
                </FormGroup>
              </div>
              <span>Title:</span>
              <input
                type="text"
                defaultValue={dataMovies[indexEdit].title}
                ref="edit_title"
                className="form-control mb-2"
              />
              <span>Duration:</span>
              <input
                type="text"
                defaultValue={dataMovies[indexEdit].duration}
                ref="edit_duration"
                className="form-control mb-2"
              />
              <span>Studio:</span>
              <select ref="edit_studio" className="form-control mb-2">
                <option value="1">Studio 1</option>
                <option value="2">Studio 2</option>
                <option value="3">Studio 3</option>
              </select>
              {/* <span>Genre:</span>
              <input
                type="text"
                defaultValue={dataMovies[indexEdit].genre}
                ref="edit_genre"
                className="form-control mb-2"
              /> */}
              <span>Producer:</span>
              <input
                type="text"
                defaultValue={dataMovies[indexEdit].producer}
                ref="edit_producer"
                className="form-control mb-2"
              />
              <span>Director:</span>
              <input
                type="text"
                defaultValue={dataMovies[indexEdit].director}
                ref="edit_director"
                className="form-control mb-2"
              />
              <span>Writer:</span>
              <input
                type="text"
                defaultValue={dataMovies[indexEdit].writer}
                ref="edit_writer"
                className="form-control mb-2"
              />
              <span>Production:</span>
              <input
                type="text"
                defaultValue={dataMovies[indexEdit].production}
                ref="edit_production"
                className="form-control mb-2"
              />
              <span>Casts:</span>
              <input
                type="text"
                defaultValue={dataMovies[indexEdit].casts}
                ref="edit_casts"
                className="form-control mb-2"
              />
              <span>Trailer:</span>
              <input
                type="text"
                defaultValue={dataMovies[indexEdit].trailer}
                ref="edit_trailer"
                className="form-control mb-2"
              />
              <span>Synopsis:</span>
              <textarea
                type="text"
                defaultValue={dataMovies[indexEdit].synopsis}
                ref="edit_synopsis"
                className="form-control mb-2"
              />
            </ModalBody>
            <ModalFooter>
              <button onClick={this.updateDataMovies} className="btn btn-primary">
                Update
              </button>
              <button onClick={() => this.setState({ modalEdit: false })} className="btn btn-danger">
                Cancel
              </button>
            </ModalFooter>
          </Modal>
        )}

        {/* =================== CONTENT =================== */}

        {/* ========== BUTTON ADD ========== */}
        <div className="d-flex mx-auto">
          <button onClick={() => this.setState({ modalAdd: true })} className="btn btn-outline-warning mx-auto">
            Add New Movie
          </button>
        </div>

        <table className="table table-hover">
          <thead>
            <tr className="text-center">
              <th scope="col">#</th>
              <th scope="col">Poster</th>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Producer</th>
              <th scope="col">Director</th>
              <th scope="col">Casts</th>
              <th scope="col">Synopsis</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.dataMovies.map((val, id) => {
              return (
                <tr key={id}>
                  <td>{id + 1}</td>
                  <td>
                    <img src={val.image} alt="..." height="250" />
                  </td>
                  <td>{val.title}</td>
                  <td>{val.genre}</td>
                  <td>{val.producer}</td>
                  <td>{val.director}</td>
                  <td>{val.casts}</td>
                  <td>{val.synopsis}</td>
                  <td style={{ minWidth: 200, alignContent: "center" }}>
                    <center>
                      <span className="d-block align-content-center" style={{ width: 100 }}>
                        <button className="btn btn-sm btn-warning mb-2 w-100">Detail</button>
                        <button className="btn btn-sm btn-primary mb-2 w-100" onClick={() => this.btnEdit(id)}>
                          Edit
                        </button>
                        <button className="btn btn-sm btn-danger mb-2 w-100">Delete</button>
                        <button className="btn btn-sm btn-success w-100">Add Poster</button>
                      </span>
                    </center>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ManageMovies;
