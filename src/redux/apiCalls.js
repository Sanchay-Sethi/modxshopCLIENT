import { loginFailure, loginStart, loginSuccess, updateStart, updateSuccess, updateFailure} from "./userRedux"
import {publicRequest, userRequest} from "../requestMethods"

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data))
    } catch (error) {
        dispatch(loginFailure())
    }
}
export const update = async (dispatch, user) => {
    dispatch(updateStart());
    try {
        const res = await userRequest.put(`/users/${user.id}`, user);
        dispatch(updateSuccess(res.data))
    } catch (error) {
        dispatch(updateFailure())
    }
}