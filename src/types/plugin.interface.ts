import Screw from "../screw";

export interface IPlugin {
  name: string;
  description?: string;
  mutateClass?: (Class: typeof Screw) => void;
}
