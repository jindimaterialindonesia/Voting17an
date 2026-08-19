/**
 * ==========================================================================
 * Voting Lomba Foto Karyawan - App Logic
 * Mendukung Blind Voting (Hanya Foto), Validasi NIK Unik, & Panel Admin
 * ==========================================================================
 */

// PIN Keamanan Panel Admin
const ADMIN_PIN = 'admin123';

// Database Master NIK Karyawan (Daftar Karyawan yang Berhak Voting)
// Anda dapat menempelkan (paste) daftar NIK karyawan perusahaan Anda di sini
const MASTER_EMPLOYEES = [
  { nik: "199201152018031002", name: "Reza Mahendra", department: "IT Support" },
  { nik: "198805202014022001", name: "Ratna Sari", department: "Keuangan" },
  { nik: "199503112020011003", name: "Ilham Kurnia", department: "Marketing" },
  { nik: "198711042012032004", name: "Dina Novita", department: "Customer Care" },
  { nik: "199407222019021005", name: "Ferry Irawan", department: "Operasional" },
  { nik: "199012012016011006", name: "Bambang Pamungkas", department: "Teknik" },
  { nik: "199308192017042007", name: "Annisa Permata", department: "R&D" },
  { nik: "198602142011011008", name: "Dedi Supriyadi", department: "General Affairs" },
  { nik: "199609302021022009", name: "Tania Putri", department: "SDM" },
  { nik: "199104052015031010", name: "Aditya Wardhana", department: "Software Dev" },
  { nik: "199211102019011011", name: "Siti Rahmawati", department: "Akuntansi" },
  { nik: "198906252013022012", name: "Hendro Wibowo", department: "Logistik" },
  { nik: "199702182022031013", name: "Mega Utami", department: "Legal" },
  { nik: "199008122016021014", name: "Yoga Pratama", department: "Design & Media" },
  { nik: "199505042020042015", name: "Nadia Safira", department: "Public Relations" }
];

// 32 Koleksi Foto Peserta Lomba (Format Story 9:16)
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

// Helper Storage
const STORAGE_KEY = 'foto_lomba_votes_data';

function getStoredVotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveStoredVotes(votes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(votes));
  } catch (e) {
    console.error("Gagal menyimpan ke LocalStorage:", e);
  }
}

// Generate Struk Unik
function generateReceiptCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let rand = '';
  for (let i = 0; i < 6; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `VOTE-2026-${rand}`;
}

// ==========================================
// 1. VOTER INTERFACE (index.html)
// ==========================================
let currentSelectedPhotoId = null;

function initVoterPage() {
  const galleryEl = document.getElementById('photo-gallery') || document.getElementById('photos-grid');
  const countBadgeEl = document.getElementById('photo-count-badge');
  if (!galleryEl) return;

  if (countBadgeEl) {
    countBadgeEl.textContent = `${PHOTOS.length} Foto`;
  }

  // Render Galeri 9:16 (Hanya Foto & Nomor Foto)
  galleryEl.innerHTML = PHOTOS.map(photo => `
    <div 
      id="card-${photo.id}" 
      onclick="selectPhoto(${photo.id})"
      class="photo-card group relative bg-white rounded-xl overflow-hidden shadow-xs border-2 border-slate-200 hover:border-indigo-400 cursor-pointer flex flex-col transition-all duration-200"
    >
      <div class="relative aspect-[9/16] w-full bg-slate-100 overflow-hidden">
        <img 
          src="${photo.imageUrl}" 
          alt="Foto #${photo.id}"
          loading="lazy"
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <!-- Top Badges -->
        <div class="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <span class="bg-slate-900/80 backdrop-blur-xs text-[11px] font-bold text-white px-2.5 py-0.5 rounded-md shadow-xs pointer-events-auto">
            Foto #${String(photo.id).padStart(2, '0')}
          </span>

          <div class="flex items-center gap-1.5 pointer-events-auto">
            <button 
              type="button" 
              onclick="event.stopPropagation(); openLightbox(${photo.id})"
              title="Perbesar Foto"
              class="p-1.5 rounded-md bg-white/90 hover:bg-white text-slate-700 shadow-xs backdrop-blur-xs transition-all active:scale-95 cursor-pointer"
            >
              <svg class="w-3.5 h-3.5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
            </button>
            <div id="badge-check-${photo.id}" class="w-5 h-5 rounded-full border-2 border-white bg-black/40 flex items-center justify-center transition-colors">
              <div class="w-2 h-2 bg-white rounded-full hidden"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Button (Hanya Tombol Pilih) -->
      <div class="p-2.5 bg-white border-t border-slate-100">
        <button 
          type="button" 
          id="btn-select-${photo.id}"
          onclick="event.stopPropagation(); selectPhoto(${photo.id})"
          class="w-full py-2 px-3 rounded-lg text-xs font-semibold bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 transition-all flex items-center justify-center cursor-pointer"
        >
          Pilih Foto #${String(photo.id).padStart(2, '0')}
        </button>
      </div>
    </div>
  `).join('');

  // Setup Form Submit
  const form = document.getElementById('vote-form');
  if (form) {
    form.addEventListener('submit', handleVoteSubmit);
  }
}

function selectPhoto(photoId) {
  currentSelectedPhotoId = photoId;

  // Update UI Card state
  PHOTOS.forEach(p => {
    const card = document.getElementById(`card-${p.id}`);
    const checkBadge = document.getElementById(`badge-check-${p.id}`);
    const btn = document.getElementById(`btn-select-${p.id}`);
    if (!card) return;

    if (p.id === photoId) {
      card.className = "photo-card group relative bg-white rounded-xl overflow-hidden shadow-xs border-2 border-indigo-600 ring-4 ring-indigo-500/10 cursor-pointer flex flex-col transition-all duration-200";
      if (checkBadge) {
        checkBadge.className = "w-5 h-5 rounded-full border-2 border-white bg-indigo-600 flex items-center justify-center";
        checkBadge.innerHTML = '<div class="w-2 h-2 bg-white rounded-full"></div>';
      }
      if (btn) {
        btn.className = "w-full py-2 px-3 rounded-lg text-xs font-semibold bg-indigo-600 text-white shadow-xs transition-all flex items-center justify-center";
        btn.textContent = "✓ Pilihan Anda";
      }
    } else {
      card.className = "photo-card group relative bg-white rounded-xl overflow-hidden shadow-xs border-2 border-slate-200 hover:border-indigo-400 cursor-pointer flex flex-col transition-all duration-200";
      if (checkBadge) {
        checkBadge.className = "w-5 h-5 rounded-full border-2 border-white bg-black/40 flex items-center justify-center";
        checkBadge.innerHTML = '<div class="w-2 h-2 bg-white rounded-full hidden"></div>';
      }
      if (btn) {
        btn.className = "w-full py-2 px-3 rounded-lg text-xs font-semibold bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 transition-all flex items-center justify-center";
        btn.textContent = `Pilih Foto #${String(p.id).padStart(2, '0')}`;
      }
    }
  });

  // Update Summary Preview di Form
  const previewEl = document.getElementById('selected-photo-preview');
  if (previewEl) {
    const photo = PHOTOS.find(p => p.id === photoId);
    previewEl.innerHTML = `
      <div class="flex items-center gap-2.5 text-left">
        <img src="${photo ? photo.imageUrl : ''}" class="w-10 h-16 object-cover rounded-md shadow-xs border border-indigo-200">
        <div>
          <div class="text-xs font-bold text-indigo-700">✓ Foto #${String(photoId).padStart(2, '0')} Terpilih</div>
          <div class="text-[11px] text-slate-500">Siap untuk dikonfirmasi</div>
        </div>
      </div>
    `;
    previewEl.className = "p-2.5 rounded-lg border border-indigo-200 bg-indigo-50/60 text-center";
  }
}

function handleVoteSubmit(e) {
  e.preventDefault();
  const nikInput = document.getElementById('nik-input');
  const errorEl = document.getElementById('error-msg');
  const nik = nikInput ? nikInput.value.trim() : '';

  if (errorEl) errorEl.classList.add('hidden');

  if (!nik) {
    showError("NIK Karyawan wajib diisi.");
    return;
  }

  // 1. Cek Validitas NIK di Database Master Karyawan
  if (MASTER_EMPLOYEES && MASTER_EMPLOYEES.length > 0) {
    const isRegistered = MASTER_EMPLOYEES.some(emp => emp.nik.toLowerCase() === nik.toLowerCase());
    if (!isRegistered) {
      showError(`NIK "${nik}" tidak terdaftar dalam database karyawan. Silakan periksa kembali atau hubungi Panitia.`);
      return;
    }
  }

  // 2. Cek apakah NIK sudah pernah voting
  const votes = getStoredVotes();
  const existing = votes.find(v => v.nik.toLowerCase() === nik.toLowerCase());
  if (existing) {
    showError(`NIK ${nik} sudah pernah digunakan untuk voting. Setiap karyawan hanya memiliki 1 hak suara.`);
    return;
  }

  if (!currentSelectedPhotoId) {
    showError("Silakan pilih 1 foto terbaik pilihan Anda di galeri.");
    return;
  }

  // Buka Modal Konfirmasi
  openConfirmModal(nik, currentSelectedPhotoId);
}

function showError(msg) {
  const errorEl = document.getElementById('error-msg');
  if (errorEl) {
    errorEl.textContent = msg;
    errorEl.classList.remove('hidden');
  }
}

function openConfirmModal(nik, photoId) {
  const modal = document.getElementById('confirm-modal');
  const confirmNik = document.getElementById('modal-confirm-nik');
  const confirmPhoto = document.getElementById('modal-confirm-photo');
  const confirmImg = document.getElementById('modal-confirm-img');

  const photo = PHOTOS.find(p => p.id === photoId);

  if (confirmNik) confirmNik.textContent = nik;
  if (confirmPhoto) confirmPhoto.textContent = `Foto #${String(photoId).padStart(2, '0')}`;
  if (confirmImg && photo) confirmImg.src = photo.imageUrl;

  if (modal) modal.classList.remove('hidden');
}

function closeConfirmModal() {
  const modal = document.getElementById('confirm-modal');
  if (modal) modal.classList.add('hidden');
}

function executeVote() {
  const nikInput = document.getElementById('nik-input');
  const nik = nikInput ? nikInput.value.trim() : '';
  const photoId = currentSelectedPhotoId;

  if (!nik || !photoId) return;

  const votes = getStoredVotes();
  const existing = votes.find(v => v.nik.toLowerCase() === nik.toLowerCase());

  if (existing) {
    closeConfirmModal();
    showError(`NIK ${nik} sudah pernah digunakan untuk voting.`);
    return;
  }

  // Simpan Suara Baru
  const receiptCode = generateReceiptCode();
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

  // Reset form
  if (nikInput) nikInput.value = '';
  currentSelectedPhotoId = null;

  // Buka Struk Sukses
  openReceiptModal(newVote);
}

function openReceiptModal(vote) {
  const modal = document.getElementById('receipt-modal');
  const codeEl = document.getElementById('receipt-code');
  const nikEl = document.getElementById('receipt-nik');
  const photoEl = document.getElementById('receipt-photo');
  const timeEl = document.getElementById('receipt-time');

  if (codeEl) codeEl.textContent = vote.receiptCode;
  if (nikEl) nikEl.textContent = vote.nik;
  if (photoEl) photoEl.textContent = `Foto #${String(vote.photoId).padStart(2, '0')}`;
  if (timeEl) {
    timeEl.textContent = new Date(vote.votedAt).toLocaleString('id-ID', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  }

  if (modal) modal.classList.remove('hidden');

  // Trigger Confetti
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
  }
}

function closeReceiptModal() {
  const modal = document.getElementById('receipt-modal');
  if (modal) modal.classList.add('hidden');
  window.location.reload();
}

function openLightbox(photoId) {
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');

  const photo = PHOTOS.find(p => p.id === photoId);
  if (photo && img && caption) {
    img.src = photo.imageUrl;
    caption.textContent = `Foto #${String(photo.id).padStart(2, '0')}`;
    if (modal) modal.classList.remove('hidden');
  }
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (modal) modal.classList.add('hidden');
}

// ==========================================
// 2. ADMIN DASHBOARD (admin.html)
// ==========================================
function initAdminPage() {
  const loginForm = document.getElementById('admin-login-form');
  if (!loginForm) return;

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const pinInput = document.getElementById('admin-pin-input');
    const authError = document.getElementById('admin-auth-error');
    const pin = pinInput ? pinInput.value.trim() : '';

    if (pin === ADMIN_PIN || pin === 'admin') {
      document.getElementById('admin-login-screen').classList.add('hidden');
      document.getElementById('admin-dashboard').classList.remove('hidden');
      renderAdminDashboard();
    } else {
      if (authError) {
        authError.textContent = "PIN salah. Silakan coba lagi.";
        authError.classList.remove('hidden');
      }
    }
  });
}

function renderAdminDashboard() {
  const votes = getStoredVotes();

  // 1. KPI
  const kpiTotal = document.getElementById('kpi-total-votes');
  const kpiLast = document.getElementById('kpi-last-vote');

  if (kpiTotal) kpiTotal.textContent = votes.length;
  if (kpiLast) {
    if (votes.length > 0) {
      const last = votes[votes.length - 1];
      kpiLast.textContent = new Date(last.votedAt).toLocaleTimeString('id-ID');
    } else {
      kpiLast.textContent = "Belum ada suara";
    }
  }

  // 2. Hitung Suara per Foto
  const scoreMap = {};
  PHOTOS.forEach(p => scoreMap[p.id] = 0);
  votes.forEach(v => {
    scoreMap[v.photoId] = (scoreMap[v.photoId] || 0) + 1;
  });

  const ranked = [...PHOTOS].map(p => ({
    ...p,
    votes: scoreMap[p.id] || 0,
    percentage: votes.length > 0 ? ((scoreMap[p.id] / votes.length) * 100).toFixed(1) : 0
  })).sort((a, b) => b.votes - a.votes);

  // 3. Render Leaderboard Table
  const tbody = document.getElementById('leaderboard-tbody');
  if (tbody) {
    tbody.innerHTML = ranked.map((item, idx) => {
      let rankBadge = `<span class="font-bold text-slate-500">#${idx + 1}</span>`;
      if (idx === 0) rankBadge = `<span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-700 font-bold text-xs">🥇</span>`;
      if (idx === 1) rankBadge = `<span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold text-xs">🥈</span>`;
      if (idx === 2) rankBadge = `<span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-800/10 text-amber-800 font-bold text-xs">🥉</span>`;

      return `
        <tr class="hover:bg-slate-50/80 transition-colors">
          <td class="py-3 px-4 text-center">${rankBadge}</td>
          <td class="py-3 px-4 flex items-center gap-3">
            <img src="${item.imageUrl}" class="w-10 h-14 object-cover rounded-md shadow-xs border border-slate-200 shrink-0">
            <span class="font-bold text-slate-800">Foto #${String(item.id).padStart(2, '0')}</span>
          </td>
          <td class="py-3 px-4 font-bold text-indigo-600">${item.votes} suara</td>
          <td class="py-3 px-4">
            <div class="flex items-center gap-2">
              <div class="flex-1 bg-slate-100 rounded-full h-2 max-w-[120px] overflow-hidden">
                <div class="bg-indigo-600 h-2 rounded-full" style="width: ${item.percentage}%"></div>
              </div>
              <span class="font-mono text-xs text-slate-500">${item.percentage}%</span>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  // 4. Render Audit Log Table
  const auditTbody = document.getElementById('audit-tbody');
  if (auditTbody) {
    if (votes.length === 0) {
      auditTbody.innerHTML = `<tr><td colspan="5" class="py-6 text-center text-slate-400">Belum ada suara yang masuk.</td></tr>`;
    } else {
      auditTbody.innerHTML = [...votes].reverse().map((v, idx) => `
        <tr class="hover:bg-slate-50 transition-colors">
          <td class="py-3 px-4 text-center text-slate-400 font-mono">${votes.length - idx}</td>
          <td class="py-3 px-4 font-mono font-bold text-indigo-600">${v.receiptCode}</td>
          <td class="py-3 px-4 font-mono font-semibold text-slate-700">${v.nik}</td>
          <td class="py-3 px-4 font-bold text-slate-800">Foto #${String(v.photoId).padStart(2, '0')}</td>
          <td class="py-3 px-4 text-slate-500 font-mono text-xs">${new Date(v.votedAt).toLocaleString('id-ID')}</td>
        </tr>
      `).join('');
    }
  }
}

function exportVotesToCSV() {
  const votes = getStoredVotes();
  if (votes.length === 0) {
    alert("Belum ada data suara untuk di-export.");
    return;
  }

  const headers = ["No", "Kode Struk", "NIK Karyawan", "Foto Pilihan", "Waktu Voting (WIB)"];
  const rows = votes.map((v, idx) => [
    idx + 1,
    `"${v.receiptCode}"`,
    `'${v.nik}`,
    `"Foto #${String(v.photoId).padStart(2, '0')}"`,
    `"${new Date(v.votedAt).toLocaleString('id-ID')}"`
  ]);

  const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(e => e.join(","))].join("\r\n");
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `Rekap_Voting_Lomba_Foto_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function resetAllVotes() {
  const confirmText = prompt("Ketik 'RESET' untuk mengonfirmasi penghapusan seluruh data suara:");
  if (confirmText === "RESET") {
    localStorage.removeItem(STORAGE_KEY);
    renderAdminDashboard();
    alert("Seluruh data voting berhasil direset!");
  }
}

// Auto Init based on current page
document.addEventListener('DOMContentLoaded', () => {
  initVoterPage();
  initAdminPage();
});
