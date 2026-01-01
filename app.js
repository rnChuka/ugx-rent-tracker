const list = document.getElementById("tenantList");

function getTenants() {
  return JSON.parse(localStorage.getItem("tenants")) || [];
}

function saveTenants(tenants) {
  localStorage.setItem("tenants", JSON.stringify(tenants));
}

function addTenant() {
  const name = document.getElementById("name").value;
  const rent = document.getElementById("rent").value;

  if (!name || !rent) return;

  const tenants = getTenants();
  tenants.push({
    name: name,
    rent: rent,
    paid: false
  });

  saveTenants(tenants);
  render();
}

function togglePaid(index) {
  const tenants = getTenants();
  tenants[index].paid = !tenants[index].paid;
  saveTenants(tenants);
  render();
}

function render() {
  list.innerHTML = "";
  const tenants = getTenants();

  tenants.forEach((t, i) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div>
        <strong>${t.name}</strong><br>
        UGX ${t.rent}
      </div>
      <button class="${t.paid ? 'paid' : 'unpaid'}"
        onclick="togglePaid(${i})">
        ${t.paid ? "Paid" : "Unpaid"}
      </button>
    `;

    list.appendChild(li);
  });
}

render();

/* Register service worker */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
