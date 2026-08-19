const ADMIN_PIN = 'admin123';
const STORAGE_KEY = 'foto_lomba_votes_data';

// 32 Koleksi Foto Peserta (Hanya Foto & Nomor Foto)
const PHOTOS = [
  { id: 1, imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&q=80" },
  { id: 2, imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1000&q=80" },
  { id: 3, imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1000&q=80" },
  { id: 4, imageUrl: "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?w=1000&q=80" },
  { id: 5, imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1000&q=80" },
  { id: 6, imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1000&q=80" },
  { id: 7, imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000&q=80" },
  { id: 8, imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1000&q=80" },
  { id: 9, imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1000&q=80" },
  { id: 10, imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1000&q=80" },
  { id: 11, imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1000&q=80" },
  { id: 12, imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1000&q=80" },
  { id: 13, imageUrl: "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1000&q=80" },
  { id: 14, imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1000&q=80" },
  { id: 15, imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1000&q=80" },
  { id: 16, imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1000&q=80" },
  { id: 17, imageUrl: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1000&q=80" },
  { id: 18, imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&q=80" },
  { id: 19, imageUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1000&q=80" },
  { id: 20, imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&q=80" },
  { id: 21, imageUrl: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1000&q=80" },
  { id: 22, imageUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1000&q=80" },
  { id: 23, imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1000&q=80" },
  { id: 24, imageUrl: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=1000&q=80" },
  { id: 25, imageUrl: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1000&q=80" },
  { id: 26, imageUrl: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?w=1000&q=80" },
  { id: 27, imageUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1000&q=80" },
  { id: 28, imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1000&q=80" },
  { id: 29, imageUrl: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1000&q=80" },
  { id: 30, imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1000&q=80" },
  { id: 31, imageUrl: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=1000&q=80" },
  { id: 32, imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1000&q=80" }
];

function getStoredVotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveStoredVotes(votes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(votes));
}

let currentSelectedPhotoId = null;

function initVoterPage() {
  const galleryEl = document.getElementById('photo-gallery');
  if (!galleryEl) return;

  galleryEl.innerHTML = PHOTOS.map(photo => `
    <div id="card-${photo.id}" onclick="selectPhoto(${photo.id})" class="photo-card group relative bg-white rounded-xl overflow-hidden shadow-xs border-2 border-slate-200 hover:border-indigo-400 cursor-pointer flex flex-col">
      <div class="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
        <img src="${photo.imageUrl}" alt="Foto #${photo.id}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
        <div class="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <span class="bg-slate-900/80 backdrop-blur-xs text-[11px] font-bold text-white px-2.5 py-0.5 rounded-md shadow-xs pointer-events-auto">
            Foto #${String(photo.id).padStart(2, '0')}
          </span>
          <div class="flex items-center gap-1.5 pointer-events-auto">
            <button type="button" onclick="event.stopPropagation(); openLightbox(${photo.id})" class="p-1.5 rounded-md bg-white/90 text-slate-700 shadow-xs">
              🔍
            </button>
            <div id="badge-check-${photo.id}" class="w-5 h-5 rounded-full border-2 border-white bg-black/40 flex items-center justify-center">
              <div class="w-2 h-2 bg-white rounded-full hidden"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="p-2.5 bg-white border-t border-slate-100">
        <button type="button" id="btn-select-${photo.id}" class="w-full py-2 px-3 rounded-lg text-xs font-semibold bg-slate-50 text-slate-700 border border-slate-200">
          Pilih Foto #${String(photo.id).padStart(2, '0')}
        </button>
      </div>
    </div>
  `).join('');

  const form = document.getElementById('vote-form');
  if (form) form.addEventListener('submit', handleVoteSubmit);
}

function selectPhoto(photoId) {
  currentSelectedPhotoId = photoId;
  PHOTOS.forEach(p => {
    const card = document.getElementById(`card-${p.id}`);
    const checkBadge = document.getElementById(`badge-check-${p.id}`);
    const btn = document.getElementById(`btn-select-${p.id}`);
    if (!card) return;

    if (p.id === photoId) {
      card.className = "photo-card group relative bg-white rounded-xl overflow-hidden shadow-xs border-2 border-indigo-600 ring-4 ring-indigo-500/10 cursor-pointer flex flex-col";
      if (checkBadge) {
        checkBadge.className = "w-5 h-5 rounded-full border-2 border-white bg-indigo-600 flex items-center justify-center";
        checkBadge.innerHTML = '<div class="w-2 h-2 bg-white rounded-full"></div>';
      }
      if (btn) {
        btn.className = "w-full py-2 px-3 rounded-lg text-xs font-semibold bg-indigo-600 text-white shadow-xs";
        btn.textContent = "✓ Pilihan Anda";
      }
    } else {
      card.className = "photo-card group relative bg-white rounded-xl overflow-hidden shadow-xs border-2 border-slate-200 hover:border-indigo-400 cursor-pointer flex flex-col";
      if (checkBadge) {
        checkBadge.className = "w-5 h-5 rounded-full border-2 border-white bg-black/40 flex items-center justify-center";
        checkBadge.innerHTML = '<div class="w-2 h-2 bg-white rounded-full hidden"></div>';
      }
      if (btn) {
        btn.className = "w-full py-2 px-3 rounded-lg text-xs font-semibold bg-slate-50 text-slate-700 border border-slate-200";
        btn.textContent = `Pilih Foto #${String(p.id).padStart(2, '0')}`;
      }
    }
  });

  const summaryEl = document.getElementById('selected-summary');
  if (summaryEl) {
    summaryEl.classList.remove('hidden');
    summaryEl.innerHTML = `Foto Terpilih: <strong>Foto #${String(photoId).padStart(2, '0')}</strong>`;
  }
}

function handleVoteSubmit(e) {
  e.preventDefault();
  const nik = document.getElementById('nik-input').value.trim();
  const errorEl = document.getElementById('error-msg');
  if (errorEl) errorEl.classList.add('hidden');

  if (!nik) return;
  if (!currentSelectedPhotoId) {
    if (errorEl) {
      errorEl.textContent = "Silakan pilih 1 foto terbaik di galeri.";
      errorEl.classList.remove('hidden');
    }
    return;
  }

  const modal = document.getElementById('confirm-modal');
  document.getElementById('modal-confirm-nik').textContent = nik;
  document.getElementById('modal-confirm-photo').textContent = `Foto #${String(currentSelectedPhotoId).padStart(2, '0')}`;
  const photo = PHOTOS.find(p => p.id === currentSelectedPhotoId);
  if (photo) document.getElementById('modal-confirm-img').src = photo.imageUrl;
  if (modal) modal.classList.remove('hidden');
}

function closeConfirmModal() {
  const modal = document.getElementById('confirm-modal');
  if (modal) modal.classList.add('hidden');
}

function executeVote() {
  const nik = document.getElementById('nik-input').value.trim();
  const photoId = currentSelectedPhotoId;
  const votes = getStoredVotes();

  // Validasi Double Voting
  const existing = votes.find(v => v.nik.toLowerCase() === nik.toLowerCase());
  if (existing) {
    closeConfirmModal();
    const errorEl = document.getElementById('error-msg');
    if (errorEl) {
      errorEl.textContent = `NIK ${nik} sudah pernah digunakan untuk voting.`;
      errorEl.classList.remove('hidden');
    }
    return;
  }

  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let rand = '';
  for (let i = 0; i < 6; i++) rand += chars.charAt(Math.floor(Math.random() * chars.length));
  const receiptCode = `VOTE-${rand}`;

  const newVote = {
    id: Date.now(),
    nik: nik,
    photoId: photoId,
    receiptCode: receiptCode,
    votedAt: new Date().toISOString()
  };

  votes.push(newVote);
  saveStoredVotes(votes);

  closeConfirmModal();
  document.getElementById('nik-input').value = '';
  selectPhoto(null);

  // Buka Struk Sukses
  document.getElementById('receipt-code').textContent = newVote.receiptCode;
  document.getElementById('receipt-nik').textContent = newVote.nik;
  document.getElementById('receipt-photo').textContent = `Foto #${String(newVote.photoId).padStart(2, '0')}`;
  document.getElementById('receipt-time').textContent = new Date(newVote.votedAt).toLocaleString('id-ID');
  document.getElementById('success-modal').classList.remove('hidden');
}

function closeSuccessModal() {
  document.getElementById('success-modal').classList.add('hidden');
}

function openLightbox(photoId) {
  const photo = PHOTOS.find(p => p.id === photoId);
  if (!photo) return;
  document.getElementById('lightbox-img').src = photo.imageUrl;
  document.getElementById('lightbox-title').textContent = `Karya Foto #${String(photo.id).padStart(2, '0')}`;
  document.getElementById('lightbox-select-btn').onclick = () => {
    selectPhoto(photo.id);
    closeLightbox();
  };
  document.getElementById('lightbox-modal').classList.remove('hidden');
}

function closeLightbox() {
  document.getElementById('lightbox-modal').classList.add('hidden');
}

// Logic Admin
function checkAdminAuth(e) {
  e.preventDefault();
  const pin = document.getElementById('admin-pin-input').value.trim();
  if (pin === ADMIN_PIN) {
    document.getElementById('admin-login-screen').classList.add('hidden');
    document.getElementById('admin-dashboard').classList.remove('hidden');
    renderAdminDashboard();
  } else {
    const errEl = document.getElementById('admin-auth-error');
    errEl.textContent = "PIN Keamanan salah. (Default: admin123)";
    errEl.classList.remove('hidden');
  }
}

function renderAdminDashboard() {
  const votes = getStoredVotes();
  const totalVotes = votes.length;
  document.getElementById('kpi-total-votes').textContent = totalVotes;
  document.getElementById('kpi-last-vote').textContent = totalVotes > 0 
    ? new Date(votes[votes.length - 1].votedAt).toLocaleTimeString('id-ID') + ' WIB'
    : 'Belum ada';

  const scores = {};
  PHOTOS.forEach(p => scores[p.id] = 0);
  votes.forEach(v => scores[v.photoId] = (scores[v.photoId] || 0) + 1);

  const ranked = PHOTOS.map(p => ({
    ...p,
    votes: scores[p.id] || 0,
    percentage: totalVotes > 0 ? ((scores[p.id] / totalVotes) * 100).toFixed(1) : 0
  })).sort((a, b) => b.votes - a.votes);

  document.getElementById('leaderboard-tbody').innerHTML = ranked.map((p, i) => `
    <tr class="hover:bg-slate-50 border-b border-slate-100">
      <td class="py-3 px-4 text-center font-mono font-bold ${i < 3 ? 'text-indigo-600' : 'text-slate-500'}">
        ${i === 0 ? '🥇 1' : i === 1 ? '🥈 2' : i === 2 ? '🥉 3' : i + 1}
      </td>
      <td class="py-3 px-4 flex items-center gap-3">
        <img src="${p.imageUrl}" class="w-12 h-9 object-cover rounded-md border border-slate-200 shrink-0">
        <span class="font-bold text-slate-800 text-xs sm:text-sm">Foto #${String(p.id).padStart(2, '0')}</span>
      </td>
      <td class="py-3 px-4 font-mono font-bold text-indigo-700">${p.votes} Suara</td>
      <td class="py-3 px-4">
        <div class="flex items-center gap-2">
          <div class="w-24 bg-slate-100 h-2 rounded-full overflow-hidden">
            <div class="bg-indigo-600 h-full rounded-full" style="width: ${p.percentage}%"></div>
          </div>
          <span class="text-xs font-semibold text-slate-600">${p.percentage}%</span>
        </div>
      </td>
    </tr>
  `).join('');

  document.getElementById('audit-tbody').innerHTML = votes.slice().reverse().map((v, i) => `
    <tr class="hover:bg-slate-50 border-b border-slate-100">
      <td class="py-2.5 px-4 text-center font-mono text-xs text-slate-400">${i + 1}</td>
      <td class="py-2.5 px-4 font-mono font-bold text-xs text-indigo-700">${v.receiptCode}</td>
      <td class="py-2.5 px-4 font-mono font-bold text-xs text-slate-800">${v.nik}</td>
      <td class="py-2.5 px-4 text-xs font-semibold text-slate-700">Foto #${String(v.photoId).padStart(2, '0')}</td>
      <td class="py-2.5 px-4 text-xs text-slate-500">${new Date(v.votedAt).toLocaleString('id-ID')}</td>
    </tr>
  `).join('');
}

function exportVotesToCSV() {
  const votes = getStoredVotes();
  if (votes.length === 0) {
    alert("Belum ada data voting untuk diexport.");
    return;
  }
  const headers = ["No", "Kode Struk", "NIK Karyawan", "Foto Dipilih", "Waktu Voting"];
  const rows = votes.map((v, i) => [
    i + 1, `"${v.receiptCode}"`, `"${v.nik}"`, `"Foto #${String(v.photoId).padStart(2, '0')}"`, `"${new Date(v.votedAt).toLocaleString('id-ID')}"`
  ]);
  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
  const link = document.createElement("a");
  link.setAttribute("href", encodeURI(csvContent));
  link.setAttribute("download", `Rekap_Voting_Foto_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function resetAllVotes() {
  if (prompt("Ketik RESET_SEMUA_DATA untuk konfirmasi:") === "RESET_SEMUA_DATA") {
    localStorage.removeItem(STORAGE_KEY);
    alert("Semua data voting berhasil direset.");
    renderAdminDashboard();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('photo-gallery')) initVoterPage();
  if (document.getElementById('admin-login-screen')) {
    document.getElementById('admin-login-form').addEventListener('submit', checkAdminAuth);
  }
});
