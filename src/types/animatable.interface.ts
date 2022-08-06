export interface IAnimatable {
  target: any;
  from?: any;
  to?: any;
  by?: any;
  setter?: (target: any) => void;

  _target: any;
  _delta: any;
}
