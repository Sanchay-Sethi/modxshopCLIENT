import axios from "axios";
import {store} from "./redux/store"

const BASE_URL = "http://localhost:5000/api/";
const checkToken = store.getState().user.currentUser;

const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken || "";
// console.log(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken);
// const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNTlmMzdjMDUxYTBkZmI0NmVhODVmMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzMzM3NDI2MSwiZXhwIjoxNjMzODA2MjYxfQ.wCJAcE-AMdtirrHav72H18YFDnxKTjxDhFjxdhKhvrs"
console.log(TOKEN)
export const publicRequest = axios.create({
    baseURL : BASE_URL,
})
export const userRequest = axios.create({
    baseURL : BASE_URL,
    header : {token : `myToken ${TOKEN}`},
})
