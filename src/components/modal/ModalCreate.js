import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import "./modalCreate.css";

import { ReactComponent as IconDropdown } from "../../assets/icon-dropdown.svg";

import { createDataTodo } from "../../services/api";

function ModalCreate(props) {
	const { id, setDataActivity } = props;
	const [title, setTitle] = useState("");
	const [priority, setPriority] = useState("very-high");

	const options = [
		{ value: "very-high", label: "Very High", clr: "red" },
		{ value: "high", label: "High", clr: "orange" },
		{ value: "normal", label: "Medium", clr: "green" },
		{ value: "low", label: "Low", clr: "blue" },
		{ value: "very-low", label: "Very Low", clr: "purple" },
	];

	const formatOptionLabel = ({ label, clr }) => (
		<div data-cy="modal-add-priority-item" className="d-flex align-items-center">
			<div className={`ball rounded-circle me-2 bg-${clr}`}></div>
			<div>{label}</div>
		</div>
	);

	const changeData = (e) => {
		setTitle(e.target.value);
	};

	const addTodo = (e) => {
		createDataTodo(title, priority, id).then((res) => {
			setDataActivity((prev) => ({ ...prev, todo_items: [res, ...prev.todo_items] }));
			console.log(res);
		});
	};

	return (
		<Modal
			data-cy="modal-add"
			show={props.show}
			onHide={props.onHide}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header className="mt-2 px-4" closeButton>
				<Modal.Title data-cy="modal-add-title" id="contained-modal-title-vcenter fw-bold">
					Tambah List Item
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="mt-3 px-4">
				<Form>
					<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
						<Form.Label data-cy="modal-add-name-title" className="fw-semibold">
							NAMA LIST ITEM
						</Form.Label>
						<Form.Control
							data-cy="modal-add-name-input"
							onChange={(e) => changeData(e)}
							name="title"
							className="p-3"
							type="text"
							placeholder="Tambahkan nama item list"
						/>
					</Form.Group>
					<Form.Group className="mb-3 inputSelect" controlId="exampleForm.ControlTextarea1">
						<Form.Label data-cy="modal-add-priority-title" className="fw-semibold">
							Priority
						</Form.Label>
						{/* <Form.Select
							data-cy="modal-add-priority-dropdown"
							name="priority"
							className="p-3 mySelect"
							aria-label="Default select example"
						>
							<option value="very-high" className="m-5 p-5">
								<div className="ball bg-red rounded-circle"></div> Very High
							</option>
							<option className="" value="high">
								High
							</option>
							<option className="" value="medium">
								Medium
							</option>
							<option className="" value="low">
								Low
							</option>
							<option className="" value="very-low">
								Very Low
							</option>
						</Form.Select> */}
						<Select
							data-cy="modal"
							defaultValue={options[0]}
							formatOptionLabel={formatOptionLabel}
							options={options}
							className="select-priority border-0"
							onChange={(e) => setPriority(e.value)}
							id="AddFormPriority"
							onMouseOver={() => console.log("lagi di atas awan")}
							components={<IconDropdown data-cy="modal-add-priority-dropdown" className="border-0" />}
						/>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer className="px-4">
				<Button disabled={title === ""} className="btn-theme bg-theme fw-bold" onClick={() => addTodo()}>
					Simpan
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ModalCreate;
