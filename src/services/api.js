import axios from "axios";

const url = "https://todo.api.devcode.gethired.id/activity-groups?email=yoshi@gmail.com";
const urlOrigin = "https://todo.api.devcode.gethired.id/activity-groups/";
const urlTodo = "https://todo.api.devcode.gethired.id/todo-items/";

export async function getAllData() {
	return axios.get(url).then((res) => {
		return res.data.data;
	});
}

export async function getOneData(id) {
	return axios.get(urlOrigin + id).then((res) => {
		return res.data;
	});
}

export async function createData() {
	return axios
		.post(url, {
			title: "New Activity",
			email: "yoshi@gmail.com",
		})
		.then((res) => {
			return res.data;
		});
}

export async function deleteData(id) {
	return axios.delete(urlOrigin + id).then((res) => {
		return res.data;
	});
}

export async function createDataTodo(title, priority, activity_group_id) {
	return axios
		.post(urlTodo, {
			activity_group_id,
			title,
			priority,
		})
		.then((res) => {
			return res.data;
		});
}

export async function updateDataTodo(id, data) {
	return axios.put(urlTodo + id, { ...data }).then((res) => res.data);
}

export async function deleteDataTodo(id) {
	return axios.delete(urlTodo + id).then((res) => {
		return res.data;
	});
}
