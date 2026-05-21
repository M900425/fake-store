import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './en.json';
import ukTranslations from './uk.json';
import frTranslations from './fr.json';
import plTranslations from './pl.json';
import deTranslations from './de.json';
import spTranslations from './sp.json';
import daTranslations from './da.json';
import svTranslations from './sv.json';
import noTranslations from './no.json';
import fiTranslations from './fi.json';
import gaTranslations from './ga.json';
import ptTranslations from './pt.json';
import itTranslations from './it.json';
import csTranslations from './cs.json';
import skTranslations from './sk.json';
import slTranslations from './sl.json';
import hrTranslations from './hr.json';
import roTranslations from './ro.json';
import bgTranslations from './bg.json';
import elTranslations from './el.json';
import ltTranslations from './lt.json';
import lvTranslations from './lv.json';
import etTranslations from './et.json';
import isTranslations from './is.json';
import nlTranslations from './nl.json';
import lbTranslations from './lb.json';

const resources = {
    en: { translation: enTranslations },
    uk: { translation: ukTranslations },
    fr: { translation: frTranslations },
    pl: { translation: plTranslations },
    de: { translation: deTranslations },
    sp: { translation: spTranslations },
    da: { translation: daTranslations },
    sv: { translation: svTranslations },
    no: { translation: noTranslations },
    fi: { translation: fiTranslations },
    ga: { translation: gaTranslations },
    pt: { translation: ptTranslations },
    it: { translation: itTranslations },
    cs: { translation: csTranslations },
    sk: { translation: skTranslations },
    sl: { translation: slTranslations },
    hr: { translation: hrTranslations },
    ro: { translation: roTranslations },
    bg: { translation: bgTranslations },
    el: { translation: elTranslations },
    lt: { translation: ltTranslations },
    lv: { translation: lvTranslations },
    et: { translation: etTranslations },
    is: { translation: isTranslations },
    nl: { translation: nlTranslations },
    lb: { translation: lbTranslations },
};

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
