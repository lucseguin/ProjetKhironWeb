export const ROLE_SETTINGS_MANAGE_ACCOUNTS = 1;
export const ROLE_SETTINGS_GEO_FENCED = 2;
export const ROLE_MOBILE_SILENCE_NOTIFICATIONS = 4;
export const ROLE_MOBILE_HIDE_REQUESTS = 8;

export const MODULE_BEDS_VIEW = 16;
export const MODULE_BEDS_UPDATE = 32;
export const ROLE_CONFIG_FLOOR = 64;
export const MODULE_BEDS_CONFIG_BED = 128;

export const ROLE_BEARER_VIEW = 256;
export const MODULE_BEARER_UPDATE = 512;
export const ROLE_BEARER_CONFIG = 1024;
export const ROLE_BEARER_NEW_REQUEST = 2048;

export const ROLE_CLEANER_VIEW = 4096;
export const MODULE_CLEANER_UPDATE = 8192;
export const ROLE_CLEANER_CONFIG = 16384;
export const ROLE_CLEANER_NEW_REQUEST = 32768;

export const ROLE_MOBILE_OOS_STATS = 65536;
export const ROLE_MOBILE_ADJUST_SERVICE_LEVEL = 131072;

export const ROLE_SETTINGS_MANAGE_ROLES = 262144;

export const ROLE_VISITOR_VIEW = 524288;
export const ROLE_VISITOR_NEW_REQUEST = 1048576;
export const ROLE_VISITOR_CONFIG = 2097152;

export const ROLE_JOURNAL_SEARCH = 4194304;
export const ROLE_JOURNAL_PDF= 8388608;

export const isEnabled = (userAccess, functionality) => {
    var t = (userAccess&&functionality);
    return (t===functionality);
}
