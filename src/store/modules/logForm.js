const state = {
    user: null,
    codes: []
};

const mutations = {

    setLogFormUser: (state, user) => {
        state.user = user;
    },

    updateLogFormCode: (state, code) => {
        if(state.codes.includes(code)) {
            var index = state.codes.indexOf(code);
            if(index > -1)
                state.codes.splice(index, 1);
        } else {
            state.codes.push(code);
        }
    },

};

const actions = {};

const getters = {
    getLogFormUser: state => state.user,
    getLogFormCodes: state => state.codes,
};

export default {
    state,
    mutations,
    actions,
    getters,
};