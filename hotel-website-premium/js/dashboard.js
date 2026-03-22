document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.split('/').pop();
  const isAdminPage = ['admin_dashboard.html', 'analytics.html', 'roomstatus.html', 'branch_management.html'].includes(path);
  const user = App.requireAuth(isAdminPage ? ['admin'] : ['user', 'admin']);
  if (!user) return;

  App.fillUserName();
  App.bindLogout();
  App.bindBranchSelectors();

  const bookings = App.get('bookings');
  const rooms = App.get('rooms');
  const branches = App.get('branches');
  const tickets = App.get('supportTickets');
  const customerBookings = user.role === 'admin' ? bookings : bookings.filter(b => b.guest === user.name);

  const fill = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  fill('bookingCount', customerBookings.length);
  fill('activeRooms', rooms.filter(r => r.status === 'available').length);
  fill('amountCount', App.formatCurrency(customerBookings.reduce((sum, item) => sum + item.amount, 0)));
  fill('loyaltyPoints', user.loyaltyPoints || 0);
  fill('openTickets', tickets.filter(t => t.status === 'open').length);
  fill('branchCount', branches.length);
  fill('greetingName', user.name.split(' ')[0]);
  fill('lastBookingHotel', localStorage.getItem('lastBookingHotel') || 'Goa Seaside Lumi');
  fill('lastBookingTotal', App.formatCurrency(Number(localStorage.getItem('lastBookingTotal') || 41700)));

  const selectedBranch = localStorage.getItem('selectedBranch') || branches[0]?.hotel || 'Goa Seaside Lumi';
  document.querySelectorAll('[data-selected-branch]').forEach(node => node.textContent = selectedBranch);

  const recentList = document.getElementById('recentBookingList');
  if (recentList) {
    recentList.innerHTML = customerBookings.slice(0, 4).map(item => `
      <li>
        <span>${item.hotel} · ${item.room}</span>
        <strong>${item.checkin}</strong>
      </li>
    `).join('') || '<li><span>No recent bookings yet</span><strong>—</strong></li>';
  }

  const branchList = document.getElementById('branchTable');
  if (branchList) {
    branchList.innerHTML = branches.map(item => `
      <tr>
        <td>${item.city}</td>
        <td>${item.hotel}</td>
        <td>${item.occupancy}%</td>
        <td>${item.revenue}</td>
        <td><span class="status confirmed">${item.status}</span></td>
      </tr>
    `).join('');
  }

  const roomStatusTable = document.getElementById('roomStatusTable');
  if (roomStatusTable) {
    roomStatusTable.innerHTML = rooms.map(room => `
      <tr>
        <td>${room.roomNo}</td>
        <td>${room.branch}</td>
        <td>${room.type}</td>
        <td>${room.floor}</td>
        <td>${App.formatCurrency(room.price)}</td>
        <td><span class="status ${room.status}">${room.status}</span></td>
      </tr>
    `).join('');
  }

  const ticketTable = document.getElementById('ticketTable');
  if (ticketTable) {
    ticketTable.innerHTML = tickets.map(ticket => `
      <tr>
        <td>${ticket.id}</td>
        <td>${ticket.name}</td>
        <td>${ticket.subject}</td>
        <td>${ticket.email}</td>
        <td><span class="status ${ticket.status === 'open' ? 'pending' : 'completed'}">${ticket.status}</span></td>
      </tr>
    `).join('');
  }
});
