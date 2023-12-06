import {state} from "../src/js/state";
import {
    checkSelectedVendors,
    renderAppName,
    renderLogo
} from "../src/js/consent-ui";
import {decodeIABTCFConsent} from "../src/js/libraries/builds/iab";
import {decodeGooglePrivacyConsent} from "../src/js/libraries/builds/google-privacy";
import {decodeApdPrivacyV2Consent} from "../src/js/libraries/builds/apd-privacy-v2";

export class ConsentManagerPlatform {
    resolveFormFinished;
    rejectFormFinished;
    authorizationStatusIOS;

    setApp(appName, version, icon) {
        renderAppName(appName);
        state.currentVersion = Number(version);
        renderLogo(icon)
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
        return () => new Promise(this.authorizationStatusIOS)
            .then(r => console.log(r, 'Set authorizationStatusIOS and waiting resolve/reject'));
    };

    initRequestAuthorizationStatusIOS() {
        if (this.authorizationStatusIOS === 'NOT_DETERMINED') {
            console.log('Show authorizationStatusIOS value:', this.authorizationStatusIOS);
            return this.onRequestAuthorizationStatusIOS();
        }
    }

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
                state.decodedPreviouslyVendor.set(tcf, decodeIABTCFConsent(consent.IABTCF_TCString));
                checkSelectedVendors(tcf, state.decodedPreviouslyVendor.get(tcf));
                break;
            case 'GOOGLE_PRIVACY':
                state.decodedPreviouslyVendor.set(tcf, decodeGooglePrivacyConsent(consent.IABTCF_AddtlConsent));
                checkSelectedVendors(tcf, state.decodedPreviouslyVendor.get(tcf));
                break;
            case 'APD_PRIVACY_V2':
                state.decodedPreviouslyVendor.set(tcf, decodeApdPrivacyV2Consent(consent.IABTCF_ApdPrivacyConsent));
                checkSelectedVendors(tcf, state.decodedPreviouslyVendor.get(tcf));
                break;
        }

    }

    onUpdateConsent(tcf, consent) {
        console.log('Version:', tcf, 'Consent:', consent);
    };

    async show() {
        return new Promise((resolve, reject) => {
            this.resolveFormFinished = resolve;
            this.rejectFormFinished = reject;
        });
    }
}
