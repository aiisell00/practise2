import axios from'axios'
import { BASE_URL } from "./constant";

export async function getAllData() {
    try {
        const response=await axios(`${BASE_URL}/course`)
        return response
    } catch (error) {
        console.log(error)
    }
}
export async function getDataById(id) {
    try {
        const response=await axios(`${BASE_URL}/course/${id}`)
        return response
    } catch (error) {
        console.log(error)
    }
}
export async function addNewData(payload) {
    try {
        const response=await axios.post(`${BASE_URL}/course`,payload)
        return response
    } catch (error) {
        console.log(error)
    }
}
export async function deleteDataById(id) {
    try {
        const response=await axios.delete(`${BASE_URL}/course/${id}`)
        return response
    } catch (error) {
        console.log(error)
    }
}