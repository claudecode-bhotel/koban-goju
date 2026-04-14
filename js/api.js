// ============================================================
// Sushi Experience Booking - API Communication Helper
// ============================================================
// ãã®ãã¡ã¤ã«ã® API_BASE ã Apps Script ã®ããã­ã¤URLã«è¨­å®ãã¦ãã ããã
// ä¾: https://script.google.com/macros/s/YOUR_DEPLOY_ID/exec

const API_BASE = 'https://script.google.com/macros/s/AKfycbzsw5moV75NRFdoq0YPbfLcQ37ZCUVCJao_sqmS7M1aLHNC3OfKQuTrLz648T-X9c5F/exec';

// --- GET Request ---
async function apiGet(action) {
  const url = `${API_BASE}?api=1&action=${encodeURIComponent(action)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Network error: ' + res.status);
  return res.json();
}

// --- POST Request ---
// Note: Content-Type ã text/plain ã«ãããã¨ã§ CORS preflight ãåé¿
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
    return apiGet('getAvailability');
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
