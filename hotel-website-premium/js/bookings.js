function renderBookings() {
  const user = App.currentUser();
  const allBookings = App.get('bookings');
  const isAdmin = user?.role === 'admin';
  const rows = (isAdmin ? allBookings : allBookings.filter(b => !user || b.guest === user.name));
  const tbody = document.getElementById('bookingTable');
  const searchInput = document.getElementById('searchBooking');
  const countEl = document.getElementById('bookingCount');
  const amountEl = document.getElementById('amountCount');

  const paint = (filter = '') => {
    const filtered = rows.filter(item => `${item.id} ${item.hotel} ${item.room} ${item.guest}`.toLowerCase().includes(filter.toLowerCase()));
    if (!tbody) return;
    tbody.innerHTML = filtered.map(item => `
      <tr>
        <td>${item.id}</td>
        <td>${item.hotel}</td>
        <td>${item.room}</td>
        <td>${item.guest}</td>
        <td>${item.checkin}</td>
        <td>${item.checkout}</td>
        <td>${item.guests}</td>
        <td>${App.formatCurrency(item.amount)}</td>
        <td><span class="status ${item.status}">${item.status}</span></td>
      </tr>
    `).join('') || '<tr><td colspan="9">No bookings found.</td></tr>';

    if (countEl) countEl.textContent = filtered.length;
    if (amountEl) amountEl.textContent = App.formatCurrency(filtered.reduce((sum, item) => sum + item.amount, 0));
  };

  paint();
  searchInput?.addEventListener('input', (e) => paint(e.target.value));
}

document.addEventListener('DOMContentLoaded', renderBookings);
