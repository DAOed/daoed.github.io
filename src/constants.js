
/**
* Constants module contains the defaults values used in this library
* @module Constants
*/

/** Base public BlockStack API endpoint
* @constant
* @type {string}
* @default
*/
export const baseBlockstackApi = "https://core.blockstack.org/v1";

/** Algorithm weight
* @constant
* @type {number}
* @default
*/
export const algorithmWeigth = 3;

/** Base social weight for account quality filtering
* @constant
* @type {number}
* @default
*/
export const socialWeigth = 3;

/** Constant factors in account quality rankings
* @constant
* @type {array}
* @default
*/
export const constantWeigths = ["name", "bio", "image"];

/** Size of history list
* @constant
* @type {number}
* @default
*/
export const historySize = 50;

/** Prefix used for DAOed files
* @constant
* @type {string}
* @default
*/
export const daoedPrefixer = "daoed.";

/** Default avatar size
* @constant
* @type {string}
* @default
*/
export const avatarSize = "52px";

/** Color palette to use used for avatar background colors
* @constant
* @type {array}
* @default
*/
export const defaultAvatarColors = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#e67e22", "#e74c3c", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"];
