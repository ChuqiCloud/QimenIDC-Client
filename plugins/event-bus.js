import Vue from "vue";

const EventBus = new Vue();

Vue.prototype.$bus = EventBus;