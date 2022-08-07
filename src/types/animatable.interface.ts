export interface IAnimatable {
  target: any;
  from?: any;
  to?: any;
  by?: any;
  setter?: (target: any) => void;
  // TODO: refactor, hide the privates
  _target?: any;
  _delta?: any;
}
