function validateFeedback({ name, course, feedback }) {
  const entry = { name: String(name ?? '').trim(), course: String(course ?? '').trim(), feedback: String(feedback ?? '').trim() };
  if (!entry.name || !entry.course || !entry.feedback) throw new Error('Please complete all three fields.');
  if (entry.name.length > 100 || entry.course.length > 100 || entry.feedback.length > 2000) throw new Error('One or more fields exceed the length limit.');
  return entry;
}
if (typeof module !== 'undefined' && module.exports) module.exports = { validateFeedback };
