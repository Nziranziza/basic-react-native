import plus from "./xml/plus";
import upload from "./xml/upload";
import x from "./xml/x";
import empty from "./xml/empty";

const icons = {
  plus,
  upload,
  x,
  empty
};

export type IconNames = keyof typeof icons;

export default icons;
