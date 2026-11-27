const lead = document.querySelector(".lead");
if (lead) {
  const boxes = Array.from(lead.querySelectorAll('[name="material"]'));
  if (boxes.length) {
    const requested = new URLSearchParams(location.search).get("material");
    let selected = [];
    try { selected = JSON.parse(sessionStorage.getItem("heffco-materials") || "[]"); } catch {}
    const remember = () => {
      try { sessionStorage.setItem("heffco-materials", JSON.stringify(boxes.filter(box => box.checked).map(box => box.value))); } catch {}
    };
    for (const box of boxes) {
      box.checked = box.value === requested || selected.includes(box.value);
      box.addEventListener("change", remember);
    }
    remember();
    if (requested) history.replaceState(null, "", location.pathname);
  }
  lead.addEventListener("submit", event => {
    event.preventDefault();
    const status = document.querySelector("#confirmation");
    status.textContent = boxes.length && !boxes.some(box => box.checked)
      ? "Choose at least one material for your quote."
      : "Demo complete. Your enquiry was validated. No message was sent.";
  });
}
const calculator = document.querySelector("#calculator");
if (calculator) {
  calculator.addEventListener("submit", event => {
    event.preventDefault();
    const area = Number(document.querySelector("#width").value) * Number(document.querySelector("#length").value);
    const rate = document.querySelector("#rate");
    const total = rate ? Math.ceil(Math.round(area * Number(rate.value) * 100) / 100) : Math.round(area * 2000 / 600);
    document.querySelector("#estimate").textContent = "Estimated quantity: " + total.toLocaleString("en-CA") + " lb";
  });
}
