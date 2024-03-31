import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./index.scss";

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import VueApexCharts from "vue3-apexcharts";

createApp(App).use(ElementPlus).use(store).use(router).use(VueApexCharts).mount("#app");
