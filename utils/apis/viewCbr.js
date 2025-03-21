import { getWithAuth } from "../../src/provider/helper/axios"
import { VIEW_CBR_DETAILS } from "../constants/urls"

export const viewCbrAPI = async (id) =>{
    const response = getWithAuth(VIEW_CBR_DETAILS(id))
    const data = await response
    return data
}