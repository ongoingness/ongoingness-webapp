<template lang="pug">
    div(style="text-align: center;")
     ChartForm
     svg.chart(
      :height='height'
      :width='width')
    
</template>

<script>
import * as d3 from "d3";
import API from '../../../api';
import ChartForm from './ChartForm.vue';


export default {
  name: 'NumberOfSessions',
  components: {
       ChartForm
  },

async mounted() {
    var timescale = "m";
    var token = this.$store.getters.getToken;
    var result = await API.numberOfSessions(token, "5db6ed2a18eef30011ee2a9a", timescale, 1572220800000, 1575331199999);
    return this.renderChart(result, timescale);    

},
  data() {
    return {
        data: {
            maxSession: 6,
            chartData: [ 
                { timestamp: "11/24", sessions: 0 },
                { timestamp: "11/25", sessions: 2 },
                { timestamp: "11/26", sessions: 3 },
                { timestamp: "11/27", sessions: 4 },
                { timestamp: "11/28", sessions: 1 },
                { timestamp: "11/29", sessions: 3 },
                { timestamp: "11/30", sessions: 0 },
                { timestamp: "11/31", sessions: 0 },
                { timestamp: "12/01", sessions: 3 },
                { timestamp: "12/02", sessions: 1 },
                { timestamp: "12/03", sessions: 2 },
                { timestamp: "12/04", oldtimestamp: 1574899200000, sessions: 3 },
                { timestamp: "12/05", oldtimestamp: 1574899200000, sessions: 0 },
                { timestamp: "12/06", oldtimestamp: 1574899200000, sessions: 4 },
                { timestamp: "12/07", oldtimestamp: 1574899200000, sessions: 5 },
                { timestamp: "12/08", oldtimestamp: 1574899200000, sessions: 6 },
                { timestamp: "12/09", oldtimestamp: 1574899200000, sessions: 3 },
                { timestamp: "12/10", oldtimestamp: 1574899200000, sessions: 2 },
                { timestamp: "12/11", oldtimestamp: 1574899200000, sessions: 3 },
                { timestamp: "12/12", oldtimestamp: 1574899200000, sessions: 0 },
                { timestamp: "12/13", oldtimestamp: 1574899200000, sessions: 0 },
                { timestamp: "12/14", oldtimestamp: 1574899200000, sessions: 4 },
                { timestamp: "12/15", oldtimestamp: 1574899200000, sessions: 3 },
                { timestamp: "12/16", oldtimestamp: 1574899200000, sessions: 2 },
                { timestamp: "12/17", oldtimestamp: 1574899200000, sessions: 1 },
                { timestamp: "12/18", oldtimestamp: 1574899200000, sessions: 4 },

            ]
         },
        showTags: false,
        height: 600,
        width: 600,
    };
  },
  methods: {

renderChart(session_val, timescale) {
      const margin = 60;
      const svg_width = 1000;
      const svg_height = 600;
      const chart_width = 1000 - 2 * margin;
      const chart_height = 600 - 2 * margin;

      const svg = d3
        .select(".chart")
        .attr("width", svg_width)
        .attr("height", svg_height);

      this.chart = svg
        .append("g")
        .attr("transform", `translate(${margin}, ${margin})`);

      const yScale = d3
        .scaleLinear()
        .range([chart_height, 0])
        .domain([0, session_val.maxSession]);

      this.chart
        .append("g")
        .call(d3.axisLeft(yScale).ticks(session_val.maxSession));

      const xScale = d3
        .scaleBand()
        .range([0, chart_width])
        .domain(session_val.chartData.map(s => s.timestamp))
        .padding(0.2);

      this.chart
        .append("g")
        .attr("transform", `translate(0, ${chart_height})`)
        .call(d3.axisBottom(xScale));

      const barGroups = this.chart
        .selectAll("rect")
        .data(session_val.chartData)
        .enter();

      barGroups
        .append("rect")
        .attr("class", "bar")
        .attr("x", g => xScale(g.timestamp))
        .attr("y", g => yScale(g.sessions))
        .attr("height", g => chart_height - yScale(g.sessions))
        .attr("width", xScale.bandwidth()+10)
        .attr("x", a => xScale(a.timestamp) - 5)
        .style("fill", d3.color("steelblue"))
        .attr("text-anchor", "middle")
        .attr("opacity", 0.6)

      svg
        .append("text")
        .attr("class", "label")
        .attr("x", -(chart_height / 2) - margin)
        .attr("y", margin / 2.4)
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "middle")
        .text("Number of Sessions");
    
    if(timescale == "d")
      svg
        .append("text")
        .attr("class", "label")
        .attr("x", chart_width / 2 + margin)
        .attr("y", chart_height + margin * 1.7)
        .attr("text-anchor", "middle")
        .text("Days");
    else if (timescale == "w")
        svg
        .append("text")
        .attr("class", "label")
        .attr("x", chart_width / 2 + margin)
        .attr("y", chart_height + margin * 1.7)
        .attr("text-anchor", "middle")
        .text("Weeks");
    else if (timescale == "m")
        svg
        .append("text")
        .attr("class", "label")
        .attr("x", chart_width / 2 + margin)
        .attr("y", chart_height + margin * 1.7)
        .attr("text-anchor", "middle")
        .text("Months");


    }
  
  },
  computed: {

  },
};
</script>

<style scoped lang="scss">
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
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    margin-top: 2.5%;
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
