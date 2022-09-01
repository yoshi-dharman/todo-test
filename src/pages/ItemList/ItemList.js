import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import { Link, useParams } from "react-router-dom";
import "./itemlist.css";

import EmptyItem from "../../assets/empty-item.png";
import { ReactComponent as IconPlus } from "../../assets/icon-plus.svg";
import { ReactComponent as IconBack } from "../../assets/icon-back.svg";
import { ReactComponent as IconEditP } from "../../assets/icon-edit-p.svg";
import { ReactComponent as IconSort } from "../../assets/icon-sort.svg";

import ModalCreate from "../../components/modal/ModalCreate";
import ModalDelete from "../../components/modal/ModalDelete";
import ModalAlert from "../../components/modal/ModalAlert";
import Todo from "../../components/todo/Todo";
import { getOneData, updateData } from "../../services/api";

function ItemList() {
	let { id } = useParams();
	const [dataActivity, setDataActivity] = useState({
		title: "...",
		todo_items: [],
	});
	// const [loadData, setLoadData] = useState(true);
	const [modalCreate, setModalCreate] = useState(false);
	const [modalDelete, setModalDelete] = useState(false);
	const [modalAlert, setModalAlert] = useState(false);
	const [editStatus, setEditStatus] = useState(false);

	const [modalData, setModalData] = useState({
		id: 1,
		title: "none",
		type: "todo",
	});

	const deleteTodo = (id, title) => {
		setModalData({
			id: id,
			title: title,
			type: "todo",
		});
		setModalDelete(true);
	};

	useEffect(() => {
		getOneData(id).then((res) => setDataActivity(res));
	}, [id]);

	const updateDataAction = (title) => {
		let data = {
			title,
		};

		updateData(id, data).then((res) => {
			console.log(res);
			setDataActivity((prev) => ({
				...prev,
				title: res.title,
			}));
		});
	};

	return (
		<Container>
			<div className="my-5 d-flex justify-content-between">
				<h1 data-cy="todo-title" className="fw-bolder d-flex align-items-center">
					<Link data-cy="todo-back-button" to="/">
						<IconBack className="me-1 pointer" />
					</Link>

					{!editStatus && dataActivity.title}
					{editStatus && (
						<Form>
							<Form.Control
								autoFocus
								onBlur={(e) => {
									updateDataAction(e.target.value);
									setEditStatus(!editStatus);
								}}
								className=""
								onChange={(e) => {
									setDataActivity((prev) => ({ title: e.target.value, ...prev }));
								}}
								type="text"
								defaultValue={dataActivity.title}
							/>
						</Form>
					)}
					{/* <div className={editStatus ? "d-none" : ""}>{dataActivity.title}</div>
					{!loadData && (
						<Form className={editStatus ? "" : "d-none"}>
							<Form.Control
								ref={editBox}
								onBlur={(e) => console.log("blur", e.target.value)}
								className=""
								onChange={(e) => {
									setDataActivity((prev) => ({ title: e.target.value, ...prev }));
								}}
								type="text"
								value={dataActivity.title}
							/>
						</Form>
					)} */}
					<IconEditP
						onClick={() => {
							setEditStatus(!editStatus);
						}}
						data-cy="todo-title-edit-button"
						className="ms-1 pointer"
						width={24}
						height={24}
					/>
				</h1>
				<div className="d-flex">
					{dataActivity.todo_items.length !== 0 && (
						<NavDropdown
							data-cy="todo-sort-button"
							title={
								<div className="me-3 border rounded-circle d-flex justify-content-center align-items-center p-3 pointer position-relative">
									<IconSort className="pointer" />
								</div>
							}
							id="basic-nav-dropdown"
						>
							<NavDropdown.Item
								data-cy="sort-selection"
								onClick={() => {
									setDataActivity((prev) => ({
										...prev,
										todo_items: prev.todo_items.sort((a, b) => b.id - a.id),
									}));
								}}
								href="#"
							>
								Terbaru
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item
								data-cy="sort-selection"
								onClick={() => {
									setDataActivity((prev) => ({
										...prev,
										todo_items: prev.todo_items.sort((a, b) => a.id - b.id),
									}));
								}}
								href="#"
							>
								Terlama
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item
								data-cy="sort-selection"
								onClick={() => {
									setDataActivity((prev) => ({
										...prev,
										todo_items: prev.todo_items.sort((a, b) => (a.title > b.title) - (a.title < b.title)),
									}));
								}}
								href="#"
							>
								A-Z
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item
								data-cy="sort-selection"
								onClick={() => {
									setDataActivity((prev) => ({
										...prev,
										todo_items: prev.todo_items.sort((a, b) => (b.title > a.title) - (b.title < a.title)),
									}));
								}}
								href="#"
							>
								Z-A
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item
								data-cy="sort-selection"
								onClick={() => {
									setDataActivity((prev) => ({
										...prev,
										todo_items: prev.todo_items.sort((a, b) => b.is_active - a.is_active),
									}));
								}}
								href="#"
							>
								Belum Selesai
							</NavDropdown.Item>
						</NavDropdown>
					)}
					<Button
						// onClick={(e) => createActivity(e)}
						data-cy="todo-add-button"
						className="btn-theme d-flex align-items-center justify-content-center"
						onClick={() => setModalCreate(true)}
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
				<Row>
					{dataActivity.todo_items.map((item, index) => (
						<Todo
							key={item.id}
							item={item}
							setDataActivity={setDataActivity}
							deleteTodo={() => deleteTodo(item.id, item.title)}
						/>
					))}
				</Row>
			)}
			<ModalDelete
				show={modalDelete}
				onHide={() => setModalDelete(false)}
				data={modalData}
				setDataActivity={setDataActivity}
				setModalAlert={setModalAlert}
				activity_group_id={id}
			/>
			<ModalCreate id={id} show={modalCreate} setDataActivity={setDataActivity} onHide={() => setModalCreate(false)} />
			<ModalAlert show={modalAlert} onHide={() => setModalAlert(false)} />
		</Container>
	);
}

export default ItemList;
