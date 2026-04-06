window.App = {
  get(key, fallback = []) {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch (e) {
      return fallback;
    }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  currentUser() {
    try {
      return JSON.parse(localStorage.getItem('currentUser'));
    } catch (e) {
      return null;
    }
  },
  requireAuth(roles) {
    const user = this.currentUser();
    if (!user) {
      window.location.href = 'login.html';
      return null;
    }
    if (roles && !roles.includes(user.role)) {
      window.location.href = user.role === 'admin' ? 'admin_dashboard.html' : 'user_dashboard.html';
      return null;
    }
    return user;
  },
  formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount || 0);
  },
  nightsBetween(checkin, checkout) {
    const start = new Date(checkin);
    const end = new Date(checkout);
    const diff = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)));
    return diff;
  },
  randomId(prefix) {
    return `${prefix}-${Math.floor(10000 + Math.random() * 89999)}`;
  },
  logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
  },
  bindLogout() {
    document.querySelectorAll('[data-logout]').forEach(btn => btn.addEventListener('click', e => {
      e.preventDefault();
      this.logout();
    }));
  },
  fillUserName(selector = '#username') {
    const el = document.querySelector(selector);
    const user = this.currentUser();
    if (el && user) el.textContent = user.name;
  },
  initImageFloaters() {
    document.querySelectorAll('img.card-cover, .gallery > img, img.preview-image').forEach((img, index) => {
      if (img.closest('.image-hover')) return;
      const wrapper = document.createElement('div');
      wrapper.className = 'image-hover';
      wrapper.dataset.floater = img.getAttribute('alt') || `Luxury Lumi view ${index + 1}`;
      img.parentNode.insertBefore(wrapper, img);
      wrapper.appendChild(img);
    });
    document.querySelectorAll('.hero-image').forEach((el, index) => {
      if (el.closest('.image-hover')) return;
      const wrapper = document.createElement('div');
      wrapper.className = 'image-hover';
      wrapper.dataset.floater = el.dataset.floater || `Signature Lumi destination ${index + 1}`;
      el.parentNode.insertBefore(wrapper, el);
      wrapper.appendChild(el);
    });
  },
  bindBranchSelectors() {
    document.querySelectorAll('[data-branch-selector]').forEach(select => {
      const saved = localStorage.getItem('selectedBranch');
      if (saved) select.value = saved;
      select.addEventListener('change', () => {
        localStorage.setItem('selectedBranch', select.value);
        document.querySelectorAll('[data-selected-branch]').forEach(node => node.textContent = select.value);
      });
      document.querySelectorAll('[data-selected-branch]').forEach(node => node.textContent = select.value);
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  App.initImageFloaters();
  App.bindBranchSelectors();
});
