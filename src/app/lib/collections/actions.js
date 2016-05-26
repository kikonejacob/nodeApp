import {getCollectionParams} from './collectionHelpers.js';
import {ShouldFetch,APIgetFetch,APIdeleteFetch,APIpostFetch,APIputFetch} from 'utils/asyncHelper';
import {FETCH_COLLECTION,INIT_COLLECTION,SET_COLLECTION_OPTIONS,CHANGE_STATE} from './actionTypes';


export function fetchCollection(name,tUrl,options){
    return (dispatch, getState) => {
        let state=getState().collections[name];
        let params=(options==undefined)?state.options:options;
        let url=(tUrl==undefined)?state.url:tUrl;
        params=getCollectionParams(url,params);
        params.url=url;
        params.collectionName=name;
        if (ShouldFetch(state)) {
            return dispatch(APIgetFetch(url,FETCH_COLLECTION,params));
        }
    };

}



export function initCollection(name,url){
    console.log(INIT_COLLECTION);
    return {type:INIT_COLLECTION,
            collectionName:name,
            url};
}

export function refreshCollection(name,options)
{
    return fetchCollection(name,null,options);
}

export function setCollectionOptions(name,options){
    return {type:SET_COLLECTION_OPTIONS,
            collectionName:name,
            options};
}