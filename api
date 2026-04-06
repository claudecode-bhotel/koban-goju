// ============================================================
// Sushi Experience Booking - API Communication Helper
// ============================================================
// このファイルの API_BASE を Apps Script のデプロイURLに設定してください。
// 例: https://script.google.com/macros/s/YOUR_DEPLOY_ID/exec

const API_BASE = 'https://script.google.com/macros/s/AKfycbyEJPAMm8kZ5bbMylSt5FBQFg-D_-93aabQ76fD6j-qvzY13QEwUk-rJi-cxF9iLPee/exec';

// --- GET Request ---
async function apiGet(action) {
  const url = `${API_BASE}?api=1&action=${encodeURIComponent(action)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Network error: ' + res.status);
  return res.json();
}

// --- POST Request ---
// Note: Content-Type を text/plain にすることで CORS preflight を回避
async function apiPost(action, data) {
  const payload = Object.assign({ action: action }, data);
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Network error: ' + res.status);
  return res.json();
}

// --- Convenience wrappers ---
function getAvailability() {
  return apiGet('availability');
}

function getConfig() {
  return apiGet('config');
}

function createCheckoutSession(formData) {
  return apiPost('createCheckout', { formData: formData });
}

function confirmBooking(sessionId) {
  return apiPost('confirmBooking', { sessionId: sessionId });
}

function lookupBooking(email, date) {
  return apiPost('lookupBooking', { email: email, date: date });
}

function cancelBooking(email, date) {
  return apiPost('cancelBooking', { email: email, date: date });
}

// --- Language Helper ---
function getLang() {
  const params = new URLSearchParams(window.location.search);
  return params.get('lang') || localStorage.getItem('sushi-lang') || 'en';
}

function setLang(lang) {
  localStorage.setItem('sushi-lang', lang);
  const url = new URL(window.location);
  url.searchParams.set('lang', lang);
  window.location.href = url.toString();
}

// --- i18n Text Helper ---
function t(ja, en) {
  return getLang() === 'ja' ? ja : en;
}
