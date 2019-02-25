<template lang="pug">
  footer#footer.footer.has-text-centered
    div.container
      h6.is-size-4 Ongoingness
      p Ongoingness by&nbsp;
        |
        a(
        href="https://openlab.ncl.ac.uk/"
        ) Open Lab, Newcastle University
        | , and&nbsp;
        a(
        href="https://www.northumbria.ac.uk"
        ) Northumbria University
        | .
      p
        | The software is licensed under&nbsp;
        a(
        href="https://opensource.org/licenses/BSD-3-Clause"
        ) BSD-3
        | . Checkout the&nbsp;
        a(
        href="https://github.com/digitalinteraction"
        ) source code
        | &nbsp;on Github.
        br
        | If you have any questions about your data or wish for it to be removed, then please
        | send an email to&nbsp;
        a(
        href="mailto:openlab-admin@ncl.ac.uk"
        ) Open Lab.
</template>

<script>
  export default {
    name: 'FooterBar',
  };
</script>

<style scoped>
  footer {
    min-height: 25vh;
  }
  p {
    padding-top: 5%;
  }
</style>
