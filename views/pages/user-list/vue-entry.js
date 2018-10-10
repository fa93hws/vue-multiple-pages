import Vue from 'vue';
import UserList from './list';

new Vue({
  el: '#userContainer',
  render: h => h(UserList)
});