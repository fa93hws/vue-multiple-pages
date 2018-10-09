import Vue from 'vue';
import App1 from './app1';
import App2 from './app2';

import './style.css';

new Vue({
  el: '#vue-app1',
  render: h => h(App1)
});

new Vue({
  el: '#vue-app2',
  render: h => h(App2)
});