const state = {
    codes: [],
};

const mutations = {
    addLoggingCode: (state, payload) =>  {
        state.codes.push(payload);
    },
};

const actions = {};

const getters = {
    getLoggingCodes: state => state.codes,
};

export default {
    state,
    mutations,
    actions,
    getters,
};