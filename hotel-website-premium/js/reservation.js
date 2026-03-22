document.addEventListener('DOMContentLoaded', () => {
  const user = App.currentUser();
  if (user) App.fillUserName();
  App.bindBranchSelectors();

  const params = new URLSearchParams(window.location.search);
  ['destination','checkin','checkout','guests','roomType'].forEach(key => {
    const el = document.getElementById(key);
    if (el && params.get(key)) el.value = params.get(key);
  });

  const form = document.getElementById('reservationForm');
  const totalEl = document.getElementById('bookingTotal');
  const roomSelect = document.getElementById('roomType');
  const serviceSelect = document.getElementById('servicePackage');
  const branchSelect = document.getElementById('destination');
  const guestsSelect = document.getElementById('guests');
  const checkin = document.getElementById('checkin');
  const checkout = document.getElementById('checkout');
  const priceFilter = document.getElementById('priceFilter');
  const viewFilter = document.getElementById('viewFilter');
  const flexibleOnly = document.getElementById('flexibleOnly');
  const validationMessage = document.getElementById('validationMessage');
  const availabilityBadge = document.getElementById('availabilityBadge');
  const availabilitySummary = document.getElementById('availabilitySummary');
  const roomResults = document.getElementById('roomResults');

  const serviceRates = { None: 0, 'Airport Transfer': 3500, 'Spa Access': 5600, 'Fine Dining': 4200, 'Luxury Bundle': 9800 };
  const roomImages = {
    Ocean: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    Skyline: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
    Garden: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80',
    Heritage: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?auto=format&fit=crop&w=1200&q=80',
    River: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80'
  };

  function setMinDates() {
    const today = new Date();
    const tomorrow = new Date(Date.now() + 86400000);
    const todayStr = today.toISOString().slice(0, 10);
    const tomorrowStr = tomorrow.toISOString().slice(0, 10);
    checkin.min = todayStr;
    checkout.min = tomorrowStr;
    if (!checkin.value) checkin.value = todayStr;
    if (!checkout.value) checkout.value = tomorrowStr;
  }

  function validateDates(showMessage = true) {
    let message = '';
    const start = new Date(checkin.value);
    const end = new Date(checkout.value);
    const today = new Date();
    today.setHours(0,0,0,0);

    if (!checkin.value || !checkout.value) {
      message = 'Please select both check-in and check-out dates.';
    } else if (start < today) {
      message = 'Check-in cannot be in the past.';
    } else if (end <= start) {
      message = 'Check-out must be at least one day after check-in.';
    }

    if (showMessage) {
      validationMessage.textContent = message || 'Dates look good. Select a room below to complete your stay.';
      validationMessage.className = 'validation-message ' + (message ? 'is-error' : 'is-success');
    }
    return !message;
  }

  function getAvailableRooms() {
    const rooms = App.get('rooms');
    return rooms.filter(room => {
      if (room.branch !== branchSelect.value) return false;
      if (room.status !== 'available') return false;
      if (room.capacity < Number(guestsSelect.value || 1)) return false;
      if (roomSelect.value && room.type !== roomSelect.value) return false;
      if (priceFilter.value !== 'all' && room.price > Number(priceFilter.value)) return false;
      if (viewFilter.value !== 'all' && room.view !== viewFilter.value) return false;
      if (flexibleOnly.checked && !room.freeCancel) return false;
      return true;
    }).sort((a,b)=>a.price-b.price);
  }

  function renderAvailability() {
    const branchMeta = App.get('branches').find(b => b.hotel === branchSelect.value);
    const rooms = getAvailableRooms();
    availabilityBadge.textContent = `${rooms.length} room${rooms.length === 1 ? '' : 's'} available`;
    availabilitySummary.innerHTML = `
      <div class="summary-chip"><strong>Selected branch</strong><span>${branchSelect.value}</span></div>
      <div class="summary-chip"><strong>Stay</strong><span>${App.nightsBetween(checkin.value, checkout.value)} night(s)</span></div>
      <div class="summary-chip"><strong>Demand</strong><span>${branchMeta ? branchMeta.status : 'Live'}</span></div>
      <div class="summary-chip"><strong>Occupancy</strong><span>${branchMeta ? branchMeta.occupancy + '%' : '—'}</span></div>
    `;

    roomResults.innerHTML = rooms.map(room => `
      <article class="room-result-card">
        <img class="card-cover" src="${roomImages[room.view] || roomImages.Ocean}" alt="${room.name}">
        <div class="room-result-body">
          <div class="room-result-top">
            <div>
              <div class="stars">★★★★★</div>
              <h4>${room.name}</h4>
              <p>${room.roomNo} · ${room.floor} · ${room.view} view</p>
            </div>
            <div class="price-stack">
              <strong>${App.formatCurrency(room.price)}</strong>
              <span>per night</span>
            </div>
          </div>
          <div class="amenity-row">${room.amenities.map(item => `<span>${item}</span>`).join('')}</div>
          <div class="room-meta-row">
            <span>Up to ${room.capacity} guests</span>
            <span>${room.freeCancel ? 'Free cancellation' : 'Non-refundable luxury rate'}</span>
            <span>${App.formatCurrency(App.nightsBetween(checkin.value, checkout.value) * room.price)}</span>
          </div>
          <button class="btn select-room-btn" type="button" data-room="${room.type}" data-price="${room.price}">Select this room</button>
        </div>
      </article>
    `).join('') || `<div class="empty-state">No rooms match these filters right now. Try another branch, a smaller guest count, or a broader price range.</div>`;

    roomResults.querySelectorAll('.select-room-btn').forEach(btn => btn.addEventListener('click', () => {
      roomSelect.value = btn.dataset.room;
      roomSelect.dataset.selectedPrice = btn.dataset.price;
      updateTotal();
      validationMessage.textContent = `${btn.closest('.room-result-card').querySelector('h4').textContent} selected. Complete your reservation below.`;
      validationMessage.className = 'validation-message is-success';
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }));

    App.initImageFloaters();
  }

  function getSelectedRoomRate() {
    const available = getAvailableRooms();
    const exact = available.find(r => r.type === roomSelect.value);
    if (exact) return exact.price;
    const fromSelected = Number(roomSelect.dataset.selectedPrice || 0);
    if (fromSelected) return fromSelected;
    return available[0]?.price || 14500;
  }

  function updateTotal() {
    if (!validateDates(false)) {
      totalEl.textContent = App.formatCurrency(0);
      return;
    }
    const nights = App.nightsBetween(checkin.value, checkout.value);
    const roomRate = getSelectedRoomRate();
    const services = serviceRates[serviceSelect.value] || 0;
    totalEl.textContent = App.formatCurrency(nights * roomRate + services);
  }

  [roomSelect, serviceSelect, checkin, checkout, branchSelect, guestsSelect, priceFilter, viewFilter].forEach(el => el?.addEventListener('change', () => {
    if (el === checkin) {
      const nextMin = new Date(new Date(checkin.value).getTime() + 86400000).toISOString().slice(0,10);
      checkout.min = nextMin;
      if (checkout.value <= checkin.value) checkout.value = nextMin;
    }
    validateDates();
    renderAvailability();
    updateTotal();
  }));
  flexibleOnly?.addEventListener('change', () => { renderAvailability(); updateTotal(); });
  branchSelect?.addEventListener('change', () => localStorage.setItem('selectedBranch', branchSelect.value));

  const savedBranch = localStorage.getItem('selectedBranch');
  if (savedBranch) branchSelect.value = savedBranch;
  setMinDates();
  validateDates();
  renderAvailability();
  updateTotal();

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const currentUser = App.currentUser();
    if (!currentUser) {
      window.location.href = 'login.html';
      return;
    }
    if (!validateDates()) return;

    const available = getAvailableRooms();
    if (!available.length) {
      validationMessage.textContent = 'No available rooms match your current filter set. Please adjust your options.';
      validationMessage.className = 'validation-message is-error';
      return;
    }

    const fd = Object.fromEntries(new FormData(form));
    const selectedRoom = available.find(r => r.type === fd.roomType) || available[0];
    const nights = App.nightsBetween(fd.checkin, fd.checkout);
    const total = nights * selectedRoom.price + (serviceRates[fd.servicePackage] || 0);
    const bookings = App.get('bookings');
    bookings.unshift({
      id: App.randomId('BK'),
      hotel: fd.destination,
      room: selectedRoom.name,
      guest: currentUser.name,
      checkin: fd.checkin,
      checkout: fd.checkout,
      guests: fd.guests,
      amount: total,
      status: 'confirmed'
    });
    App.set('bookings', bookings);
    localStorage.setItem('lastBookingTotal', total);
    localStorage.setItem('lastBookingHotel', fd.destination);
    localStorage.setItem('selectedBranch', fd.destination);
    window.location.href = 'bookings.html';
  });
});
