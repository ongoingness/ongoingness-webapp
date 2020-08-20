const state = {
    codes: [],
};

const mutations = {
    addLoggingCode: (state, payload) =>  {
        if(!state.codes.includes(payload))
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