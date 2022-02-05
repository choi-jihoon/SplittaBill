import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { createBill } from "../../store/bills";


const AddBillForm = ({ showModal }) => {
	const dispatch = useDispatch();

	const [errors, setErrors] = useState([]);
	const [total_amount, setTotal_Amount] = useState("");
	const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("")
    const [friends, setFriends] = useState("")


	const handleSubmit = async (e) => {
		e.preventDefault();
        const data = await dispatch(createBill(total_amount, description, deadline, friends))

		if (data) {
            console.log("DATAAAAAAAAA", data)
			setErrors(data);
            console.log("ERRRRORSSSSSSS", errors)
		}

        showModal(false)
	};

	const updateTotal = (e) => {
		setTotal_Amount(e.target.value);
	};

	const updateDescription = (e) => {
		setDescription(e.target.value);
	};

    const updateDeadline = (e) => {
		setDeadline(e.target.value);
	};

    const updateFriends = (e) => {
        setFriends(e.target.value)
    }


	return (
		<form onSubmit={handleSubmit}>
			<div>
				{errors.map((error, ind) => (
					<div key={ind}>{error}</div>
				))}
			</div>
			<div>
				<label htmlFor="total_amount">Amount</label>
				<input
					name="total_amount"
					type="number"
                    step="0.01"
					placeholder="0"
					value={total_amount}
					onChange={updateTotal}
				/>
			</div>
			<div>
				<label htmlFor="description">Description</label>
				<input
					name="description"
					type="text"
					placeholder="Bill Description"
					value={description}
					onChange={updateDescription}
				/>
			</div>
            <div>
				<label htmlFor="deadline">Deadline</label>
				<input
					name="deadline"
					type="date"
					value={deadline}
					onChange={updateDeadline}
				/>
			</div>
            <div>
                <label htmlFor="friends">Between Who?</label>
                <input
                    name="friends"
                    type="text"
                    value={friends}
                    placeholder="Usernames of friends separated by commas."
                    onChange={updateFriends}
                />
            </div>
            {/* <div>
				<label htmlFor="friends">Between Who?</label>
				<select
					name="friends"
					type="date"
                    onChange={updateFriends}
                    multiple
				>
                    <option value="2">NickMiller</option>
                    <option value="3">JessDay</option>
                    <option value="4">Schmidtty</option>
                </select>
			</div> */}
			<button type="submit">Divvy Up</button>
		</form>
	);
};

export default AddBillForm;
