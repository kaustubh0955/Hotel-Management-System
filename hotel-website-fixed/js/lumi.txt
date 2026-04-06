function goLogin() {
  window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('heroSearchForm');
  if (form) {
    const checkin = form.querySelector('#checkin');
    const checkout = form.querySelector('#checkout');
    const today = new Date().toISOString().slice(0,10);
    const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0,10);
    if (checkin) { checkin.min = today; if (!checkin.value) checkin.value = today; }
    if (checkout) { checkout.min = tomorrow; if (!checkout.value) checkout.value = tomorrow; }

    checkin?.addEventListener('change', () => {
      const nextMin = new Date(new Date(checkin.value).getTime() + 86400000).toISOString().slice(0,10);
      checkout.min = nextMin;
      if (checkout.value <= checkin.value) checkout.value = nextMin;
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!checkin.value || !checkout.value || new Date(checkout.value) <= new Date(checkin.value)) {
        alert('Please choose a valid check-in and check-out range.');
        return;
      }
      localStorage.setItem('selectedBranch', new FormData(form).get('destination'));
      const params = new URLSearchParams(new FormData(form));
      window.location.href = `reservation.html?${params.toString()}`;
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});
