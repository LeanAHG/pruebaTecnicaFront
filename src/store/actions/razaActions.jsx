import axios from "axios";
export const GET_RACES = "GET_RAZAS";

export function getRaces() {
    return async function (dispatch) {
        try{
            const {data} = await axios.get('http://localhost:1337/races')
            dispatch({
                type: GET_RACES,
                payload: data
            })
        }
        catch(error){
            console.error(error)
        }
    }
}