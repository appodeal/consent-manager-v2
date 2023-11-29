export const state = {
    currentVersion: null,
    currentConsent: undefined,
    consentDialogVersion: 'AcceptEverything',

    iabVendorList: window.iabVendorList || VENDOR_LIST_IAB,// - IAB_TCF_V2.2,
    googleVendorList: window.googleVendorList || VENDOR_LIST_GOOGLE, // - GOOGLE_PRIVACY,
    appodealsVendorList: window.appodealsVendorList || VENDOR_LIST_APPODEAL, //  будет APD_PRIVACY_V2

    allVendorList: new Map(),
    decodedPreviouslyVendor: new Map(),
};
