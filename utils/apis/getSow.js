import { getWithAuth } from "../../src/provider/helper/axios"
import { SOW_LIST } from "../constants/urls"

export const getSow = async (id) =>{
    const response = getWithAuth(SOW_LIST(id))
    const data = await response
    return data
}