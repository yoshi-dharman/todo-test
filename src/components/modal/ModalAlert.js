import React from "react";
import Modal from "react-bootstrap/Modal";

import { ReactComponent as IconAlertSm } from "../../assets/icon-alert-sm.svg";

function ModalAlert(props) {
	return (
		<Modal show={props.show} onHide={props.onHide} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Body className="border-0">
				<h5 data-cy="modal-information" className="m-0 fs-6 d-flex align-items-center">
					<IconAlertSm className="mx-2" /> Activity berhasil dihapus
				</h5>
			</Modal.Body>
		</Modal>
	);
}

export default ModalAlert;
