import axios from "axios";
export const GET_RAZAS = "GET_RAZAS";

export function getRazas() {
    return async function (dispatch) {
        try{
            const {data} = await axios.get('http://localhost:1337/razas')
            dispatch({
                type: GET_RAZAS,
                payload: data
            })
        }
        catch(error){
            console.error(error)
        }
    }
}