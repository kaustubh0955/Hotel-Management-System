document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const noticeBox = document.getElementById('loginNotice');

  if (noticeBox) {
    noticeBox.className = 'notice';
    noticeBox.innerHTML = 'Customer demo: <b>guest101 / guest123</b><br>Admin demo: <b>admin101 / admin123</b>';
  }

  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const userIdField = document.getElementById('loginId') || document.getElementById('loginUser');
    const passwordField = document.getElementById('loginPass');
    const roleField = document.getElementById('role');

    const userId = userIdField?.value.trim();
    const password = passwordField?.value.trim();
    const role = roleField?.value;

    const users = App.get('users');
    const found = users.find((u) => {
      const idMatch = (u.userId || '').toLowerCase() === (userId || '').toLowerCase();
      const passwordMatch = u.password === password;
      const roleMatch = !role || u.role === role || (role === 'admin' && ['admin', 'staff'].includes(u.role));
      return idMatch && passwordMatch && roleMatch;
    });

    if (!found) {
      if (noticeBox) {
        noticeBox.className = 'notice error';
        noticeBox.textContent = 'Invalid credentials. Use guest101 / guest123 for Customer or admin101 / admin123 for Admin.';
      }
      return;
    }

    localStorage.setItem('currentUser', JSON.stringify(found));

    if (noticeBox) {
      noticeBox.className = 'notice success';
      noticeBox.textContent = `Welcome back, ${found.name}. Redirecting...`;
    }

    setTimeout(() => {
      window.location.href = found.role === 'admin' ? 'admin_dashboard.html' : 'user_dashboard.html';
    }, 350);
  });
});
