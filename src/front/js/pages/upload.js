import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";


export const UploadView = props => {
	const { store, actions } = useContext(Context);
    const [ files, setFiles ] = useState(null);
	
    const uploadImage = (evt) => {
        evt.preventDefault();

        console.log('This are the files', files);
        let body = new FormData();
        body.append("animal_image", files[0])
        const options = {
            body,
            method: "POST"
        }
        fetch(process.env.BACKEND_URL + '/upload', options)
        .then(resp => resp.json())
        .then(data => console.log("Success noob", data))
        .catch(error => console.error("Error noob", error))
    }

	return (
		<div className="jumbotron">
			<form onSubmit={uploadImage} >
                <input type="file" onChange={(e) => setFiles(e.target.files)}/>
                <button>Upload</button>
            </form>
		</div>
	);
};
