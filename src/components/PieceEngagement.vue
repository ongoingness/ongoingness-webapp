<template lang="pug">
div#media.container
    div(style="display: inline;")
        h2.is-size-3(style="display: inline;") {{ this.pageTitle }} 
        button.button.is-primary(v-if="!showButtons" @click="goBack" style="display: inline; margin-top: 8px;") Go Back
    div.media-collection(v-if="showButtons")
        button.button.is-primary.is-large.is-outlined.metric(@click="showNumberOfSessions") Number of Sessions
        button.button.is-primary.is-large.is-outlined.metric Length of Sessions
        button.button.is-primary.is-large.is-outlined.metric Number of Images Viewed
        button.button.is-primary.is-large.is-outlined.metric Time of Day
        button.button.is-primary.is-large.is-outlined.metric Time Between Sessions
        button.button.is-primary.is-large.is-outlined.metric Total Wear Time
        button.button.is-primary.is-large.is-outlined.metric Skipped Days
        button.button.is-primary.is-large.is-outlined.metric Wear Window
        button.button.is-primary.is-large.is-outlined.metric False Starts
    div(v-else)
        NumberOfSessions(v-if="this.numberOfSessions")

</template>

<script>
import Notification from './views/Notification.vue';
import MediaItem from './MediaItem.vue';
import NumberOfSessions from './NumberOfSessions.vue';
// import API from '../api';

export default {
  name: 'PieceEngagement',
  components: {
      NumberOfSessions,
  },
  data() {
    return {
        pageTitle: "Piece Engagement", 
        numberOfSessions: false,
        lengthOfSessions: false,
        numberOfImagesViewed: false,
        timeOfDay: false,
        timeBetweenSessions: false,
        totalWearTime: false,
        skippedDays: false,
        wearWindow: false,
        falseStarts: false,
    };
  },
  computed: {
      showButtons() {
          return !this.numberOfSessions && 
          !this.lengthOfSessions && !this.numberOfImagesViewed && 
          !this.timeOfDay && !this.timeBetweenSessions && !this.totalWearTime && 
          !this.skippedDays && !this.wearWindow && !this.falseStarts;
      }
  },

  methods: {
    
    goBack() {
        this.pageTitle = "Piece Engagement";
        this.numberOfSessions = false;
        this.lengthOfSessions = false;
        this.numberOfImagesViewed = false;
        this.timeOfDay = false;
        this.timeBetweenSessions = false;
        this.totalWearTime = false;
        this.skippedDays =  false;
        this.wearWindow = false;
        this.falseStarts =  false;
    },

    showNumberOfSessions() {
        this.pageTitle = "Number of Sessions";
        this.numberOfSessions = true;
    }
    /*
    lengthOfSessions: false,
     numberOfImagesViewed: false,
        timeOfDay: false,
        timeBetweenSessions: false,
        totalWearTime: false,
        skippedDays: false,
        wearWindow: false,
        falseStarts: false,*/
  },
};
</script>

<style scoped lang="scss">

.metric {
    display: inline-block;
    margin-bottom: 8px;
    width: 350px;
    height: 100px;
    margin-right: 8px;
}


#media {
  margin-bottom: 5%;

  .all-media {
    margin-top: 2.5%;
  }

  .is-size-3 {
    margin-top: 1.25%;
  }

  .is-size-4 {
    margin-top: 1.25%;
  }

  .media-item {
    display: inline-block;
    margin-bottom: 8px;
    width: 100%;
    margin-right: 8px;
  }

  @media screen and (min-width: 800px) {
    .media-item {
      width: calc(25% - 6px);
    }

    .media-item:nth-of-type(2n) {
      margin-right: 6px;
    }

    .media-item:nth-of-type(4n) {
      margin-right: 0;
    }
  }

  .media-collection {
    flex-flow: row;
    flex-wrap: wrap;
    margin-top: 2.5%;
    text-align: center;
  }

  .media-header {
    margin-top: 2.5%;
  }
}
@media (max-width: 1080px) {
  #media {
    margin-left: 32px;
    margin-right: 32px;
  }
}
</style>
