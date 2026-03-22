document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const errorBox = document.getElementById('loginError');
  const demoInfo = document.getElementById('demoInfo');
  if (demoInfo) {
    demoInfo.innerHTML = 'Customer demo: <b>guest101 / guest123</b><br>Admin demo: <b>admin101 / admin123</b>';
  }

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const userId = document.getElementById('loginUser').value.trim();
    const password = document.getElementById('loginPass').value.trim();
    const role = document.getElementById('role').value;
    const users = App.get('users');
    const found = users.find(u => u.userId === userId && u.password === password && u.role === role);

    if (!found) {
      errorBox.className = 'notice error';
      errorBox.textContent = 'Invalid credentials. Use the demo account or a registered account.';
      return;
    }

    localStorage.setItem('currentUser', JSON.stringify(found));
    window.location.href = found.role === 'admin' ? 'admin_dashboard.html' : 'user_dashboard.html';
  });
});
