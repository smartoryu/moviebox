/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Axios from "axios";
import Modals from "../components/Modals";
import { FormGroup, FormText, Input, Label } from "reactstrap";
import { API_URL } from "../support/API_URL";

function ManageMovies() {
  // ============ STATE ============ //
  const [dataMovies, setDataMovies] = useState([]);
  const [dataGenre, setDataGenre] = useState([]);
  const [dataSchedule, setDataSchedule] = useState([]);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [dataMovieAdd, setDataMovieAdd] = useState([]);
  const [dataMovieEdit, setDataMovieEdit] = useState([]);
  const [addImage, setAddImage] = useState({
    FileName: "Select poster image....",
    File: undefined
  });
  const [editImage, setEditImage] = useState({
    FileName: "Select poster image....",
    File: undefined
  });

  // ============ USE EFFECT ============ //
  useEffect(() => {
    // console.log("didMount");
    const fetchData = async () => {
      try {
        const movies = await Axios.get(`${API_URL}/movies`);
        setDataMovies(movies.data);
        movies.data.map(async (val, id) => {
          try {
            const genre = await Axios.get(`${API_URL}/movies/${id}/genre`);
            const schedule = await Axios.get(`${API_URL}/movies/${id}/schedule`);
            setDataGenre(genre.data);
            setDataSchedule(schedule.data);
          } catch (err) {
            console.log(err);
          }
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // ============ FUNCTION MODAL ============ //
  const toggleAdd = () => setModalAdd(!modalAdd);
  const toggleEdit = () => setModalEdit(!modalEdit);

  const btnAdd = () => setModalAdd(!modalAdd);
  const btnEdit = index => {
    setDataMovieEdit(dataMovies[index]);
    setModalEdit(true);
  };

  // ============ UPLOAD IMAGE ============ //
  const addImageFileChange = event => {
    console.log(event.target.files[0]);
    let file = event.target.files[0];
    if (file) {
      setAddImage({ ...addImage, FileName: file.name, File: event.target.files[0] });
    } else {
      setAddImage({ ...addImage, FileName: "Select Image...", File: undefined });
    }
  };

  const editImageFileChange = event => {
    console.log(event.target.files[0]);
    let file = event.target.files[0];
    if (file) {
      setEditImage({ ...editImage, FileName: file.name, File: event.target.files[0] });
    } else {
      setEditImage({ ...editImage, FileName: "Select Image...", File: undefined });
    }
  };

  // ============ FUNCTION DATA =========== //
  const postData = () => {
    let formData = new FormData();
    let Headers = {
      headers: { "Content-Type": "multipart/form-data" }
    };
    let data = {
      // id: dataMovieAdd.id,
      title: dataMovieAdd.title,
      duration: dataMovieAdd.duration,
      // studio: dataMovieAdd.studio,
      // genre: dataMovieAdd.genre,
      producer: dataMovieAdd.producer,
      director: dataMovieAdd.director,
      writer: dataMovieAdd.writer,
      production: dataMovieAdd.production,
      casts: dataMovieAdd.casts,
      trailer: dataMovieAdd.trailer,
      synopsis: dataMovieAdd.synopsis
    };

    formData.append("image", addImage.File);
    formData.append("data", JSON.stringify(data));
    Axios.post(`${API_URL}/movies/add_new`, formData, Headers)
      .then(res => {
        setDataMovies(res.data);
        setModalAdd(false);
      })
      .catch(err => console.log("add error", err));
  };

  const updateData = () => {
    let formData = new FormData();
    let Headers = {
      headers: { "Content-Type": "multipart/form-data" }
    };
    let data = {
      id: dataMovieEdit.id,
      title: dataMovieEdit.title,
      duration: dataMovieEdit.duration,
      // studio: dataMovieEdit.studio,
      // genre: dataMovieEdit.genre,
      producer: dataMovieEdit.producer,
      director: dataMovieEdit.director,
      writer: dataMovieEdit.writer,
      production: dataMovieEdit.production,
      casts: dataMovieEdit.casts,
      trailer: dataMovieEdit.trailer,
      synopsis: dataMovieEdit.synopsis
    };

    formData.append("image", editImage.File);
    formData.append("data", JSON.stringify(data));
    Axios.put(`${API_URL}/movies/${dataMovieEdit.id}/update`, formData, Headers)
      .then(res => {
        setDataMovies(res.data);
        setModalEdit(false);
      })
      .catch(err => console.log("update error", err));
  };

  // ============= RETURN ============= //
  if (dataMovies.length === 0) {
    return <div>loading</div>;
  }
  return (
    <>
      {/* ================== ADD BUTTON ================== */}
      <div className="d-flex mx-auto mb-3">
        <button onClick={toggleAdd} className="btn btn-outline-warning mx-auto">
          Add New Movie
        </button>
      </div>

      {/* =================== MODAL ADD ================== */}
      <Modals size="lg" isOpen={modalAdd} toggle={toggleAdd} header={`Add New Movie`} func={postData} btnLabel={"Save"}>
        <FormGroup className="ml-2 mt-auto">
          <Label for="addImageFile">{addImage.FileName}</Label>
          <Input type="file" name="file" id="addImageFile" onChange={addImageFileChange} />
          {/* <FormText color="muted">Upload the new poster.</FormText> */}
        </FormGroup>
        <span>Title:</span>
        <input
          type="text"
          className="form-control mb-2"
          onChange={e => setDataMovieAdd({ ...dataMovieAdd, title: e.target.value })}
        />
        <span>Duration:</span>
        <input
          type="text"
          className="form-control mb-2"
          onChange={e => setDataMovieAdd({ ...dataMovieAdd, duration: e.target.value })}
        />
        {/* <span>Studio:</span>
        <input
          type="text"
          className="form-control mb-2"
          onChange={e => setDataMovieAdd({ ...dataMovieAdd, studio: e.target.value })}
        />
        <span>Genre:</span>
        <input
          type="text"
          className="form-control mb-2"
          onChange={e => setDataMovieAdd({ ...dataMovieAdd, title: e.target.value })}
        /> */}
        <span>Producer:</span>
        <input
          type="text"
          className="form-control mb-2"
          onChange={e => setDataMovieAdd({ ...dataMovieAdd, producer: e.target.value })}
        />
        <span>Director:</span>
        <input
          type="text"
          className="form-control mb-2"
          onChange={e => setDataMovieAdd({ ...dataMovieAdd, director: e.target.value })}
        />
        <span>Writer:</span>
        <input
          type="text"
          className="form-control mb-2"
          onChange={e => setDataMovieAdd({ ...dataMovieAdd, writer: e.target.value })}
        />
        <span>Production:</span>
        <input
          type="text"
          className="form-control mb-2"
          onChange={e => setDataMovieAdd({ ...dataMovieAdd, production: e.target.value })}
        />
        <span>Casts:</span>
        <input
          type="text"
          className="form-control mb-2"
          onChange={e => setDataMovieAdd({ ...dataMovieAdd, casts: e.target.value })}
        />
        <span>Trailer:</span>
        <input
          type="text"
          className="form-control mb-2"
          onChange={e => setDataMovieAdd({ ...dataMovieAdd, trailer: e.target.value })}
        />
        <span>Synopsis:</span>
        <input
          type="text"
          className="form-control mb-2"
          onChange={e => setDataMovieAdd({ ...dataMovieAdd, synopsis: e.target.value })}
        />
      </Modals>

      {/* ================== MODAL EDIT ================== */}
      <Modals
        size="lg"
        isOpen={modalEdit}
        toggle={toggleEdit}
        header={`Edit Movie --> ${dataMovieEdit.title}`}
        func={updateData}
        btnLabel={"Update"}>
        <span>Poster Image:</span>
        <div className="d-flex mb-2">
          <img src={API_URL + dataMovieEdit.pathimage} alt="..." width="200" />
          <FormGroup className="ml-2 mt-auto">
            {/* <Label for="editImageFile">{editImage.FileName}</Label> */}
            <Input type="file" name="file" id="editImageFile" onChange={editImageFileChange} />
            {/* <FormText color="muted">Upload the new poster.</FormText> */}
          </FormGroup>
        </div>
        <span>Title:</span>
        <input
          type="text"
          className="form-control mb-2"
          value={dataMovieEdit.title}
          onChange={e => setDataMovieEdit({ ...dataMovieEdit, title: e.target.value })}
        />
        <span>Duration:</span>
        <input
          type="text"
          className="form-control mb-2"
          value={dataMovieEdit.duration}
          onChange={e => setDataMovieEdit({ ...dataMovieEdit, duration: e.target.value })}
        />
        {/* <span>Studio:</span>
        <input
          type="text"
          className="form-control mb-2"
          value={dataMovieEdit.studio}
          onChange={e => setDataMovieEdit({ ...dataMovieEdit, studio: e.target.value })}
        />
        <span>Genre:</span>
        <input
          type="text"
          className="form-control mb-2"
          value={dataMovieEdit.genre}
          onChange={e => setDataMovieEdit({ ...dataMovieEdit, title: e.target.value })}
        /> */}
        <span>Producer:</span>
        <input
          type="text"
          className="form-control mb-2"
          value={dataMovieEdit.producer}
          onChange={e => setDataMovieEdit({ ...dataMovieEdit, producer: e.target.value })}
        />
        <span>Director:</span>
        <input
          type="text"
          className="form-control mb-2"
          value={dataMovieEdit.director}
          onChange={e => setDataMovieEdit({ ...dataMovieEdit, director: e.target.value })}
        />
        <span>Writer:</span>
        <input
          type="text"
          className="form-control mb-2"
          value={dataMovieEdit.writer}
          onChange={e => setDataMovieEdit({ ...dataMovieEdit, writer: e.target.value })}
        />
        <span>Production:</span>
        <input
          type="text"
          className="form-control mb-2"
          value={dataMovieEdit.production}
          onChange={e => setDataMovieEdit({ ...dataMovieEdit, production: e.target.value })}
        />
        <span>Casts:</span>
        <input
          type="text"
          className="form-control mb-2"
          value={dataMovieEdit.casts}
          onChange={e => setDataMovieEdit({ ...dataMovieEdit, casts: e.target.value })}
        />
        <span>Trailer:</span>
        <input
          type="text"
          className="form-control mb-2"
          value={dataMovieEdit.trailer}
          onChange={e => setDataMovieEdit({ ...dataMovieEdit, trailer: e.target.value })}
        />
        <span>Synopsis:</span>
        <input
          type="text"
          className="form-control mb-2"
          value={dataMovieEdit.synopsis}
          onChange={e => setDataMovieEdit({ ...dataMovieEdit, synopsis: e.target.value })}
        />
      </Modals>

      {/* ==================== TABLE ==================== */}
      <table className="table table-hover">
        <thead>
          <tr className="text-center">
            <th scope="col">#</th>
            <th scope="col">Poster</th>
            <th scope="col">Title</th>
            <th scope="col">Producer</th>
            <th scope="col">Director</th>
            <th scope="col">Casts</th>
            <th scope="col">Synopsis</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {dataMovies.map((val, id) => {
            return (
              <tr key={id}>
                <td>{id + 1}</td>
                <td>
                  <img src={API_URL + val.pathimage} alt="..." width="200" />
                </td>
                <td>{val.title}</td>
                <td>{val.producer}</td>
                <td>{val.director}</td>
                <td>{val.casts}</td>
                <td>{val.synopsis}</td>
                <td style={{ minWidth: 200, alignContent: "center" }}>
                  <center>
                    <span className="d-block align-content-center" style={{ width: 100 }}>
                      <button className="btn btn-sm btn-warning mb-2 w-100">Detail</button>
                      <button className="btn btn-sm btn-primary mb-2 w-100" onClick={() => btnEdit(id)}>
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
    </>
  );
}

export default ManageMovies;
