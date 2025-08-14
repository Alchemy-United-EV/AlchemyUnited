function hook(id: string, url: string) {
  const el = document.getElementById(id) as HTMLFormElement | null;
  if (!el) return;
  el.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(el).entries());
    try {
      const res = await fetch(url, { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) });
      (window as any).dataLayer?.push({ event:'form_submit', form_id:id, ok: res.ok });
      alert(res.ok ? 'Thanks! We received your submission.' : 'Submission failed.');
      if (res.ok) el.reset();
    } catch {
      alert('Network error, please try again.');
    }
  });
}
hook('early-access-form', '/api/lead');
hook('host-application-form', '/api/host-application');