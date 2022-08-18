import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { Link, useParams } from "react-router-dom";

import EmptyItem from "../../assets/empty-item.png";
import { ReactComponent as IconPlus } from "../../assets/icon-plus.svg";
import { ReactComponent as IconBack } from "../../assets/icon-back.svg";
import { ReactComponent as IconEditP } from "../../assets/icon-edit-p.svg";
import { ReactComponent as IconSort } from "../../assets/icon-sort.svg";

import { getOneData } from "../../services/api";

function ItemList() {
	let { id } = useParams();
	const [dataActivity, setDataActivity] = useState({
		title: "...",
		todo_items: [],
	});

	useEffect(() => {
		getOneData(id).then((res) => setDataActivity(res));
	}, [id]);

	console.log(dataActivity);

	return (
		<Container>
			<div className="my-5 d-flex justify-content-between">
				<h1 data-cy="todo-title" className="fw-bolder">
					<Link data-cy="todo-back-button" to="/">
						<IconBack className="me-1 pointer" />
					</Link>
					{dataActivity.title}
					<IconEditP data-cy="todo-title-edit-button" className="ms-1 pointer" width={24} height={24} />
				</h1>
				<div className="d-flex">
					<div className="me-3 border rounded-circle d-flex justify-content-center align-items-center p-3 pointer">
						<IconSort className="pointer" />
					</div>
					<Button
						// onClick={(e) => createActivity(e)}
						data-cy="todo-add-button"
						className="btn-theme d-flex align-items-center justify-content-center"
					>
						<IconPlus className="me-1" />
						Tambah
					</Button>
				</div>
			</div>
			{dataActivity.todo_items.length === 0 ? (
				<div data-cy="todo-empty-state" className="text-center">
					<Image fluid src={EmptyItem} />
				</div>
			) : (
				<null />
			)}
		</Container>
	);
}

export default ItemList;
