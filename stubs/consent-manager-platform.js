import {state} from "../src/js/state";
import {
    checkSelectedVendors,
    renderAppName,
    renderLogo,
    renderVendors
} from "../src/js/consent-ui";
import {decodeIABTCFConsent} from "../src/js/libraries/builds/iab";
import {decodeGooglePrivacyConsent} from "../src/js/libraries/builds/google-privacy";

export class ConsentManagerPlatform {
    resolveShowPromise;
    rejectShowPromise;

    resolveStatusPromise;
    rejectStatusPromise;

    authorizationStatusIOS;

    setApp(appName, icon) {
        renderLogo(icon)
        renderAppName(appName, icon);
    }

    setAuthorizationStatusIOS(authorizationStatus) {
        switch (authorizationStatus) {
            case 0:
                this.authorizationStatusIOS = 'NOT_DETERMINED';
                break;
            case 1:
                this.authorizationStatusIOS = 'RESTRICTED';
                break;
            case 2:
                this.authorizationStatusIOS = 'DENIED';
                break;
            case 3:
                this.authorizationStatusIOS = 'AUTHORIZED';
                break;
        }
    }

    onRequestAuthorizationStatusIOS() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(3);
            }, 1000);
        });
    };

    setConsent(tcf, consent) {
        // Present consent on page
        try {
            state.currentConsent = consent;
        } catch (e) {
            throw new Error(`Failed to parse consent JSON. ${e}`);
        }

        if (!state.currentConsent) {
            throw new Error(`Consent must be valid JSON.`);
        }

        switch (tcf) {
            case 'IAB_TCF_V2.2':
                state.allVendorList.set(tcf, state.iabVendorList);
                state.decodedPreviouslyVendor.set(tcf, decodeIABTCFConsent(consent.IABTCF_TCString));

                renderVendors(state.iabVendorList);
                checkSelectedVendors(state.decodedPreviouslyVendor.get(tcf));
                break;
            case 'GOOGLE_PRIVACY':
                state.allVendorList.set(tcf, state.googleVendorList);
                state.decodedPreviouslyVendor.set(tcf, decodeGooglePrivacyConsent(consent.IABTCF_AddtlConsent));

                renderVendors(state.googleVendorList);
                checkSelectedVendors(state.decodedPreviouslyVendor.get(tcf));
                break;
            case 'APD_PRIVACY_V2':
                state.allVendorList.set(tcf, state.appodealsVendorList);
                state.decodedPreviouslyVendor.set(tcf, decodeGooglePrivacyConsent(consent.IABTCF_ApdPrivacyConsent));

                renderVendors(state.appodealsVendorList);
                checkSelectedVendors(state.decodedPreviouslyVendor.get(tcf));
                break;
        }

    }

    onUpdateConsent(tcf, consent) {
        console.log(`Version: ${tcf} Consent: ${consent}`);
    };

    show() {
        if (this.authorizationStatusIOS === 'NOT_DETERMINED') {
            this.onRequestAuthorizationStatusIOS().then((res, rej) => {
                this.rejectStatusPromise = res;
                this.rejectStatusPromise = rej;
            });
        }

        return new Promise((resolve, reject) => {
            this.resolveShowPromise = resolve;
            this.rejectShowPromise = reject;
        });
    };
}
