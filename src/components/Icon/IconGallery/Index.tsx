import React, {SVGProps} from "react";
import ArrowDropdown from './Icons/ArrowDropdown';
import Filter from "./Icons/Filter";
import Calendar from "./Icons/Calendar";
import Lookup from "./Icons/Lookup";
import User from "./Icons/User";
import Trash from "./Icons/Trash";
import Pdf from "./Icons/Pdf";
import Plus from "./Icons/Plus";
import PowerOff from "./Icons/PowerOff";

interface IconProps extends SVGProps<SVGSVGElement> {
  icon: IconDefinition;
  style?: React.CSSProperties;
  size?: number;
  color?: string;
  secondaryColor?: string;
}

type IconDefinition =
  "ArrowDropdown"
  | "Lookup"
  | "Filter"
  | "User"
  | "Trash"
  | "Plus"
  | "Calendar"
  | "Pdf"
  | "PowerOff";

const Icons: {
  [key: string]: React.FC<IconProps>;
} = {ArrowDropdown, Lookup, Filter, User, Trash, Plus, Calendar, Pdf, PowerOff};

export type {IconDefinition, IconProps};
export default Icons;
