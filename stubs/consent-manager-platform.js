import {state} from "../src/js/state";
import {
    checkSelectedVendors,
    onSave,
    renderAppName,
    renderLogo,
    renderVendors
} from "../src/js/consent-ui";
import {decodeConsent, encodeConsent, selectAll} from "../src/js/libraries/consent-framework-v2";
import {buildGooglePrivacyConsent} from "../src/js/libraries/builds/google-privacy";
import {buildApdPrivacyV2Consent} from "../src/js/libraries/builds/apd-privacy-v2";

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
                renderVendors(state.iabVendorList);
                checkSelectedVendors(state.decodedIABConsentObj);
                break;
            case 'GOOGLE_PRIVACY':
                renderVendors(state.googleVendorList);
                state.allVendorList.set('GOOGLE_PRIVACY', state.googleVendorList);
                checkSelectedVendors();
                break;
            case 'APD_PRIVACY_V2':
                renderVendors(state.appodealsVendorList);
                state.allVendorList.set('APD_PRIVACY_V2', state.appodealsVendorList);
                checkSelectedVendors();
                break;
        }

    }

    onUpdateConsent(tcf, consent) {
        switch (tcf) {
            case 'IAB_TCF_V2.2':

                break;
            case 'GOOGLE_PRIVACY':

                break;
            case 'APD_PRIVACY_V2':

                break;
        }
    };

    buildConsentString(tcf, consent) {
        switch (tcf) {
            case 'IAB_TCF_V1.1':
                this.onUpdateConsent('IAB_TCF_V1.1', onSave());
                break;
            case 'IAB_TCF_V2.2':
                this.onUpdateConsent('IAB_TCF_V2.2', buildConsentV2(consent));
                break;
            case 'GOOGLE_PRIVACY':
                this.onUpdateConsent('GOOGLE_PRIVACY', buildGooglePrivacyConsent(consent, state.googleVendorList));
                break;
            case 'APD_PRIVACY_V2':
                this.onUpdateConsent('APD_PRIVACY_V2', buildApdPrivacyV2Consent(state.appodealsVendorList));
                break;
        }
    }

    show() {
        if (this.authorizationStatusIOS === 'NOT_DETERMINED') {
            this.onRequestAuthorizationStatusIOS().then((res, rej) => {
                this.rejectStatusPromise = res;
                this.rejectStatusPromise = rej;
            });
        }

        if (!state.allConsentList.size) {
            return;
        }

        [...state.allConsentList.keys()].forEach(name => {
            this.buildConsentString(name, state.allConsentList.get(name));
        })

        return new Promise((resolve, reject) => {
            this.resolveShowPromise = resolve;
            this.rejectShowPromise = reject;
        });
    };
}
