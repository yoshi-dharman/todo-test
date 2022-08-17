import React, { useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import { titlePage } from "../../test";

import { ReactComponent as IconPlus } from "../../assets/icon-plus.svg";
import EmptyActivity from "../../assets/empty-activity.png";

function Dashboard() {
	// const [dataTodo, setDataTodo] = useState({});

	useEffect(() => {
		titlePage({
			title: "To Do List - Dashboard",
		});

		axios
			.get("https://todo.api.devcode.gethired.id/activity-groups?email=ivan@skyshi.com")
			.then((res) => console.log(res.data));
		// axios.get("https://floating-mountain-35184.herokuapp.com/activity-groups?email=").then((res) => console.log(res));
	}, []);

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
