document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm');
  const notice = document.getElementById('registerNotice');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));

    if (data.password.length < 6) {
      notice.className = 'notice error';
      notice.textContent = 'Password must be at least 6 characters.';
      return;
    }
    if (data.password !== data.confirmPassword) {
      notice.className = 'notice error';
      notice.textContent = 'Passwords do not match.';
      return;
    }

    const users = App.get('users');
    if (users.some(u => u.userId === data.userId || u.email === data.email)) {
      notice.className = 'notice error';
      notice.textContent = 'A user with this email or user ID already exists.';
      return;
    }

    const newUser = {
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      address: data.address,
      userId: data.userId,
      password: data.password,
      role: 'user',
      loyaltyPoints: 250
    };

    users.push(newUser);
    App.set('users', users);
    localStorage.setItem('generatedID', data.userId);
    window.location.href = 'success.html';
  });
});
