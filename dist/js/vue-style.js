var app = new Vue({
  el: '#app',
  data: {
    img: [
      {
      url: '../image/pduct1.png'
    }
  ],
  showHide: true
  },
  computed: {},
  methods: {
    showTitle: function (event) {
      if(app.showHide) {
        app.showHide = false;
      } else {
        app.showHide = true;
      }
    }
  }
})
