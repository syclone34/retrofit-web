/**
 * RetroFit Starter Kit - Client Application Logic (app.js)
 * Clean, lightweight vanilla JavaScript for high conversions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initEstimator();
  initFormHandler();
});

/**
 * 1. Interactive Cost Estimator Logic
 * Provides real-time pricing feedback to visitors to boost quote submissions.
 */
function initEstimator() {
  const serviceSelect = document.getElementById('serviceType');
  const sizeSelect = document.getElementById('homeSize');
  const output = document.getElementById('estimateOutput');

  if (!serviceSelect || !output) return;

  function calculate() {
    const service = serviceSelect.value;
    const multiplier = sizeSelect ? parseFloat(sizeSelect.value) || 1.0 : 1.0;

    let baseLow = 89;
    let baseHigh = 149;

    if (service === 'repair') {
      baseLow = 99;
      baseHigh = 289;
    } else if (service === 'replacement') {
      baseLow = 3200;
      baseHigh = 6800;
    } else if (service === 'tuneup') {
      baseLow = 79;
      baseHigh = 129;
    }

    const finalLow = Math.round(baseLow * multiplier);
    const finalHigh = Math.round(baseHigh * multiplier);

    output.textContent = `$${finalLow.toLocaleString()} – $${finalHigh.toLocaleString()}`;
  }

  serviceSelect.addEventListener('change', calculate);
  if (sizeSelect) sizeSelect.addEventListener('change', calculate);
}

/**
 * 2. Contact & Quote Form Submission Handler
 * Works with Web3Forms, Formspree, or custom webhook endpoints.
 */
function initFormHandler() {
  const form = document.getElementById('quoteForm');
  const statusMsg = document.getElementById('formStatus');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    // If standard action is present, allow default or handle via fetch
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerText = 'Sending Request...';
    }

    // Auto-populate estimated cost into hidden form field if estimator exists
    const estimatorOutput = document.getElementById('estimateOutput');
    const hiddenEstimate = document.getElementById('hiddenEstimatedCost');
    if (estimatorOutput && hiddenEstimate) {
      hiddenEstimate.value = estimatorOutput.textContent;
    }
  });
}
