
import { historySize, daoedPrefixer, defaultAvatarColors } from "./constants";

import axios from "axios";

export const client = {
  get: async (url) => {
    try {
      const result = await axios.get(url);
      return result.data;
    } catch {
      return null;
    }
  },
  post: async (url, params) => {
    try {
      const result = await axios.post(url, params);
      return result.data;
    } catch {
      return null;
    }
  }
};

export const addHistory = (value, array) => {
  const len = array.length;
  if (len < historySize) {
    array.push(value);
    return array;
  } else {
    array.splice(historySize - 1);
    array.push(value);
    return array;
  }
};

export const filer = name => `${daoedPrefixer}${name}`;

export const initialsAvatar = (name, colors = defaultAvatarColors, size = "52px") => {
  name = name.replace(/\s+/g, " ").trim();

  const nameSplit = name.split(" ");
  let initials;

  if (nameSplit.length >= 2) {
    initials = nameSplit[0].charAt(0) + nameSplit[1].charAt(0);
  } else {
    name = name.split(".")[0];
    initials = name.charAt(0) + name.charAt(name.length - 1);
  }

  initials = initials.toUpperCase();

  const charCodes = initials
    .split("")
    .map(char => char.charCodeAt(0))
    .join("");

  const color = colors[parseInt(charCodes, 10) % colors.length];

  return {
    content: initials,
    style: {
      backgroundColor: color,
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      color: "#fff",
      fontWeight: "bold",
      fontSize: "30px"
    }
  };
};
