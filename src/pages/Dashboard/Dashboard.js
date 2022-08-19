import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import "./dashboard.css";

import { ReactComponent as IconPlus } from "../../assets/icon-plus.svg";
import EmptyActivity from "../../assets/empty-activity.png";

import Activity from "../../components/activity/Activity";
import ModalDelete from "../../components/modal/ModalDelete";
import ModalAlert from "../../components/modal/ModalAlert";
import { getAllData, createData } from "../../services/api";

function Dashboard() {
	const [dataTodo, setDataTodo] = useState([]);
	const [modalDelete, setModalDelete] = useState(false);
	const [modalAlert, setModalAlert] = useState(false);
	const [modalData, setModalData] = useState({
		id: 1,
		title: "none",
		type: "activity",
	});

	useEffect(() => {
		getAllData().then((res) => setDataTodo(res));
	}, []);

	const createActivity = (e) => {
		createData().then((res) => {
			// setDataTodo((prev) => [res, ...prev]);
			getAllData().then((res) => setDataTodo(res));
		});
	};

	const deleteActivity = (id, title) => {
		setModalData({
			id: id,
			title: title,
			type: "activity",
		});
		setModalDelete(true);
	};

	return (
		<Container>
			<div className="my-5 d-flex justify-content-between">
				<h1 data-cy="activity-title" className="fw-bolder">
					Activity
				</h1>
				<Button
					onClick={(e) => createActivity(e)}
					data-cy="activity-add-button"
					className="btn-theme d-flex align-items-center justify-content-center"
				>
					<IconPlus className="me-1" />
					Tambah
				</Button>
			</div>

			{dataTodo.length === 0 ? (
				<div data-cy="activity-empty" className="text-center">
					<Image fluid src={EmptyActivity} />
				</div>
			) : (
				<Row>
					{dataTodo.map((item, index) => (
						<Col xs={12} md={6} lg={3} key={index} className="pb-4">
							<Activity
								data-cy="activity-item"
								item={item}
								deleteActivity={() => deleteActivity(item.id, item.title)}
							/>
						</Col>
					))}
				</Row>
			)}
			<ModalDelete
				show={modalDelete}
				onHide={() => setModalDelete(false)}
				data={modalData}
				setDataTodo={setDataTodo}
				setModalAlert={setModalAlert}
			/>
			<ModalAlert show={modalAlert} onHide={() => setModalAlert(false)} />
		</Container>
	);
}

export default Dashboard;
