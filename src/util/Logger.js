'use strict';
import Config from '../config/Config.js';

/* eslint-disable */
class Logger {
  constructor(obj) {
    this.modeList = ['debug', 'info', 'warn', 'error', 'trace'];
    this.phase = obj.phase || 'LOCAL';
    this.showPhase = obj.showPhase || true;
    this.mode = obj.mode || 'debug';
  }

  debug() {
    if (this.phase !== 'REAL') {
      console.log(this.showPhase ? '[' + this.phase + ']' : '', ...arguments);
    }
  }

  info() {
    if (this.phase !== 'REAL' && this.modeList.indexOf(this.mode) > 0) {
      console.info(this.showPhase ? '[' + this.phase + ']' : '', ...arguments);
    }
  }

  warn() {
    if (this.phase !== 'REAL' && this.modeList.indexOf(this.mode) > 1) {
      console.warn(this.showPhase ? '[' + this.phase + ']' : '', ...arguments);
    }
  }

  error() {
    if (this.phase === 'REAL' || this.modeList.indexOf(this.mode) > 2) {
      console.error(this.showPhase ? '[' + this.phase + ']' : '', ...arguments);
    }
  }

  trace() {
    if (this.phase !== 'REAL') {
      console.trace(this.showPhase ? '[' + this.phase + ']' : '', ...arguments);
    }
  }
}

const initParam = {
  phase: Config.APPLICATION_PHASE,
  showPhase: true,
  mode: 'debug',
};

const logger = new Logger(initParam);
export default logger;
