/**
 * Created by vnguyen on 7/1/16.
 */

// Jquery
let jquery: any = require('jquery');

window['jQuery'] = window['$'] = jquery;

//  SohoXI
require('@infor/sohoxi/dist/js/sohoxi');

// Soho CSS
// require('@infor/sohoxi/dist/css/grey-theme.css');

//  SohoXI Culture files
// Need to change this later, but have to work on getting webpack typing
const cultures = [
  'ar-EG', 'ar-SA', 'bg-BG', 'cs-CZ',
  'da-DK', 'de-DE', 'el-GR', 'en-AU',
  'en-GB', 'en-IN', 'en-NZ', 'en-US',
  'en-ZA', 'es-AR', 'es-ES', 'es-US',
  'et-EE', 'fi-FI', 'fr-CA', 'fr-FR',
  'he-IL', 'hi-IN', 'hr-HR', 'hu-HU',
  'id-ID', 'it-IT', 'ja-JP', 'ko-KR',
  'lt-LT', 'lv-LV', 'nb-NO', 'nl-NL',
  'no-NO', 'pl-PL', 'ps-PS', 'pt-BR',
  'ro-RO', 'ru-RU', 'sl-SI', 'sr-Latn',
  'sv-SE', 'th-TH', 'tr-TR', 'vi-VN',
  'zh-CN', 'zh-TW'
];

cultures.forEach(c => {
    require(`@infor/sohoxi/dist/js/cultures/${c}`);
});

// Load the locale now - this is a workaround until the locale is set in the application initialisation.
Locale.set('en-US');

