import React from "react";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { ReactComponent as IconPlus } from "../../assets/icon-plus.svg";
import EmptyActivity from "../../assets/empty-activity.png";
// import "./index.css";

function Dashboard() {
	return (
		<div className="container">
			<div className="my-5 d-flex justify-content-between">
				<h1 data-cy="activity-title">Activity</h1>
				<Button data-cy="activity-add-button" className="btn-theme d-flex align-items-center justify-content-center">
					<IconPlus className="me-1" />
					Tambah
				</Button>
			</div>
			<div>
				{/* not EMpty ??? */}
				<div className="text-center">
					<Image fluid src={EmptyActivity} />
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
