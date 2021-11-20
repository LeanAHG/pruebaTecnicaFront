import { GET_RACES } from "../actions/razaActions";

const INITIAL_STATE = {
    races: []
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_RACES:
            return {
                ...state, 
                races: action.payload
            };

        default:
            return { ...state };
    }
}

export default reducer;