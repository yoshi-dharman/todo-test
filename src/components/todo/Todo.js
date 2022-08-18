import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import "./todo.css";

import { ReactComponent as IconEditP } from "../../assets/icon-edit-p.svg";
import { ReactComponent as IconDelete } from "../../assets/icon-delete.svg";

import { updateDataTodo } from "../../services/api";

function Todo(props) {
	const { id, activity_group_id, title, is_active, priority } = props.item;
	const { setDataActivity, deleteTodo } = props;
	const [checked, setChecked] = useState(!!is_active);

	const updateData = (title, checked, priority) => {
		let data = {
			activity_group_id,
			title,
			priority,
			is_active: checked ? 0 : 1,
			created_at: Date.now(),
			updated_at: Date.now(),
		};

		updateDataTodo(id, data).then((res) => {
			console.log(res);
			setDataActivity((prev) => ({
				...prev,
				todo_items: prev.todo_items.map((item) => {
					if (item.id === res.id) {
						return res;
					} else return item;
				}),
			}));
			// getOneData(activity_group_id).then((res) => setDataActivity(res));
		});
	};

	return (
		<Card className="border-0 shadow myCard mb-3 rounded-3">
			<Card.Body data-cy="todo-item" className="d-flex justify-content-between align-items-center">
				<div className="d-flex align-items-center">
					<Form.Check
						data-cy="todo-item-checkbox"
						id={`check-api-todo`}
						className="myCheck me-4"
						defaultChecked={!checked}
						onClick={(e) => {
							setChecked(!checked);
							updateData(title, checked, priority);
							// Update nanti
						}}
					/>
					<div className={`ball rounded-circle me-4 bg-${priority}`}></div>
					<div data-cy="todo-item-title" className={`fw-semibold me-4 ${!checked && " text-decoration-line-through"}`}>
						{title}
					</div>
					<IconEditP data-cy="todo-title-edit-button" className="ms-1 pointer" width={24} height={24} />
				</div>

				<IconDelete data-cy="todo-item-delete-button" className="pointer" onClick={() => deleteTodo()} />
			</Card.Body>
		</Card>
	);
}

export default Todo;
