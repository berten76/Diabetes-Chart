import axios from 'axios';

export const TESTREDUCER = 'TESTREDUCER';
export const INIT_GLOSE_VALUES = 'INIT_GLOSE_VALUES';
export const FETCH_GLOSE_VALUES_FAILED = 'FETCH_GLOSE_VALUES_FAILED';

export const setGlucoseValues = (data) => {
    return {
        type: INIT_GLOSE_VALUES,
        data: data
    }
}
export const setGucoseValuesFailed = (error) => {
    console.log('Error');
    console.log(error);
    return {
        type: FETCH_GLOSE_VALUES_FAILED,
        error: error
    }
}
export const initGlucoseValues = (startDate) => {
    return dispatch => {
        //axios.get('https://berten76app2.herokuapp.com/api/v1/entries.json?find[dateString][$gte]=2019-08-20')
        const query = 'https://berten76app2.herokuapp.com/api/v1/entries.json?find[date][$gte]='
        +startDate+'&count=10000';

        console.log(query);
        axios.get(query)   
        .then( response => {
                dispatch(setGlucoseValues(response.data));
            })
            .catch( error => {
                dispatch(setGucoseValuesFailed(error));
            })
    }
}

export const testReducer = () =>{
    return dispatch => {
        /*setTimeout( () => {
            dispatch(testReducerSync);
        }, 2000 );*/
       // Timer.periodic(Duration(seconds, 30), () => dispatch(action));
    }

}
const testReducerSync = () => {
    console.log("Test!!!!");
    return {
        type: TESTREDUCER
    };
}