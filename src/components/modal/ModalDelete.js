import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { ReactComponent as IconAlert } from "../../assets/icon-alert.svg";

import { getAllData, getOneData, deleteData, deleteDataTodo } from "../../services/api";

function ModalDelete(props) {
	const { id, title, type } = props.data;
	const { setModalAlert, setDataTodo, activity_group_id, setDataActivity } = props;

	const deleteActivity = (id) => {
		deleteData(id).then((res) => {
			props.onHide();
			getAllData().then((res) => setDataTodo(res));
			setModalAlert(true);
		});
	};

	const deleteTodo = (id) => {
		deleteDataTodo(id).then((res) => {
			props.onHide();
			getOneData(activity_group_id).then((res) => setDataActivity(res));
			setModalAlert(true);
		});
	};

	return (
		<Modal show={props.show} onHide={props.onHide} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header className="border-0 pt-5">
				<Modal.Title id="contained-modal-title-vcenter" className="m-auto">
					<IconAlert />
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="text-center">
				<h5>{`Apakah anda yakin menghapus ${type === "activity" ? `Activity` : `List Item`}`}</h5>
				<h5 className="fw-bolder">"{title}"?</h5>
			</Modal.Body>
			<Modal.Footer className="border-0 mx-auto pb-5">
				<Button
					data-cy="modal-delete-cancel-button"
					className="btn-theme bg-gray text-black fw-bold"
					onClick={props.onHide}
				>
					Batal
				</Button>
				<Button
					data-cy="activity-item-delete-button"
					onClick={() => {
						if (type === "activity") {
							deleteActivity(id);
						} else {
							deleteTodo(id);
						}
					}}
					className="btn-theme bg-red fw-bold"
				>
					Hapus
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ModalDelete;
