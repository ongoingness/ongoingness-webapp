import API from '../../api';

const state = {
    user: null,
    codes: [],
    from: 0,
    to: 0,
    logs: [],
    currentPage: 1,
    lastPage: 0,
    lastIndexAdded: 0,
    pageRequestAmount: 10,
    pageSize: 20,
}

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

    setLogFormFrom: (state, timestamp) => {
        state.from = timestamp;
    },

    setLogFormTo: (state, timestamp) => {
        state.to = timestamp
    },

    setLastPage: (state, lastPage) => {
        state.lastPage = lastPage;
    },

    addLogPage: (state, logPage) => {
        state.logs.push(logPage);
    },

    goToNextPage: (state, token) => {
        if(state.currentPage != state.lastPage) {
            state.currentPage++;

            if(state.currentPage == Math.floor(state.lastIndexAdded / 2)) {

                return new Promise( async resolve => {
                
                    var result = await API.searchLogs(token, state.codes, state.user, Number(state.lastIndexAdded), Number(state.pageRequestAmount), Number(state.pageSize), state.from, state.to);

                    if(result.pages.length > 0) {

                        for(var i = 0; i < result.pages.length; i++) {
                            if(result.pages != null)
                                state.logs.push(result.pages[i]);
                        }
                        state.lastIndexAdded = result.pages[result.pages.length-1].index;
                    }
                });
            }
        }
    },

    goToPreviousPage: (state, token) => {
        if(state.currentPage > 1) {
            state.currentPage--;

            let found = false;
            for(let i = 0; i < state.logs.length && !found; i++) {
                found = state.logs[i].index == state.currentPage;
            }

            if(!found) {

                return new Promise( async resolve => {
            
                    var result = await API.searchLogs(token, state.codes, state.user, Number(state.currentPage), 1, Number(state.pageSize), state.from, state.to);
    
                    if(result.pages.length > 0) {
    
                        for(var i = 0; i < result.pages.length; i++) {
                            if(result.pages != null)
                                state.logs.push(result.pages[i]);
                        }

                    }
                });

            }
        }
    },

    goToPage: (state, parameters) => {
        if(parameters.page > 0 && parameters.page <= state.lastPage) {
            state.currentPage = Number(parameters.page);
            
            let found = false;
        
            for(let i = 0; i < state.logs.length && !found; i++) {
                found = state.logs[i].index == parameters.page;
            }    

            if(!found) {

                return new Promise( async resolve => {
              
                    var result = await API.searchLogs(parameters.token, state.codes, state.user, state.currentPage, 1, Number(state.pageSize), state.from, state.to);
    
                    if(result.pages.length > 0) {
    
                        for(var i = 0; i < result.pages.length; i++) {
                            if(result.pages != null)
                                state.logs.push(result.pages[i]);
                        }
    
                    }
                });

            }

        }
    },

    setLogPageAdded: (state, page) => {
        state.lastIndexAdded = page;
    },

    resetLogs: (state) => {
        state.logs.length = 0;
        state.currentPage = 1;
        state.lastPage = 0;
    },

}

const actions = {

}

const getters = {

    getLogFormUser: state => state.user,
    getLogFormCodes: state => state.codes,
    getLogFormFrom: state => state.from,
    getLogFormTo: state => state.to,

    getCurrentLogPage: (state) => {
        let result = state.logs.find((logPage) => logPage.index === state.currentPage);
        if(result != null) 
            return result.logs
        else 
            return null
    } ,

    getLogPage: (state) => (index) => {
        let result = state.logs.find((logPage) => logPage.index === index);
        if(result != null) return result.logs 
    },

    getAllLogPages: state => state.logs,

    getCurrentLogPageIndex: state => state.currentPage,

    getLastLogPageIndex: state => state.lastPage,

    getLogPageRequestAmount: state => state.pageRequestAmount,

    getLogPageSize: state => state.pageSize,
}

export default {
    state,
    mutations,
    actions,
    getters,
};