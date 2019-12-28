import * as actionTypes from '../actions/actions'

const initialState = {
    counter: 0,
    result:[],
    glucoseData:[]
};

const reducer = (state=initialState, action) => {
    //console.log(action)
    if(action.type=== actionTypes.TESTREDUCER) {
        console.log('Test');
        
    }
    if(action.type === actionTypes.INIT_GLOSE_VALUES) {
        console.log(action.data.length);
        if(action.data === [] || action.data.length===0){
            console.log('no new data');
            return state;
        }
        console.log('new data');
        return {
            
            ...state,
            glucoseData: [...state.glucoseData, ...action.data.reverse()]
        }
    }
    return state;
};
export default reducer;
