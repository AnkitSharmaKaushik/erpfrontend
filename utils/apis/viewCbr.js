import { getWithAuth } from "../../src/provider/helper/axios"
import { VIEWCBRDETAILS } from "../constants/urls"

export const viewCbrAPI = async (id) =>{
    const response = getWithAuth(VIEWCBRDETAILS(id))
    const data = await response
    return data
}