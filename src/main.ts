import { NODES } from './constants';
import { DAG } from './lib';
import './style.css';

const app = document.getElementById('app');
if (app) {
  const dag = new DAG(app, NODES);
  dag.update();
  dag.render();
}
