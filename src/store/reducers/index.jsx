import { GET_RAZAS } from "../actions/razaActions";

const INITIAL_STATE = {
    razas: []
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_RAZAS:
            return {
                ...state, 
                razas: action.payload
            };

        default:
            return { ...state };
    }
}

export default reducer;