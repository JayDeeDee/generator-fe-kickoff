module.exports = {
  markup: {
    command: 'gulp template'
  },
  markupdist: {
    command: 'gulp template--option app'
  },
  vrtreference: {
    command: 'npm run backstop-reference'
  },
  vrttest: {
    command: 'npm run backstop-test'
  },
  vrttestvrtapprove: {
    command: 'npm run backstop-approve'
  },
  vrtreport: {
    command: 'npm run backstop-openReport'
  },

};
