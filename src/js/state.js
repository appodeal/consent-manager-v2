export const state = {
    currentConsent: undefined,
    consentDialogVersion: 'AcceptEverything',

    iabVendorList: window.iabVendorList || VENDOR_LIST,// - IAB_TCF_V2.2,
    googleVendorList: window.googleVendorList || VENDOR_LIST, // - GOOGLE_PRIVACY,
    appodealsVendorList: window.appodealsVendorList || VENDOR_LIST, //  будет APD_PRIVACY_V2

    allVendorList: new Map(),
    decodedPreviouslyVendor: new Map(),
};
