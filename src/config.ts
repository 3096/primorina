// for license and source, visit https://github.com/3096/primorina

const SCRIPT_VERSION = "1.20";

const SHEET_SOURCE_ID = '1p-SkTsyzoxuKHqqvCJSUCaFBUmxd5uEEvCtb7bAqfDk';
const SHEET_SOURCE_SUPPORTED_LOCALE = "en_GB";
const SHEET_SCRIPT_IS_ADD_ON = false;

// sheet names
const SHEET_NAME_DASHBOARD = "Dashboard";
const SHEET_NAME_CHANGELOG = "Changelog";
const SHEET_NAME_AVAILABLE = "Available";
const SHEET_NAME_README = "README";
const SHEET_NAME_PRIMOGEM_LOG = "Primogem Log";
const SHEET_NAME_PRIMOGEM_YEARLY_REPORT = "Primogem Yearly Report";
const SHEET_NAME_PRIMOGEM_MONTHLY_REPORT = "Primogem Monthly Report";
const SHEET_NAME_CRYSTAL_LOG = "Crystal Log";
const SHEET_NAME_CRYSTAL_YEARLY_REPORT = "Crystal Yearly Report";
const SHEET_NAME_CRYSTAL_MONTHLY_REPORT = "Crystal Monthly Report";
const SHEET_NAME_RESIN_LOG = "Resin Log";
const SHEET_NAME_RESIN_YEARLY_REPORT = "Resin Yearly Report";
const SHEET_NAME_RESIN_MONTHLY_REPORT = "Resin Monthly Report";
const SHEET_NAME_SETTINGS = "Settings";
const SHEET_NAME_MORA_LOG = "Mora Log";
const SHEET_NAME_MORA_YEARLY_REPORT = "Mora Yearly Report";
const SHEET_NAME_MORA_MONTHLY_REPORT = "Mora Monthly Report";
const SHEET_NAME_ARTIFACT_ITEMS = "Artifact Items";
const SHEET_NAME_ARTIFACT_LOG = "Artifact Log";
const SHEET_NAME_ARTIFACT_YEARLY_REPORT = "Artifact Yearly Report";
const SHEET_NAME_ARTIFACT_MONTHLY_REPORT = "Artifact Monthly Report";
const SHEET_NAME_WEAPON_LOG = "Weapon Log";
const SHEET_NAME_WEAPON_YEARLY_REPORT = "Weapon Yearly Report";
const SHEET_NAME_WEAPON_MONTHLY_REPORT = "Weapon Monthly Report";
const SHEET_NAME_KEY_ITEMS = "Key Items";

const MONTHLY_SHEET_NAME = [
  SHEET_NAME_PRIMOGEM_MONTHLY_REPORT,
  SHEET_NAME_CRYSTAL_MONTHLY_REPORT,
  SHEET_NAME_RESIN_MONTHLY_REPORT,
  SHEET_NAME_ARTIFACT_MONTHLY_REPORT,
  SHEET_NAME_WEAPON_MONTHLY_REPORT,
  SHEET_NAME_MORA_MONTHLY_REPORT
];

const NAME_OF_LOG_HISTORIES = [
  SHEET_NAME_PRIMOGEM_LOG,
  SHEET_NAME_CRYSTAL_LOG,
  SHEET_NAME_RESIN_LOG,
  SHEET_NAME_ARTIFACT_LOG,
  SHEET_NAME_WEAPON_LOG
];

const NAME_OF_LOG_HISTORIES_HOYOLAB = [
  SHEET_NAME_MORA_LOG
];

// sheet info
interface ILogSheetInfo {
  sheetName: string,
  apiPaths: { [serverDivide in ServerDivide]: string }
}

const PRIMOGEM_SHEET_INFO: ILogSheetInfo = {
  sheetName: SHEET_NAME_PRIMOGEM_LOG,
  apiPaths: {
    cn: "/ysulog/api/getPrimogemLog",
    os: "/ysulog/api/getPrimogemLog",
  }
}

const CRYSTAL_SHEET_INFO: ILogSheetInfo = {
  sheetName: SHEET_NAME_CRYSTAL_LOG,
  apiPaths: {
    cn: "/ysulog/api/getCrystalLog",
    os: "/ysulog/api/getCrystalLog",
  }
}

const RESIN_SHEET_INFO: ILogSheetInfo = {
  sheetName: SHEET_NAME_RESIN_LOG,
  apiPaths: {
    cn: "/ysulog/api/getResinLog",
    os: "/ysulog/api/getResinLog",
  }
}

const ARTIFACT_SHEET_INFO: ILogSheetInfo = {
  sheetName: SHEET_NAME_ARTIFACT_LOG,
  apiPaths: {
    cn: "/ysulog/api/getArtifactLog",
    os: "/ysulog/api/getArtifactLog",
  }
}

const ARTIFACT_ITEMS_INFO = {
  sheetName: SHEET_NAME_ARTIFACT_ITEMS,
  setNameIdx: 0,
  domainNameIdx: 1,
  setItemsHeaderIdxs: [
    2, // Flower of Life
    4, // Plume of Death
    6, // Sands of Eon
    8, // Goblet of Eonothem
    10, // Circlet of Logos
  ],
  domainReason: 1016,
  domainInfereneceRank: 5,
}

const MORA_SHEET_INFO: ILogSheetInfo = {
  sheetName: SHEET_NAME_MORA_LOG,
  apiPaths: {
    cn: "/event/ys_ledger/monthDetail",
    os: "/event/ysledgeros/month_detail",
  }
}

const WEAPON_SHEET_INFO: ILogSheetInfo = {
  sheetName: SHEET_NAME_WEAPON_LOG,
  apiPaths: {
    cn: "/ysulog/api/getWeaponLog",
    os: "/ysulog/api/getWeaponLog",
  }
}

const LEDGER_FETCH_MULTI = 100;
const LEDGER_RUN_TIME_LIMIT = 1000 * 60 * 5;  // Google allows 6 mins, but we'll use 5 to be safe

const USER_PREFERENCE_MONTHLY_REPORT = "Monthly Report";
const USER_PREFERENCE_YEARLY_REPORT = "Yearly Report";
// User Preferences
const userPreferences = {
  "Primogem Log": { "Monthly Report": "B35", "Yearly Report": "B36" },
  "Crystal Log": { "Monthly Report": "B38", "Yearly Report": "B39" },
  "Resin Log": { "Monthly Report": "B41", "Yearly Report": "B42" },
  "Mora Log": { "Monthly Report": "B44", "Yearly Report": "B45" },
  "Artifact Log": { "Monthly Report": "B47", "Yearly Report": "B48" },
  "Weapon Log": { "Monthly Report": "B50", "Yearly Report": "B51" }
}
// Remove when using the 'Available' sheet from source, this is for backwards compatibility for v1.0 less. Artifact is done via 'Available' sheet from source
const userPreferencesForReport = {
  "Primogem Monthly Report": "B35",
  "Primogem Yearly Report": "B36",
  "Crystal Monthly Report": "B38",
  "Crystal Yearly Report": "B39",
  "Resin Monthly Report": "B41",
  "Resin Yearly Report": "B42",
  "Mora Monthly Report": "B44",
  "Mora Yearly Report": "B45"
}
// locales
const languageSettingsForImport = {
  "English": { "code": "en", "full_code": "en-us", "4_star": " (4-Star)", "5_star": " (5-Star)" },
  "German": { "code": "de", "full_code": "de-de", "4_star": " (4 Sterne)", "5_star": " (5 Sterne)" },
  "French": { "code": "fr", "full_code": "fr-fr", "4_star": " (4★)", "5_star": " (5★)" },
  "Spanish": { "code": "es", "full_code": "es-es", "4_star": " (4★)", "5_star": " (5★)" },
  "Chinese Traditional": { "code": "zh-tw", "full_code": "zh-tw", "4_star": " (四星)", "5_star": " (五星)" },
  "Chinese Simplified": { "code": "zh-cn", "full_code": "zh-cn", "4_star": " (四星)", "5_star": " (五星)" },
  "Indonesian": { "code": "id", "full_code": "id-id", "4_star": " (4★)", "5_star": " (5★)" },
  "Japanese": { "code": "ja", "full_code": "ja-jp", "4_star": " (★4)", "5_star": " (★5)" },
  "Vietnamese": { "code": "vi", "full_code": "vi-vn", "4_star": " (4 sao)", "5_star": " (5 sao)" },
  "Korean": { "code": "ko", "full_code": "ko-kr", "4_star": " (★4)", "5_star": " (★5)" },
  "Portuguese": { "code": "pt", "full_code": "pt-pt", "4_star": " (4★)", "5_star": " (5★)" },
  "Thai": { "code": "th", "full_code": "th-th", "4_star": " (4 ดาว)", "5_star": " (5 ดาว)" },
  "Russian": { "code": "ru", "full_code": "ru-ru", "4_star": " (4★)", "5_star": " (5★)" }
};

// region
const regionSettingsForImport: {
  [displayStr: string]: { code: RegionCode }
} = {
  "天空岛": { "code": "cn_gf01" },
  "世界树": { "code": "cn_qd01" },
  "America": { "code": "os_usa" },
  "Europe": { "code": "os_euro" },
  "Asia": { "code": "os_asia" },
  "TW HK MO": { "code": "os_cht" },
};

interface Config {
  authKeyUrl: string,
  languageCode: LocaleCode,
  regionCode: RegionCode,
}

function getConfig(): Config {
  const settingsSheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME_SETTINGS);

  const authKeyUrl: string = settingsSheet.getRange("D17").getValue();
  const languageCode: LocaleCode = languageSettingsForImport[settingsSheet.getRange("B2").getValue()].full_code;
  const regionCode: RegionCode = regionSettingsForImport[settingsSheet.getRange("B3").getValue()].code;
  return { authKeyUrl, languageCode, regionCode };
}
