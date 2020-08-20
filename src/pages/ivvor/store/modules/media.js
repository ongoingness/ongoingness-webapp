/* eslint-disable */
const state = {
  media: [],
};

const mutations = {
  updateMedia: (state, payload) => {
    state.media = payload;
  },

  addMedia: (state, payload) => {
    state.media.push(payload.payload);
  },

  removeMedia: (state, id) => {
    const idx = state.media.findIndex((media) => media._id === id);
    state.media.splice(idx, 1);
  }
};

const actions = {};

const getters = {
  getMedia: state => state.media,

  getMediaById: (state) => (id) => {
    return state.media.find((media) => media._id === id);
  },

  getMediaByTimeTag: state => {
    var mediaByDay = []
    console.log(state.media);
    state.media.forEach(element => {
      console.log(element);
      if(element.locket == "temporary" && element.times.length > 0) {
        const contentDate = new Date(Number(element.times[0].value));
        const month = contentDate.getMonth()+1;
        const day = contentDate.getDate()
        const dateId = `${month}-${day}`;

        var result = mediaByDay.some(day => {
          if(day.dateId === dateId) {
              day.content.push(element);
              return true
          }
        });

        console.log(mediaByDay);

        if(!result) {
          let newDay = {
            dateId: dateId,
            month: month,
            day: day,
            date: new Date(1970, month-1, day),
            content: [element]
          }
          mediaByDay.push(newDay);
        }
      }
    });

    return mediaByDay;
  },

};

export default {
  state,
  mutations,
  actions,
  getters,
};
