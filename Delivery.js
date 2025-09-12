document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById('sidebarMenu');
  const mainContent = document.getElementById('mainContent');
  const SIDEBAR_WIDTH = 220;

  sidebar.addEventListener('shown.bs.collapse', () => {
    mainContent.style.marginLeft = SIDEBAR_WIDTH + 'px';
  });

  sidebar.addEventListener('hidden.bs.collapse', () => {
    mainContent.style.marginLeft = '0';
  });

  if (sidebar.classList.contains('show')) {
    mainContent.style.marginLeft = SIDEBAR_WIDTH + 'px';
  } else {
    mainContent.style.marginLeft = '0';
  }
});

const companies = [
  {
    id: "gofast",
    name: "GoFast Delivery",
    tagline: "Coming Fast to your home",
    schedule: "Mon-Fri • 9:00am-6:00pm",
    phone: "09-249754385",
    email: "gofast@gmail.com",
    fees: [
      { weight: "1 kg", price: 8 },
      { weight: "5 kg", price: 38 },
      { weight: "10 kg", price: 75 },
    ],
    notes: ["Citywide", "Cash/Card", "Tracking"]
  },
  {
    id: "weekendx",
    name: "Weekend Express",
    tagline: "We deliver even on holidays",
    schedule: "Mon-Sun • 8:00am-8:00pm",
    phone: "09-984675343",
    email: "weekendx@service.com",
    fees: [
      { weight: "1 kg", price: 10 },
      { weight: "5 kg", price: 47 },
      { weight: "10 kg", price: 88 },
    ],
    notes: ["Weekend & Holidays", "Same-day", "Fragile care"]
  },
  {
    id: "nightowl",
    name: "NightOwl Courier",
    tagline: "Anytime, anywhere 365days",
    schedule: "Open 24/7 • 365 days",
    phone: "09-770011222",
    email: "hello@nightowl.com",
    fees: [
      { weight: "1 kg", price: 9 },
      { weight: "5 kg", price: 42 },
      { weight: "10 kg", price: 85 },
    ],
    notes: ["24/7 Hotline", "Rush delivery", "Insurance"]
  }
];

const grid = document.getElementById('grid');
const q = document.getElementById('q');
let chosen = null;

function money(n){ return `$ ${n}`; }

function card(c){
  return `
    <article class="card">
      <div class="flyer-head">
        <div class="brandline">
          <div>
            <div class="brand">${c.name}</div>
            <div class="tagline">${c.tagline}</div>
          </div>
          <div style="text-align:right">
            <div style="font-size:12px; opacity:.9">${c.phone}</div>
            <div style="font-size:12px; opacity:.9">${c.email}</div>
          </div>
        </div>
      </div>
      <div class="delibody">
        <div class="row">🕒 <b>${c.schedule}</b></div>
        <div class="divider"></div>
        <div class="fees">
          <table>
            <thead><tr><th align="left">Weight</th><th align="right">Deli Fee</th></tr></thead>
            <tbody>
              ${c.fees.map(f=>`<tr><td>${f.weight}</td><td align="right">${money(f.price)}</td></tr>`).join("")}
            </tbody>
          </table>
        </div>
        <div class="row" style="flex-wrap:wrap">
          ${c.notes.map(n=>`<span class="badge">${n}</span>`).join("")}
        </div>
        <div class="cta">
          <button class="btn outline" onclick="showContact('${c.id}')">Contact</button>
          <button class="btn primary" onclick="chooseDeli('${c.id}')">Choose</button>
        </div>
      </div>
    </article>`;
}

function render(){
  const query = q.value.trim().toLowerCase();
  const list = companies.filter(c=>{
    if(query){
      const hay = `${c.name} ${c.tagline} ${c.email} ${c.phone}`.toLowerCase();
      return hay.includes(query);
    }
    return true;
  });
  grid.innerHTML = list.map(card).join("") || "<div style='opacity:.6'>No search result.</div>";
}
render();
q.addEventListener('input', render);

//  Show Contact Modal
function showContact(id){
  const c = companies.find(x=>x.id===id);
  if(!c) return;

  const text = `
    <h2>${c.name}</h2>
    <p><b>☎️ Phone:</b> ${c.phone}</p>
    <p><b>✉️ Email:</b> ${c.email}</p>
    <p><b>⏰ Schedule:</b> ${c.schedule}</p>
    <p><b>Fees:</b> ${c.fees.map(f => `${f.weight} = ${money(f.price)}`).join(", ")}</p>
    <button class="closeBtn">Close</button>
  `;

  const modal = document.getElementById("contactModal");
  const content = modal.querySelector(".modal-content");
  content.innerHTML = text;
  modal.style.display = "flex";

  content.querySelector(".closeBtn").onclick = () => {
    modal.style.display = "none";
  };
}

// Background click close
window.addEventListener("click", (e) => {
  const modal = document.getElementById("contactModal");
  if(e.target.id === "contactModal"){
    modal.style.display = "none";
  }
});

// Choose deli
function chooseDeli(id){
  const c = companies.find(x=>x.id===id);
  if(!c) return;
  chosen = c;
  localStorage.setItem('chosenDeli', JSON.stringify({id:c.id, at:Date.now()}));
  updateChosen();
}

function updateChosen(){
  const wrap = document.getElementById('chosen');
  if(!chosen){
    wrap.innerHTML = "<span class='empty'>No choose</span>";
    return;
  }
  wrap.innerHTML = `
    <span class="pill">Choose Deli: <b>${chosen.name}</b></span>
    <span class="mini">
      <b>☎️</b> ${chosen.phone} <span class="sep-dot"></span>
      <b>✉️</b> ${chosen.email} <span class="sep-dot"></span>
      <b>⏰</b> ${chosen.schedule}
    </span>
  `;
}