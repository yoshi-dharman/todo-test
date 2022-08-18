import React from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import "./activity.css";

import { ReactComponent as IconDelete } from "../../assets/icon-delete.svg";

function Activity(props) {
	let navigate = useNavigate();
	const { id, title, created_at } = props.item;
	const { deleteActivity } = props;

	const date = new Date(created_at);
	const options = { year: "numeric", month: "long", day: "numeric" };

	return (
		<Card className="card-theme border-0 rounded-3 shadow px-2">
			<Card.Body
				data-cy="activity-item"
				className="pointer"
				onClick={() => {
					navigate(`/detail/${id}`);
				}}
			>
				<Card.Title data-cy="activity-item-title" className="fw-bolder">
					{title}
				</Card.Title>
			</Card.Body>
			<Card.Footer
				data-cy="activity-item-date"
				className="border-0 bg-white d-flex align-items-center justify-content-between text-black-50 card-footer mb-3"
			>
				{date.toLocaleDateString("id", options)}
				<IconDelete data-cy="activity-item-delete-button" className="pointer" onClick={() => deleteActivity()} />
			</Card.Footer>
		</Card>
	);
}

export default Activity;
