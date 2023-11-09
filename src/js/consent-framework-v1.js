export const consentFrameworkV1 = function (e) {
    'use strict';
    var t = 'undefined' != typeof globalThis ?
        globalThis :
        'undefined' != typeof window ? window : 'undefined' != typeof global ? global : 'undefined' != typeof self ? self : {};
    var n = function (e, t) {return e(t = {exports: {}}, t.exports), t.exports;}((function (e, n) {
        !function (o) {
            var r = n, s = e && e.exports == r && e, i = 'object' == typeof t && t;
            i.global !== i && i.window !== i || (o = i);
            var d = function (e) {this.message = e;};
            (d.prototype = new Error).name = 'InvalidCharacterError';
            var a = function (e) {throw new d(e);},
                c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
                u = /[\t\n\f\r ]/g,
                l = {
                    encode: function (e) {
                        e = String(e), /[^\0-\xFF]/.test(e) && a(
                            'The string to be encoded contains characters outside of the Latin1 range.');
                        for (var t, n, o, r, s = e.length % 3, i = '', d = -1, u = e.length - s; ++d < u;) {
                            t = e.charCodeAt(d) << 16, n = e.charCodeAt(
                                ++d) << 8, o = e.charCodeAt(++d), i += c.charAt((r = t + n + o) >> 18 & 63) + c.charAt(r >> 12 & 63) + c.charAt(
                                r >> 6 & 63) + c.charAt(63 & r);
                        }
                        return 2 == s ?
                            (t = e.charCodeAt(d) << 8, n = e.charCodeAt(++d), i += c.charAt((r = t + n) >> 10) + c.charAt(r >> 4 & 63) + c.charAt(
                                r << 2 & 63) + '=') :
                            1 == s && (r = e.charCodeAt(d), i += c.charAt(r >> 2) + c.charAt(r << 4 & 63) + '=='), i;
                    }, decode: function (e) {
                        var t = (e = String(e).replace(u, '')).length;
                        t % 4 == 0 && (t = (e = e.replace(/==?$/, '')).length), (t % 4 == 1 || /[^+a-zA-Z0-9/]/.test(e)) && a(
                            'Invalid character: the string to be decoded is not correctly encoded.');
                        for (var n, o, r = 0, s = '', i = -1; ++i < t;) {
                            o = c.indexOf(e.charAt(i)), n = r % 4 ?
                                64 * n + o :
                                o, r++ % 4 && (s += String.fromCharCode(255 & n >> (-2 * r & 6)));
                        }
                        return s;
                    }, version: '0.1.0'
                };
            if (r && !r.nodeType) {
                if (s) {
                    s.exports = l;
                } else {
                    for (var p in l) {
                        l.hasOwnProperty(p) && (r[p] = l[p]);
                    }
                }
            } else {
                o.base64 = l;
            }
        }(t);
    }));
    var o = {
        versionNumBits: 6, vendorVersionMap: {
            1: {
                version: 1,
                metadataFields: ['version', 'created', 'lastUpdated', 'cmpId', 'cmpVersion', 'consentScreen', 'vendorListVersion'],
                fields: [
                    {name: 'version', type: 'int', numBits: 6},
                    {name: 'created', type: 'date', numBits: 36},
                    {name: 'lastUpdated', type: 'date', numBits: 36},
                    {name: 'cmpId', type: 'int', numBits: 12},
                    {name: 'cmpVersion', type: 'int', numBits: 12},
                    {name: 'consentScreen', type: 'int', numBits: 6},
                    {name: 'consentLanguage', type: 'language', numBits: 12},
                    {name: 'vendorListVersion', type: 'int', numBits: 12},
                    {name: 'purposeIdBitString', type: 'bits', numBits: 24},
                    {name: 'maxVendorId', type: 'int', numBits: 16},
                    {name: 'isRange', type: 'bool', numBits: 1},
                    {name: 'vendorIdBitString', type: 'bits', numBits: e => e.maxVendorId, validator: e => !e.isRange},
                    {name: 'defaultConsent', type: 'bool', numBits: 1, validator: e => e.isRange},
                    {name: 'numEntries', numBits: 12, type: 'int', validator: e => e.isRange},
                    {
                        name: 'vendorRangeList',
                        type: 'list',
                        listCount: e => e.numEntries,
                        validator: e => e.isRange,
                        fields: [
                            {name: 'isRange', type: 'bool', numBits: 1},
                            {name: 'startVendorId', type: 'int', numBits: 16},
                            {name: 'endVendorId', type: 'int', numBits: 16, validator: e => e.isRange}
                        ]
                    }
                ]
            }
        }
    };
    const {versionNumBits: r, vendorVersionMap: s} = o;

    function i (e, t = '0') {
        let n = '';
        for (let o = 0; o < e; o += 1) {
            n += t;
        }
        return n;
    }

    function d (e, t) {return i(Math.max(0, t)) + e;}

    function a (e, t) {return e + i(Math.max(0, t));}

    function c (e, t) {
        let n = '';
        return 'number' != typeof e || isNaN(e) || (n = parseInt(e, 10).toString(2)), t >= n.length && (n = d(
            n,
            t - n.length
        )), n.length > t && (n = n.substring(0, t)), n;
    }

    function u (e) {return c(!0 === e ? 1 : 0, 1);}

    function l (e, t) {return e instanceof Date ? c(e.getTime() / 100, t) : c(e, t);}

    function p (e, t) {return c(e.toUpperCase().charCodeAt(0) - 65, t);}

    function h (e, t = 12) {return p(e.slice(0, 1), t / 2) + p(e.slice(1), t / 2);}

    function f (e, t, n) {return parseInt(e.substr(t, n), 2);}

    function g (e, t, n) {return new Date(100 * f(e, t, n));}

    function m (e, t) {return 1 === parseInt(e.substr(t, 1), 2);}

    function v (e) {
        const t = f(e);
        return String.fromCharCode(t + 65).toLowerCase();
    }

    function V (e, t, n) {
        const o = e.substr(t, n);
        return v(o.slice(0, n / 2)) + v(o.slice(n / 2));
    }

    function I ({input: e, field: t}) {
        const {name: n, type: o, numBits: r, encoder: s, validator: i} = t;
        if ('function' == typeof i && !i(e)) {
            return '';
        }
        if ('function' == typeof s) {
            return s(e);
        }
        const d = 'function' == typeof r ? r(e) : r, p = e[n], f = null == p ? '' : p;
        switch (o) {
        case'int':
            return c(f, d);
        case'bool':
            return u(f);
        case'date':
            return l(f, d);
        case'bits':
            return a(f, d - f.length).substring(0, d);
        case'list':
            return f.reduce((e, n) => e + w({input: n, fields: t.fields}), '');
        case'language':
            return h(f, d);
        default:
            throw new Error(`ConsentString - Unknown field type ${o} for encoding`);
        }
    }

    function w ({input: e, fields: t}) {return t.reduce((t, n) => t += I({input: e, field: n}), '');}

    function B ({input: e, output: t, startPosition: n, field: o}) {
        const {type: r, numBits: s, decoder: i, validator: d, listCount: a} = o;
        if ('function' == typeof d && !d(t)) {
            return {newPosition: n};
        }
        if ('function' == typeof i) {
            return i(e, t, n);
        }
        const c = 'function' == typeof s ? s(t) : s;
        switch (r) {
        case'int':
            return {fieldValue: f(e, n, c)};
        case'bool':
            return {fieldValue: m(e, n)};
        case'date':
            return {fieldValue: g(e, n, c)};
        case'bits':
            return {fieldValue: e.substr(n, c)};
        case'list':
            return function (e, t, n, o, r) {
                let s = 0;
                'function' == typeof r ? s = r(t) : 'number' == typeof r && (s = r);
                let i = n;
                const d = [];
                for (let t = 0; t < s; t += 1) {
                    const t = C({input: e, fields: o.fields, startPosition: i});
                    i = t.newPosition, d.push(t.decodedObject);
                }
                return {fieldValue: d, newPosition: i};
            }(e, t, n, o, a);
        case'language':
            return {fieldValue: V(e, n, c)};
        default:
            throw new Error(`ConsentString - Unknown field type ${r} for decoding`);
        }
    }

    function C ({input: e, fields: t, startPosition: n = 0}) {
        let o = n;
        return {
            decodedObject: t.reduce((t, n) => {
                const {name: r, numBits: s} = n, {fieldValue: i, newPosition: d} = B({
                    input: e,
                    output: t,
                    startPosition: o,
                    field: n
                });
                return void 0 !== i && (t[r] = i), void 0 !== d ? o = d : 'number' == typeof s && (o += s), t;
            }, {}), newPosition: o
        };
    }

    function L (e, t) {
        const {version: n} = e;
        if ('number' != typeof n) {
            throw new Error('ConsentString - No version field to encode');
        }
        if (t[n]) {return w({input: e, fields: t[n].fields});}
        throw new Error(`ConsentString - No definition for version ${n}`);
    }

    var S = {
        padRight: a,
        padLeft: d,
        encodeField: I,
        encodeDataToBits: L,
        encodeIntToBits: c,
        encodeBoolToBits: u,
        encodeDateToBits: l,
        encodeLanguageToBits: h,
        encodeLetterToBits: p,
        encodeToBase64: function (e, t = s) {
            const o = L(e, t);
            if (o) {
                const e = a(o, 7 - (o.length + 7) % 8);
                let t = '';
                for (let n = 0; n < e.length; n += 8) {
                    t += String.fromCharCode(parseInt(e.substr(n, 8), 2));
                }
                return n.encode(t).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
            }
            return null;
        },
        decodeBitsToIds: function (e) {
            return e.split('')
                .reduce((e, t, n) => ('1' === t && -1 === e.indexOf(n + 1) && e.push(n + 1), e), []);
        },
        decodeBitsToInt: f,
        decodeBitsToDate: g,
        decodeBitsToBool: m,
        decodeBitsToLanguage: V,
        decodeBitsToLetter: v,
        decodeFromBase64: function (e, t) {
            let o = e;
            for (; o.length % 4 != 0;) {
                o += '=';
            }
            o = o.replace(/-/g, '+').replace(/_/g, '/');
            const i = n.decode(o);
            let a = '';
            for (let e = 0; e < i.length; e += 1) {
                const t = i.charCodeAt(e).toString(2);
                a += d(t, 8 - t.length);
            }
            return function (e, t = s) {
                const n = f(e, 0, r);
                if ('number' != typeof n) {
                    throw new Error('ConsentString - Unknown version number in the string to decode');
                }
                if (!s[n]) {
                    throw new Error(`ConsentString - Unsupported version ${n} in the string to decode`);
                }
                const o = t[n].fields, {decodedObject: i} = C({input: e, fields: o});
                return i;
            }(a, t);
        }
    };
    const {encodeToBase64: y, padRight: b} = S;

    function x (e, t = []) {
        let n = '';
        for (let o = 1; o <= e; o += 1) {
            n += -1 !== t.indexOf(o) ? '1' : '0';
        }
        return b(n, Math.max(0, e - n.length));
    }

    function P (e, t = new Set) {
        let n = 0;
        for (let t = 0; t < e.length; t += 1) {
            n = Math.max(n, e[t].id);
        }
        for (let e = 0; e < t.length; e += 1) {
            n = Math.max(n, t[e]);
        }
        let o = '';
        for (let e = 1; e <= n; e += 1) {
            o += -1 !== t.indexOf(e) ? '1' : '0';
        }
        return o;
    }

    function T (e, t) {
        let n = [];
        const o = [], r = e.map(e => e.id);
        for (let s = 0; s < e.length; s += 1) {
            const {id: i} = e[s];
            if (-1 !== t.indexOf(i) && n.push(i), (-1 === t.indexOf(i) || s === e.length - 1 || -1 === r.indexOf(i + 1)) && n.length) {
                const e = n.shift(),
                    t = n.pop();
                n = [], o.push({isRange: 'number' == typeof t, startVendorId: e, endVendorId: t});
            }
        }
        return o;
    }

    function A (e) {
        let t = 0;
        return e.forEach(e => {e.id > t && (t = e.id);}), t;
    }

    var U = {
        convertVendorsToRanges: T, encodeConsentString: function (e) {
            let {maxVendorId: t} = e;
            const {vendorList: n = {}, allowedPurposeIds: o, allowedVendorIds: r} = e, {vendors: s = [], purposes: i = []} = n;
            t || (t = A(s));
            const d = y({...e, maxVendorId: t, purposeIdBitString: P(i, o), isRange: !1, vendorIdBitString: x(t, r)}),
                a = T(s, r),
                c = y({
                    ...e,
                    maxVendorId: t,
                    purposeIdBitString: P(i, o),
                    isRange: !0,
                    defaultConsent: !1,
                    numEntries: a.length,
                    vendorRangeList: a
                });
            return d.length < c.length ? d : c;
        }, getMaxVendorId: A, encodeVendorIdsToBits: x, encodePurposeIdsToBits: P
    };
    const {decodeBitsToIds: R, decodeFromBase64: E} = S;
    var O = {
        decodeConsentString: function (e) {
            const {version: t, cmpId: n, vendorListVersion: o, purposeIdBitString: r, maxVendorId: s, created: i, lastUpdated: d, isRange: a, defaultConsent: c, vendorIdBitString: u, vendorRangeList: l, cmpVersion: p, consentScreen: h, consentLanguage: f} = E(
                e),
                g = {
                    version: t,
                    cmpId: n,
                    vendorListVersion: o,
                    allowedPurposeIds: R(r),
                    maxVendorId: s,
                    created: i,
                    lastUpdated: d,
                    cmpVersion: p,
                    consentScreen: h,
                    consentLanguage: f
                };
            if (a) {
                const e = l.reduce((e, {isRange: t, startVendorId: n, endVendorId: o}) => {
                    const r = t ? o : n;
                    for (let t = n; t <= r; t += 1) {
                        e[t] = !0;
                    }
                    return e;
                }, {});
                g.allowedVendorIds = [];
                for (let t = 1; t <= s; t += 1) {
                    (c && !e[t] || !c && e[t]) && -1 === g.allowedVendorIds.indexOf(t) && g.allowedVendorIds.push(
                        t);
                }
            } else {
                g.allowedVendorIds = R(u);
            }
            return g;
        }
    };
    const {encodeConsentString: D, getMaxVendorId: M, encodeVendorIdsToBits: F, encodePurposeIdsToBits: j} = U, {decodeConsentString: N} = O, {vendorVersionMap: $} = o,
        k = /^[a-z]{2}$/;
    let G;
    var z = {
        ConsentString: class {
            constructor (e = null) {
                this.maxVendorId = 0, this.created = new Date, this.lastUpdated = new Date, this.version = 1, this.vendorList = null, this.vendorListVersion = null, this.cmpId = null, this.cmpVersion = null, this.consentScreen = null, this.consentLanguage = null, this.allowedPurposeIds = [], this.allowedVendorIds = [], e && (G = e, Object.assign(
                    this,
                    N(e)
                ));
            }

            getConsentString (e = !0) {
                let t;
                if (G && !e) {
                    t = G;
                } else {
                    if (!this.vendorList) {
                        throw new Error('ConsentString - A vendor list is required to encode a consent string');
                    }
                    !0 === e && (this.lastUpdated = new Date), t = D({
                        version: this.getVersion(),
                        vendorList: this.vendorList,
                        allowedPurposeIds: this.allowedPurposeIds,
                        allowedVendorIds: this.allowedVendorIds,
                        created: this.created,
                        lastUpdated: this.lastUpdated,
                        cmpId: this.cmpId,
                        cmpVersion: this.cmpVersion,
                        consentScreen: this.consentScreen,
                        consentLanguage: this.consentLanguage,
                        vendorListVersion: this.vendorListVersion
                    }), G = t;
                }
                return t;
            }

            getLastUpdated () {return this.lastUpdated;}

            setLastUpdated (e = null) {G = '', this.lastUpdated = e ? new Date(e) : new Date;}

            getCreated () {return this.created;}

            setCreated (e = null) {G = '', this.created = e ? new Date(e) : new Date;}

            getMaxVendorId () {return this.maxVendorId || this.vendorList && (this.maxVendorId = M(this.vendorList.vendors)), this.maxVendorId;}

            getParsedVendorConsents () {return F(M(this.vendorList.vendors), this.allowedVendorIds);}

            getParsedPurposeConsents () {return j(this.vendorList.purposes, this.allowedPurposeIds);}

            getMetadataString () {
                return D({
                    version: this.getVersion(),
                    created: this.created,
                    lastUpdated: this.lastUpdated,
                    cmpId: this.cmpId,
                    cmpVersion: this.cmpVersion,
                    consentScreen: this.consentScreen,
                    vendorListVersion: this.vendorListVersion
                });
            }

            static decodeMetadataString (e) {
                const t = N(e), n = {};
                return $[t.version].metadataFields.forEach(e => {n[e] = t[e];}), n;
            }

            getVersion () {return this.version;}

            getVendorListVersion () {return this.vendorListVersion;}

            setGlobalVendorList (e) {
                if ('object' != typeof e) {
                    throw new Error(
                        'ConsentString - You must provide an object when setting the global vendor list');
                }
                if (!e.vendorListVersion || !Array.isArray(e.purposes) || !Array.isArray(e.vendors)) {
                    throw new Error(
                        'ConsentString - The provided vendor list does not respect the schema from the IAB EU’s GDPR Consent and Transparency Framework');
                }
                this.vendorList && this.vendorListVersion === e.vendorListVersion || (G = '', this.vendorList = {
                    vendorListVersion: e.vendorListVersion,
                    lastUpdated: e.lastUpdated,
                    purposes: e.purposes,
                    features: e.features,
                    vendors: e.vendors.slice(0).sort((e, t) => e.id < t.id ? -1 : 1)
                }, this.vendorListVersion = e.vendorListVersion);
            }

            getGlobalVendorList () {return this.vendorList;}

            setCmpId (e) {e !== this.cmpId && (G = '', this.cmpId = e);}

            getCmpId () {return this.cmpId;}

            setCmpVersion (e) {e !== this.cmpVersion && (G = '', this.cmpVersion = e);}

            getCmpVersion () {return this.cmpVersion;}

            setConsentScreen (e) {e !== this.consentScreen && (G = '', this.consentScreen = e);}

            getConsentScreen () {return this.consentScreen;}

            setConsentLanguage (e) {
                if (!1 === k.test(e)) {
                    throw new Error(
                        'ConsentString - The consent language must be a two-letter ISO639-1 code (en, fr, de, etc.)');
                }
                e !== this.consentLanguage && (G = '', this.consentLanguage = e);
            }

            getConsentLanguage () {return this.consentLanguage;}

            setPurposesAllowed (e) {G = '', this.allowedPurposeIds = e;}

            getPurposesAllowed () {return this.allowedPurposeIds;}

            setPurposeAllowed (e, t) {
                const n = this.allowedPurposeIds.indexOf(e);
                G = '', !0 === t ?
                    -1 === n && this.allowedPurposeIds.push(e) :
                    !1 === t && -1 !== n && this.allowedPurposeIds.splice(n, 1);
            }

            isPurposeAllowed (e) {return -1 !== this.allowedPurposeIds.indexOf(e);}

            setVendorsAllowed (e) {G = '', this.allowedVendorIds = e;}

            getVendorsAllowed () {return this.allowedVendorIds;}

            setVendorAllowed (e, t) {
                const n = this.allowedVendorIds.indexOf(e);
                G = '', !0 === t ?
                    -1 === n && this.allowedVendorIds.push(e) :
                    !1 === t && -1 !== n && this.allowedVendorIds.splice(n, 1);
            }

            isVendorAllowed (e) {return -1 !== this.allowedVendorIds.indexOf(e);}
        }
    };
    const {ConsentString: q} = z, {encodeVendorIdsToBits: Y, encodePurposeIdsToBits: Z} = U;
    var _ = {ConsentString: q, encodeVendorIdsToBits: Y, encodePurposeIdsToBits: Z},
        H = _.ConsentString,
        J = _.encodeVendorIdsToBits,
        K = _.encodePurposeIdsToBits;
    return e.ConsentString = H, e.default = _, e.encodePurposeIdsToBits = K, e.encodeVendorIdsToBits = J, e;
}({});

export function buildConsent (appodealsVendorList, allowedPurposeIds, allowedVendorIds) {

    const iabVendorList = {
        vendorListVersion: appodealsVendorList.iabVendorListVersion,
        lastUpdated: appodealsVendorList.lastUpdated,
        purposes: appodealsVendorList.purposes,
        features: appodealsVendorList.features,
        vendors: appodealsVendorList.vendors.filter(vendor => vendor.iabId).map(vendor => ({
            id: vendor.iabId,
            ...vendor
        }))
    };

    const consentData = new consentFrameworkV1.ConsentString();

    // Set the global vendor list
    // You need to download and provide the vendor list yourself
    // It can be found here - https://vendorlist.consensu.org/vendorlist.json
    consentData.setGlobalVendorList(iabVendorList);

    // Set the consent data
    consentData.setCmpId(1);
    consentData.setCmpVersion(1);
    consentData.setConsentScreen(1);
    consentData.setConsentLanguage('en');
    consentData.setPurposesAllowed(allowedPurposeIds);
    consentData.setVendorsAllowed(allowedVendorIds);

    // Encode the data into a web-safe base64 string
    consentData.getConsentString();
    const allowedToAll = allowedVendorIds.length > 0;
    return {
        IABUSPrivacy_String: `1Y${allowedToAll ? 'Y' : 'N'}-`,
        IABConsent_ConsentString: consentData.getConsentString(),
        IABConsent_ParsedPurposeConsents: consentFrameworkV1.encodePurposeIdsToBits(iabVendorList.purposes, allowedPurposeIds),
        IABConsent_ParsedVendorConsents: consentFrameworkV1.encodeVendorIdsToBits(iabVendorList.vendors.reduce((acc, v) => Math.max(
            acc,
            v.id
        ), 0), allowedVendorIds)
    };
}
