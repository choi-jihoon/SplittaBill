import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateUserImage } from "../../../../store/session";
import { getBills } from "../../../../store/bills";


const EditUser = ({ showModal, user }) => {
	const dispatch = useDispatch();
	const [image, setImage] = useState(null);
	const [imageLoading, setImageLoading] = useState(false);
	const [errors, setErrors] = useState([]);
	const sessionUser = useSelector((state) => state.session.user);
	const updateImage = (e) => {
		const file = e.target.files[0];
		setImage(file);
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		setImageLoading(true);
		const formData = new FormData();
		formData.append("image", image);
		const data = await dispatch(updateUserImage(formData, sessionUser.id));
		await dispatch(getBills());
		if (!data) {
			setTimeout(() => {
				setImageLoading(false);
				showModal(false);
			}, 400);
		} else {
			setErrors(data.errors);
		}
	};
	return (
		<div className="edit-image-form">
			<div className="modal-head" style={{ marginBottom: 20 }}>
				Change Profile Picture
			</div>
			{!image && (
				<img
					src={sessionUser.image}
					alt="test"
					style={{
						width: 100,
						height: 100,
						objectFit: "cover",
						borderRadius: "50%",
					}}
				></img>
			)}
			{image && (
				<img
					src={URL.createObjectURL(image)}
					alt="test"
					style={{
						width: 100,
						height: 100,
						objectFit: "cover",
						borderRadius: "50%",
					}}
				></img>
			)}
			<form onSubmit={onSubmit}>
				<label htmlFor="file-upload">Upload an Image!</label>
				<input
					id="file-upload"
					type="file"
					accept="image/*"
					onChange={updateImage}
				></input>
				<button
				>Save</button>
			</form>
			{imageLoading && (
				<p>
					<i className="fas fa-spinner fa-pulse"></i>
				</p>
			)}
			{errors.map((err, i) => (
				<li key={i}>{err}</li>
			))}
		</div>
	);
};

export default EditUser;
