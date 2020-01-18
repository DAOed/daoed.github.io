/**
* Helpers module is a set of utilities
* @module Helpers
*/

import axios from "axios";
import * as Crypt from "hybrid-crypto-js";
import { historySize, defaultAvatarColors, avatarSize } from "./constants";

const client = {
  get: async (url) => {
    try {
      const result = await axios.get(url);
      return result.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  post: async (url, params) => {
    try {
      const result = await axios.post(url, params);
      return result.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
};

/**
* @name Cryptor
* @description Encryption and decryption library that works in node.js, browser and native(react-native)
* @see {@link https://www.npmjs.com/package/react-native-aes-crypto} for usage
* @todo Build helper functions out of this
*/
const Cryptor = Crypt;

/**
* @function addHistory
* @param {string} newHistoryItem - The new history item to add
* @param {array} historyItems - Existing history items
* @see {@link historySize} for default history size
* @returns {array} returns history items trimmed to their max size with the new item appended
*/
const addHistory = (newHistoryItem, historyItems, hSize = historySize) => {
  const len = historyItems.length;
  if (len < hSize) {
    historyItems.push(newHistoryItem);
    return historyItems;
  } else {
    historyItems.splice(hSize - 1);
    historyItems.push(newHistoryItem);
    return historyItems;
  }
};

/**
* @function filer
* @param {string} name - Path to prefix
* @param {string} prefix - Prefix
* @returns {string} returns path with prefix applied
*/
const filer = (name, prefix) => `${prefix}${name}`;

/**
* @function initialsAvatar
* @param {string} name - full name or username to generate avatar initials from
* @param {array} colors - color palette to use. See {@link defaultAvatarColors} for default
* @param {string} size - size of avatar. See {@link avatarSize} for default
* @returns {object} returns `{content, style}`, where content is string of initials and style is style of avatar
*/
const initialsAvatar = (name, colors = defaultAvatarColors, size = avatarSize) => {
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

const Helpers = { client, addHistory, filer, initialsAvatar, Cryptor };

export {
  Helpers as default, client, addHistory, filer, initialsAvatar, Cryptor
};
