import {state} from './state';
import {buildConsent} from './libraries/consent-framework-v1';
import {selectAll, selectChoices} from "./libraries/consent-framework-v2";


//  ---------- build consent for IAB_TCF_V1.1 ----------
export function onSave() {
    if (state.consentDialogVersion === 'AcceptVendors') {
        const apdIds = Array.from(document.querySelectorAll('.vendorList input:checked')).map(function (x) {
            return Number(x.name);
        });

        let nextStatus = 'PARTLY_PERSONALIZED';
        if (Object.values(state.appodealsVendorList.vendors).length === apdIds.length) {
            nextStatus = 'PERSONALIZED';
        } else if (apdIds.length === 0) {
            nextStatus = 'NON_PERSONALIZED';
        }

        return save(nextStatus, apdIds);
    } else {
        return save('PERSONALIZED', Object.values(state.appodealsVendorList.vendors).map(v => v.apdId));
    }
}
function save(nextStatus, apdIds) {
    const nextAcceptedVendors = Object.values(state.appodealsVendorList.vendors)
        .filter(vendor => apdIds.includes(vendor.apdId))
        .map(vendor => ({apdId: vendor.apdId, status: vendor.status}));

    const nextIab = Object.assign(
        {},
        state.currentConsent.iab,
        buildConsent(
            state.appodealsVendorList,
            Object.values(state.appodealsVendorList.purposes).map(p => p.id),
            nextAcceptedVendors.map(v => v.apdId)
        )
    );

    //  !!! возможно тут стоит пересмотреть обьект. Не все указанные ключи нужны основываясь на новый результат
    return Object.assign(
        {},
        state.currentConsent,
        {
            vendorListVersion: state.appodealsVendorList.apdVendorListVersion,
            status: nextStatus,
            acceptedVendors: nextAcceptedVendors,
            iab: nextIab
        }
    );

    ConsentManager.send(JSON.stringify(nextConsent));
    setTimeout(() => ConsentManager.closeWebView());
}
//  ----------------------------------------------------

export function normalizeId(x) {
    const id = x.split('_');
    return Number(id[id.length - 1]);
}

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

        this.attachCollapsible();

        this.removeListener(manageOptions, vendorPreferences, backScreenList, dialogBtnList, consentBtn, doNotConsentBtn, confirmChoices, acceptAll);
        this.addListener(manageOptions, vendorPreferences, backScreenList, dialogBtnList, consentBtn, doNotConsentBtn, confirmChoices, acceptAll);
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
    renderAllVendors: function () {
        saveVendorsAndRender('IAB_TCF_V2.2', state.iabVendorList);
        saveVendorsAndRender('GOOGLE_PRIVACY', state.googleVendorList);
        saveVendorsAndRender('APD_PRIVACY_V2', state.appodealsVendorList);
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
        this.acceptAllFn();
    },
    doNotConsentFn: function () {
        console.log('do not consent');
        this.confirmChoicesFn();
    },
    confirmChoicesFn: function () {
        console.log('confirm Choices');
        const selectedItems = this.buildChecked();
        [...state.allVendorList.keys()].forEach(async tcf => {
            await selectChoices(
                tcf,
                state.allVendorList.get(tcf),
                selectedItems
            )
        });
        this.hideCmp();
    },
    acceptAllFn: function () {
        console.log('accept All');

        if (!state.allVendorList.size) {
            return;
        }

        Array.from(document.querySelectorAll('.checkboxSwitcher')).forEach(el => {el.checked = true});

        // for example: new Set('IAB_TCF_V2.2', state.vendor)
        [...state.allVendorList.keys()].forEach(async tcf => {
            await selectAll(tcf, state.allVendorList.get(tcf));
        });

        this.hideCmp();
    },
    buildChecked: function () {
        const vendors = document.querySelectorAll('.vendorList .checkboxSwitcher');
        const vendorLegitimate = document.querySelectorAll('.vendorList .checkboxSwitcher');
        const purposes = document.querySelectorAll('.purposeList .checkboxSwitcher');
        const purposeLegitimate = document.querySelectorAll('.purposeList .checkboxSwitcher');
        const specialFeature = document.querySelectorAll('.specialFeaturesList .checkboxSwitcher');

        return {
            vendors: this.findChecked(vendors, 'vendor_'),
            vendorLegitimate: this.findChecked(vendorLegitimate, 'vendorLegitimate_'),
            purposes: this.findChecked(purposes, 'purpose_'),
            purposeLegitimate: this.findChecked(purposeLegitimate, 'purposeLegitimate_'),
            specialFeatures: this.findChecked(specialFeature, 'specialFeatures_'),
        }
    },
    findChecked: function (list, nameId) {
        return Array.from(list).map(v => v.checked && v.id.includes(nameId) ? v : '').filter(Boolean)
    },
    hideCmp: function () {
        window.cmp.resolveShowPromise(true);
    }
}

function checkHasOwnProp(vendorList, prop) {
    return vendorList && vendorList.hasOwnProperty(prop) ? Object.values(vendorList[prop]) : [];
}

function saveVendorsAndRender(tcf, vendorList) {
    state.allVendorList.set(tcf, vendorList);
    renderVendors(tcf, vendorList);
}

export function renderVendors(tcf, vList) {
    const vendorList = checkHasOwnProp(vList, 'vendors').length ? {
        ...vList,
        purposes: checkHasOwnProp(vList, 'purposes'),
        specialPurposes: checkHasOwnProp(vList, 'specialPurposes'),
        features: checkHasOwnProp(vList, 'features'),
        specialFeatures: checkHasOwnProp(vList, 'specialFeatures'),
        vendors: checkHasOwnProp(vList, 'vendors'),
    } : {
        purposes: [],
        specialPurposes: [],
        features: [],
        specialFeatures: [],
        vendors: Object.values(vList),
    };

    const purposeMap = {};
    vendorList.purposes.forEach(purpose => purposeMap[purpose.id] = purpose);
    const featuresMap = {};
    vendorList.features.forEach(feature => featuresMap[feature.id] = feature);

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


    buildListConsentFirstPage(vendorList)


    const htmlVendorList = vendorList
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
                        
                       ${buildConsentSwitcher(tcf, vendor)}
                       ${buildLegIntPurposesSwitcher(tcf, vendor)}
            `)
        )
        .join('');


    const vendorListTag = document.querySelector('.vendorList');
    if (vendorListTag.childNodes.length > 0) {
        vendorListTag.innerHTML += htmlVendorList;
    } else {
        vendorListTag.innerHTML = htmlVendorList;
    }

    function buildConsentNamesList(vendor, key) {
        if (!vendor.hasOwnProperty(key) || !vendor[key].length) {
            return '';
        }

        return `<ul class="dialog__list">${vendor[key].map(p => {
            return `<li>${vendorList[key].find(item => item.id === p).name}</li>`
        }).join('')}</ul>`
    }
}

function buildConsentSwitcher(tcf, vendor) {
    if (tcf !== 'IAB_TCF_V2.2') {
        return `<label class="switch-control" for="${'vendor_' + vendor.id}">
                    Consent
                    <input type="checkbox"
                           class="checkboxSwitcher"
                           id="${'vendor_' + vendor.id}"
                           name="${'vendor_' + vendor.id}"
                    />
                    <span class="track">
                        <span class="peg"></span>
                    </span>
                </label>`;
    }

    return vendor.features && vendor.features.length
        ? `<label class="switch-control" for="${'vendor_' + vendor.id}">
                Consent
                <input type="checkbox"
                       class="checkboxSwitcher"
                       id="${'vendor_' + vendor.id}"
                       name="${'vendor_' + vendor.id}"
                />
                <span class="track">
                    <span class="peg"></span>
                </span>
            </label>`
        : '';
}
function buildLegIntPurposesSwitcher(tcf, vendor) {
    if (tcf !== 'IAB_TCF_V2.2') {
        return '';
    }

    return vendor.legIntPurposes && vendor.legIntPurposes.length
        ? `<div class="switch-control">
                <div class="switch-control__label">
                    Legitimate interest
                    <i class="icn dialog--open icn-help">
                        <dialog class="dialog">
                            <h4 class="dialog__title">How does legitimate interest work?</h4>
                            <div class="dialog__content">
                                <span>Some venders are not asking for you consent, but are using personal data on the basis of their legitimate interest.</span>
                            </div>
                            <button class="button button-primary-inverted dialog__btn">Close</button>
                        </dialog>
                    </i>
                </div>
                <label class="switch-control" for="${'vendorLegitimate_' + vendor.id}">
                    <input type="checkbox"
                           class="checkboxSwitcher"
                           id="${'vendorLegitimate_' + vendor.id}"
                           name="${'vendorLegitimate_' + vendor.id}"
                    />
                    <span class="track">
                        <span class="peg"></span>
                    </span>
                </label>
            </div>`
        : '';
}

function buildListConsentFirstPage(vendorList) {
    buildPurposesList(
        '.purposeList',
        vendorList.purposes,
        'purpose'
    );

    buildPurposesList(
        '.specialPurposeList',
        vendorList.specialPurposes,
        'specialPurpose'
    );

    buildPurposesList(
        '.featuresList',
        vendorList.features,
        'features'
    );

    buildPurposesList(
        '.specialFeaturesList',
        vendorList.specialFeatures,
        'specialFeatures'
    );
}

function getDaysFromSeconds(seconds) {
    const day = Math.floor(seconds / (3600 * 24));
    return day > 0 ? day + (day === 1 ? " (day)" : " (days)") : "";
}

function buildPurposesList(selector, list, type) {
    if (list.length === 0) {
        return '';
    }

    document.querySelector(selector).innerHTML = list
        .map(item =>
            createPreferences(
                createTitlePreferences(
                    item.name,
                    ``
                ),
                `<p>${item.description}</p>
                      <label class="switch-control" for="${type + '_' + item.id}">
                          Consent
                          <input type="checkbox"
                                 class="checkboxSwitcher"
                                 id="${type + '_' + item.id}"
                                 name="${type + '_' + item.id}">
                          <span class="track">
                              <span class="peg"></span>
                          </span>
                      </label>

                      ${true ? `<div class="switch-control">
                          <div class="switch-control__label">
                              Legitimate interest
                              <i class="icn dialog--open icn-help">
                                  <dialog class="dialog">
                                      <h4 class="dialog__title">How does legitimate interest work?</h4>
                                      <div class="dialog__content">
                                          <span>Some venders are not asking for you consent, but are using personal data on the basis of their legitimate interest.</span>
                                      </div>
                                      <button class="button button-primary-inverted dialog__btn">Close</button>
                                  </dialog>
                              </i>
                          </div>
                          <label class="switch-control" for="${type + 'Legitimate_' + item.id}">
                              <input type="checkbox"
                                     class="checkboxSwitcher"
                                     id="${type + 'Legitimate_' + item.id}"
                                     name="${type + 'Legitimate_' + item.id}"
                              />
                              <span class="track">
                                  <span class="peg"></span>
                              </span>
                          </label>
                      </div>` : ''}`
            )
        ).join('');
}

export function createPreferences(title, body) {
    return `<div class="preferences__item">
                ${title}
                ${body}
            </div>`;
}

export function createTitlePreferences(title, dialogBody) {
    return `<h3>
                ${title}
                ${dialogBody ? `<i class="icn dialog--open icn-help"><dialog class="dialog">${dialogBody}</dialog></i>` : ''}
            </h3>`;
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

export function checkSelectedVendors(decodedConsentObj) {
    if (!decodedConsentObj) {
        return;
    }

    // checked purpose consent
    decodedConsentObj.purposeConsents.forEach(id => {
        document.getElementById('purpose_' + id).checked = true;
    });

    // checked purpose legitimate
    decodedConsentObj.purposeLegitimateInterests.forEach(id => {
        const selector = document.getElementById('purposeLegitimate_' + id);
        if (!selector) {
            return;
        }

        selector.checked = true;
    });

    // checked specialFeatures
    decodedConsentObj.specialFeatureOptins.forEach(id => {
        const selector = document.getElementById('specialFeatures_' + id);
        if (!selector) {
            return;
        }

        selector.checked = true;
    });

    // checked consent
    decodedConsentObj.vendorConsents.forEach(id => {
        const selector = document.getElementById('vendor_' + id);
        if (!selector) {
            return;
        }

        selector.checked = true;
    });

    // checked legitimate
    decodedConsentObj.vendorLegitimateInterests.forEach(id => {
        const selector = document.getElementById('vendorLegitimate_' + id);
        if (!selector) {
            return;
        }

        selector.checked = true;
    });
}


