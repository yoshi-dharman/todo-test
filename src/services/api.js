import axios from "axios";

const url = "https://todo.api.devcode.gethired.id/activity-groups?email=yoshi@gmail.com";
const urlOrigin = "https://todo.api.devcode.gethired.id/activity-groups/";

export async function getAllData() {
	return axios.get(url).then((res) => {
		return res.data.data;
	});
	// return axios.get("https://floating-mountain-35184.herokuapp.com/activity-groups?").then((res) => {
	// 	return res.data.data;
	// });
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
