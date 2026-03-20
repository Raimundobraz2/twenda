  // Mobile nav
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  // Scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 90);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // Toggle App Details
  function toggleAppDetails() {
    const details = document.getElementById('appDetails');
    const btn = document.getElementById('btnSaberMais');
    details.classList.toggle('show');
    btn.classList.toggle('active');
    // Observe fade-up elements inside details when shown
    if (details.classList.contains('show')) {
      details.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
      setTimeout(() => {
        details.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  }
  // Make it globally accessible
  window.toggleAppDetails = toggleAppDetails;

  // Nav compact on scroll
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').style.padding = window.scrollY > 60 ? '10px 5vw' : '16px 5vw';
  });

  // Set min date to today
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('f-data').setAttribute('min', today);

  // Booking form
  function enviarReserva() {
    const nome = document.getElementById('f-nome').value.trim();
    const tel = document.getElementById('f-tel').value.trim();
    const servico = document.getElementById('f-servico').value;
    const data = document.getElementById('f-data').value;
    const hora = document.getElementById('f-hora').value;
    const partida = document.getElementById('f-partida').value.trim();
    const destino = document.getElementById('f-destino').value.trim();
    const obs = document.getElementById('f-obs').value.trim();

    if (!nome || !tel || !servico || !data || !hora || !partida || !destino) {
      alert('⚠️ Por favor, preencha todos os campos obrigatórios.');
      return;
    }


const dataFormatada = new Date(data + 'T00:00:00').toLocaleDateString('pt-PT', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
});

const msg = `🏍 *NOVO AGENDAMENTO TWENDA*\n\n👤 *Nome:* ${nome}
📱 *Telefone:* ${tel}
🛵 *Serviço:* ${servico}
📅 *Data:* ${dataFormatada}
⏰ *Hora:* ${hora}
📍 *Partida:* ${partida}
🏁 *Destino:* ${destino}${obs ? '\n📝 *Observações:* ' + obs : ''}`;

// Exemplo: mostrar no console
console.log(msg);

// Exemplo: mostrar na tela
// document.getElementById('resultado').innerText = msg;

    document.getElementById('formSuccess').classList.add('show');
    document.getElementById('btnBook').style.display = 'none';

    // Reset after 8s
    setTimeout(() => {
      document.getElementById('formSuccess').classList.remove('show');
      document.getElementById('btnBook').style.display = 'flex';
      ['f-nome','f-tel','f-data','f-hora','f-partida','f-destino','f-obs'].forEach(id => document.getElementById(id).value = '');
      document.getElementById('f-servico').selectedIndex = 0;
    }, 8000);
  }