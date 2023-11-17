import {state} from './state';

export const displayScreens = {
    screen: document.getElementsByClassName('screen'),
    screenOne: document.getElementsByClassName('screen--one')[0],
    screenTwo: document.getElementsByClassName('screen--two')[0],
    screenThree: document.getElementsByClassName('screen--three')[0],

    // remove class show
    initControls: function () {
        const manageOptions = document.getElementById('manageOptions');
        const vendorPreferences = document.getElementById('vendorPreferences');
        const backScreenList = Array(...document.getElementsByClassName('backScreen'));
        const dialogBtnList = Array(...document.getElementsByClassName('dialog--open'));

        const consentBtn = document.getElementById('consentBtn');
        const doNotConsentBtn = document.getElementById('doNotConsentBtn');

        const confirmChoices = Array(...document.getElementsByClassName('confirmChoices'));
        const acceptAll = Array(...document.getElementsByClassName('acceptAll'));

        this.removeListener(manageOptions, vendorPreferences, backScreenList, dialogBtnList, consentBtn, doNotConsentBtn, confirmChoices, acceptAll);
        this.addListener(manageOptions, vendorPreferences, backScreenList, dialogBtnList, consentBtn, doNotConsentBtn, confirmChoices, acceptAll);

        this.attachCollapsible();
    },
    removeListener: function (manageOptions, vendorPreferences, backScreenList, dialogBtnList, consentBtn, doNotConsentBtn, confirmChoices, acceptAll) {
        manageOptions.removeEventListener('click', this.showScreenTwo, true);
        vendorPreferences.removeEventListener('click', this.showScreenThree, true);
        backScreenList.forEach(item => item.removeEventListener('click', this.backToPreviousScreen, true));
        dialogBtnList.forEach(item => item.removeEventListener('click', this.showDialog, true));

        consentBtn.removeEventListener('click', this.consentFn, true);
        doNotConsentBtn.removeEventListener('click', this.doNotConsentFn, true);

        confirmChoices.forEach(item => item.removeEventListener('click', this.confirmChoicesFn, true));
        acceptAll.forEach(item => item.removeEventListener('click', this.acceptAllFn, true));
    },
    addListener: function (manageOptions, vendorPreferences, backScreenList, dialogBtnList, consentBtn, doNotConsentBtn, confirmChoices, acceptAll) {
        manageOptions.addEventListener('click', this.showScreenTwo.bind(this), true);
        vendorPreferences.addEventListener('click', this.showScreenThree.bind(this), true);
        backScreenList.forEach(item => item.addEventListener('click', this.backToPreviousScreen, true));
        dialogBtnList.forEach(item => item.addEventListener('click', this.showDialog.bind(this, item), true));

        consentBtn.addEventListener('click', this.consentFn.bind(this), true);
        doNotConsentBtn.addEventListener('click', this.doNotConsentFn.bind(this), true);

        confirmChoices.forEach(item => item.addEventListener('click', this.confirmChoicesFn.bind(this, item), true));
        acceptAll.forEach(item => item.addEventListener('click', this.acceptAllFn.bind(this, item), true));
    },
    hideAllScreens: function () {
        Array(...this.screen).forEach(item => item.classList.remove("show"));
        this.scrollToTop();
    },
    showScreenTwo: function () {
        this.hideAllScreens();
        this.screenTwo.classList.add('show');
    },
    showScreenThree: function () {
        this.hideAllScreens();
        this.screenThree.classList.add('show');
    },
    backToPreviousScreen: function () {
        let parent = this.parentElement;
        let previous = parent.previousElementSibling;
        parent.classList.remove('show');
        previous.classList.add('show');
        displayScreens.scrollToTop();
    },
    scrollToTop: function () {
        window.scrollTo(0, 0);
    },
    attachCollapsible: function () {
        const timeouts = new Map();
        Array.from(document.querySelectorAll('.collapsable')).forEach(el => el.querySelector('.collapsable-body').style.height = '0px');
        Array.from(document.querySelectorAll('.collapsable .collapsable-title')).forEach(el => {
            el.addEventListener('click', function (e) {
                const rootEl = e.target.closest('.collapsable');
                const textEl = e.target.closest('.collapsable').querySelector('.collapsable-body');
                clearTimeout(timeouts.get(textEl));
                if (rootEl.classList.contains('expanded')) {
                    textEl.style.height = textEl.clientHeight + 'px';
                    timeouts.set(textEl, setTimeout(() => {
                        textEl.style.height = '0px';
                        rootEl.classList.remove('expanded');
                    }));
                } else {
                    textEl.style.height = '0px';
                    textEl.style.height = textEl.scrollHeight + 'px';
                    rootEl.classList.add('expanded');
                    timeouts.set(textEl, setTimeout(() => textEl.style.removeProperty('height'), 200));
                }
            });
        });
    },
    createCollapsible: function (title, body) {
        return `<div class="collapsable">
                <div class="collapsable-title">${title}</div>
                <div class="collapsable-body">${body}</div>
            </div>`;
    },
    showDialog: function (dialog) {
        if (dialog.children[0].open) {
            this.closeDialog(dialog.children[0])
        } else {
            dialog.children[0].showModal();
        }
    },
    closeDialog: function (dialog) {
        dialog.close();
    },
    consentFn: function () {
        console.log('consent');
    },
    doNotConsentFn: function () {
        console.log('do not consent');
    },
    confirmChoicesFn: function () {
        console.log('confirm Choices');
    },
    acceptAllFn: function () {
        console.log('accept All');
    }
}

export function renderVendors() {
    let {appodealsVendorList} = state;

    appodealsVendorList = {
        ...appodealsVendorList,
        purposes: Object.values(appodealsVendorList.purposes),
        specialPurposes: Object.values(appodealsVendorList.specialPurposes),
        features: Object.values(appodealsVendorList.features),
        specialFeatures: Object.values(appodealsVendorList.specialFeatures),
        vendors: Object.values(appodealsVendorList.vendors),
    }

    const purposeMap = {};
    appodealsVendorList.purposes.forEach(purpose => purposeMap[purpose.id] = purpose);
    const featuresMap = {};
    appodealsVendorList.features.forEach(feature => featuresMap[feature.id] = feature);

    function vendorStorageDisclosure(vendor) {
        if (!vendor.deviceStorageDisclosureUrl) {
            return '';
        }
        return `<a href="${vendor.deviceStorageDisclosureUrl}" class="preferences__link" target="_blank">Storage details</a>`;
    }


    //  --------------------- find privacy link by current lang ---------------------
    function vendorPolicyUrl(vendor) {
        if (!vendor.urls[0].privacy) {
            return '';
        }
        return `<a href="${vendor.urls[0].privacy}" class="preferences__link" target="_blank">
                    Privacy Policy
                    <i class="icn icn-privacy-policy"></i>
                </a>`;
    }


    function vendorTitle(vendor) {
        if (state.consentDialogVersion === 'AcceptEverything') {
            return `
                ${vendor.name}
                ${vendor.usesCookies
                ? `<p>Cookie duration: ${getDaysFromSeconds(vendor.cookieMaxAgeSeconds)}. Cookie duration resets each
                    session. Uses other forms of storage.</p>`
                : `<p>Doesn't use cookies</p>`
            }`;
        }

        return ``;
    }

    let combinePurposesAndFeaturesWithSpecial = [
        ...appodealsVendorList.purposes,
        ...appodealsVendorList.specialPurposes,
        ...appodealsVendorList.features,
        ...appodealsVendorList.specialFeatures,
    ]

    buildPurposesList(combinePurposesAndFeaturesWithSpecial);

    document.querySelector('.vendorList').innerHTML = appodealsVendorList
        .vendors
        .map(vendor =>
            createPreferences(
                `${vendorTitle(vendor)}`,
                `<div class="preferences__list-link">
                            <div class="preferences__link dialog--open">
                                View details
                                <dialog class="dialog">
                                    <h3 class="dialog__title">${vendor.name}</h3>
                                    <div class="dialog__content">
                                        <span class="dialog__txt">To ${vendor.name} vendors can:</span>
                                        ${buildConsentNamesList(vendor, 'purposes')}
                                        ${buildConsentNamesList(vendor, 'specialPurposes')}
                                        ${buildConsentNamesList(vendor, 'features')}
                                        ${buildConsentNamesList(vendor, 'specialFeatures')}
                                    </div>
                                    
                                    <button autofocus class="button button-primary-inverted dialog__btn">Close</button>
                                </dialog>
                            </div>
                            ${vendorStorageDisclosure(vendor)}
                            ${vendorPolicyUrl(vendor)}
                        </div>
                        
                        ${vendor.features.length ? `<label class="switch-control" for="${vendor.id}">
                            Consent
                            <input type="checkbox" 
                                   id="${vendor.id}"
                                   name="${vendor.id}"  
                                   ${state.currentConsent.acceptedVendors.find(el => {
                                       return el.apdId === vendor.id;
                                   }) ? 'checked' : ''}>
                            <span class="track">
                                <span class="peg"></span>
                            </span>
                        </label>` : ''}
                        
                        ${vendor.legIntPurposes.length ? `<label class="switch-control">
                            <div class="switch-control__label">
                                Legitimate interest
                                <!--<i class="icn dialog&#45;&#45;open icn-help">
                                    <dialog class="dialog">
                                        <h4 class="dialog__title">How does legitimate interest work?</h4>
                                        <div class="dialog__content">
                                            <span>Some venders are not asking for you consent, but are using personal data on the basis of their legitimate interest.</span>
                                        </div>
                                        <button class="button button-primary-inverted dialog__btn">Close</button>
                                    </dialog>
                                </i>-->
                            </div>
                            <input type="checkbox"
                                   id="${vendor.id}"
                                   name="${vendor.id}"  
                                   ${state.currentConsent.acceptedVendors.find(el => {
                                       return el.apdId === vendor.id;
                                   }) ? 'checked' : ''}>
                            <span class="track">
                                <span class="peg"></span>
                            </span>
                        </label>` : ''}
            `)
        )
        .join('');


    displayScreens.initControls();

    function buildConsentNamesList(vendor, key) {
        if (!vendor[key].length) {
            return '';
        }

        return `<ul class="dialog__list">${vendor[key].map(p => {
            return `<li>${appodealsVendorList[key].find(item => item.id === p).name}</li>`
        }).join('')}</ul>`
    }
}

function getDaysFromSeconds(seconds) {
    const day = Math.floor(seconds / (3600 * 24));
    return day > 0 ? day + (day === 1 ? " (day)" : " (days)") : "";
}

function buildPurposesList(list) {
    if (list.length === 0) {
        return '';
    }

    document.querySelector('.purposeList').innerHTML = list
        .map(purpose =>
            createPreferences(
                `${purpose.name}`,
                `<p>${purpose.description}</p>
                      <label class="switch-control" for="${purpose.id}">
                          Consent
                          <input type="checkbox" 
                                 id="${purpose.id}"
                                 name="${purpose.id}">
                          <span class="track">
                              <span class="peg"></span>
                          </span>
                      </label>`
            )
        ).join('');
}

export function createPreferences (title, body) {
    return `<div class="preferences__item">
                <h3>${title}</h3>
                ${body}
            </div>`;
}

export function renderLogo(base64img) {
    const img = document.querySelector('.logo img');
    if (base64img) {
        img.src = base64img;
    } else {
        img.style.display = 'none';
    }
}

export function renderAppName(appName) {
    const app = document.querySelector(".logo h2");
    app.innerText = appName;
}



