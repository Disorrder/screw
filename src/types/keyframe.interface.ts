import Screw from "../screw";
import * as easing from "../easing";
import { IAnimatable } from "./animatable.interface";

export interface IKeyframe {
  offset?: number | "prev"; // Absolute screw time from 0. 'prev' means frame will begin simultaneously with previous frame.
  delay?: number; // Delay after prev frame completed. Can be negative. Don't use together with offset.
  duration: number;
  repeat: number;
  easing: easing.Easing;
  animate: IAnimatable[];

  run?: (frame: IKeyframe) => void;
  begin?: (frame: IKeyframe) => void;
  complete?: (frame: IKeyframe) => void;

  _screw: Screw;
  _time: number; // frame current time [0 .. 1]
  _startTime: number; // Absolute screw time from 0. Affected by prev frame and delay
  _endTime: number; // Affected by _startTime and duration
  _isBegan: boolean;
  _isCompleted: boolean;
}
