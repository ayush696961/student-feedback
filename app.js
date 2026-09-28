const STORAGE_KEY = 'student-feedback';
const form = document.querySelector('#feedback-form');
const list = document.querySelector('#feedback-list');
const message = document.querySelector('#message');
function loadEntries() {
  try { const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); return Array.isArray(saved) ? saved : []; } catch { return []; }
}
let entries = loadEntries();
function renderEntries() {
  list.replaceChildren();
  if (!entries.length) { const empty = document.createElement('p'); empty.textContent = 'No feedback submitted yet.'; list.append(empty); return; }
  for (const entry of entries) {
    const card = document.createElement('article'); card.className = 'entry';
    const heading = document.createElement('h3'); heading.textContent = `${entry.name} — ${entry.course}`;
    const text = document.createElement('p'); text.textContent = entry.feedback;
    card.append(heading, text); list.append(card);
  }
}
form.addEventListener('submit', event => {
  event.preventDefault(); message.textContent = '';
  try {
    const entry = validateFeedback({ name: form.elements.name.value, course: form.elements.course.value, feedback: form.elements.feedback.value });
    const updated = [entry, ...entries]; localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); entries = updated;
    renderEntries(); form.reset();
  } catch (error) { message.textContent = error.message; }
});
renderEntries();
