document.addEventListener('DOMContentLoaded', () => {
  App.requireAuth(['admin']);
  App.bindLogout();
  App.fillUserName();

  const canvas = document.getElementById('bookingChart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const values = [112, 148, 165, 173, 188, 205];
  const revenue = [78, 96, 124, 138, 151, 168];

  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  const margin = 60;
  const chartHeight = height - margin * 2;
  const chartWidth = width - margin * 2;
  const maxVal = 220;

  ctx.strokeStyle = '#d9e2ef';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 5; i++) {
    const y = margin + (chartHeight / 5) * i;
    ctx.beginPath();
    ctx.moveTo(margin, y);
    ctx.lineTo(width - margin, y);
    ctx.stroke();
  }

  values.forEach((val, index) => {
    const barWidth = 40;
    const gap = 45;
    const x = margin + index * (barWidth + gap) + 20;
    const barHeight = (val / maxVal) * chartHeight;
    const y = height - margin - barHeight;
    ctx.fillStyle = '#1f4f87';
    ctx.fillRect(x, y, barWidth, barHeight);

    const revHeight = (revenue[index] / 180) * chartHeight;
    ctx.fillStyle = '#c8a46a';
    ctx.fillRect(x + 12, height - margin - revHeight, 16, revHeight);

    ctx.fillStyle = '#53657d';
    ctx.font = '14px Arial';
    ctx.fillText(labels[index], x, height - margin + 24);
    ctx.fillText(String(val), x, y - 10);
  });

  ctx.fillStyle = '#0f172a';
  ctx.font = '700 24px Arial';
  ctx.fillText('Bookings vs Revenue (Scaled)', margin, 34);
  ctx.font = '14px Arial';
  ctx.fillStyle = '#5f6b7a';
  ctx.fillText('Blue = Bookings, Gold = Revenue Index', margin, 54);

  const fill = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value; };
  fill('occupancyMetric', '88%');
  fill('revenueMetric', '₹2.32 Cr');
  fill('guestMetric', '4.8/5');
});
