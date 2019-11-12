const state = {
    logs: [],
    currentPage: 1,
    lastPage: 0,
}

const mutations = {

    setLastPage: (state, lastPage) => {
        state.lastPage = lastPage;
    },

    addLogPage: (state, logPage) => {
        state.logs.push(logPage);
    },

    goToNextPage: (state) => {
        if(state.currentPage != state.lastPage)
            state.currentPage++;
    },

    goToPreviousPage: (state) => {
        if(state.currentPage > 1)
            state.currentPage--;
    },

    goToPage: (state, page) => {
        if(page > 0 && page <= lastPage) {
            state.currentPage = page;
        }
    },

    resetLogs: (state) => {
        state.logs.length = 0;
    }

}

const actions = {

}

const getters = {
    getCurrentLogPage: (state) => {
        let result = state.logs.find((logPage) => logPage.index === state.currentPage);
        if(result != null) return result.logs 
    } ,

    getLogPage: (state) => (index) => {
        let result = state.logs.find((logPage) => logPage.index === index);
        if(result != null) return result.logs 
    },

    getAllLogPages: state => state.logs
}

export default {
    state,
    mutations,
    actions,
    getters,
};