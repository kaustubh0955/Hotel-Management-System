document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('supportForm');
  const notice = document.getElementById('supportNotice');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const tickets = App.get('supportTickets');
    tickets.unshift({
      id: App.randomId('SUP'),
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      status: 'open'
    });
    App.set('supportTickets', tickets);
    form.reset();
    notice.className = 'notice success';
    notice.textContent = 'Your request has been submitted to the concierge support desk.';
  });
});
