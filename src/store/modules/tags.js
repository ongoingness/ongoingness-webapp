/**
 Author: Luis Carvalho
 Description:
 - Store for tags.
 */

/* eslint-disable */
const state = {
    tags: [],
    time_tags:[],
    places_tags: [],
    people_tags: [],
  };
  
  const mutations = {

    addTags: (state, payload) => {

        for(let index = 0; index < payload.tags.length; index++) {
            state.tags.push(payload.tags[index].name);
        }

        for(let index = 0; index < payload.time.length; index++) {
            state.time_tags.push(payload.time[index].value);
        }

        for(let index = 0; index < payload.places.length; index++) {
            state.places_tags.push(payload.places[index].name);
        }

        for(let index = 0; index < payload.people.length; index++) {
            state.people_tags.push(payload.people[index].name);
        }

        state.tags.sort( compare );
        state.time_tags.sort( compare );
        state.places_tags.sort( compare );
        state.people_tags.sort( compare ); 
        
    },
  
  };
  
  function compare( a, b ) {
    if ( a < b ){
      return -1;
    }
    if ( a > b ){
      return 1;
    }
    return 0;
  }
  
  const actions = {};
  
  const getters = {
    getTags: state => state.tags,
    getTimeTags: state => state.time_tags,
    getPlacesTags: state => state.places_tags,
    getPeopleTags: state => state.people_tags,
  };
  
  export default {
    state,
    mutations,
    actions,
    getters,
  };
  