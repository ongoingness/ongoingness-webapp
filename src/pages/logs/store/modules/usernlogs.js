const state = {
    users: [], 
};

const mutations = {

    setUsers: (state, payload) => {

        state.users.length = 0;

        for(let index = 0; index < payload.length; index++) {
            state.users.push(payload[index]);
        }
        
    }

}

const actions = {};

const getters = {
    getUsers: state => state.users,
}

export default {
    state,
    mutations,
    actions,
    getters,
};