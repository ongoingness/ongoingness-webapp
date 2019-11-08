const state = {
    user: null,
    codes: []
};

const mutations = {

    setLogFormUser: (state, user) => {
        state.user = user;
    },

    addCodeToLogForm: (state, code) => {
        state.codes.push(code);
    },

    removeCodeFromLogFrom: (state, code) => {
        var index = state.code.indexOf(code);
        if(index > -1) {
            state.code = state.code.splice(index, 1);
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