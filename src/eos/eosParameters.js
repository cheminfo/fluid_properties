import {
  getVDWParameters,
  getPRParameters,
  getRKParameters,
  getRKSParameters,
} from './getEOSParameters.js';

export class EOSParameters {
  constructor(molecularFluid, options = {}) {
    let { temperature = 298, eos = 'pr' } = options;
    this.eos = eos;
    this.temperature = temperature;
    this.A = null;
    this.B = null;
    this.alpha = null;
    this.beta = null;
    this.gamma = null;
    this.p = null;
    this.q = null;
    this.Delta = null;
    let parameters;

    switch (eos) {
      case 'vdw':
        parameters = getVDWParameters(molecularFluid);
        break;
      case 'pr':
        parameters = getPRParameters(molecularFluid, temperature);
        break;
      case 'rk':
        parameters = getRKParameters(molecularFluid, temperature);
        break;
      case 'rks':
        parameters = getRKSParameters(molecularFluid, temperature);
        break;
      default:
        throw new Error('Unkown EOS type');
    }

    this.a = parameters.a;
    this.b = parameters.b;
    this.S = parameters.S;
    this.k = parameters.k;
    this.u = parameters.u;
    this.w = parameters.w;
  }
}
