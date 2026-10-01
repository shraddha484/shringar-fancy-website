// ---- Edit the shop details here. Everything on the page updates from this block. ----
const SHOP = {
  phone: "09945320189",
  whatsapp: "919945320189",            // country code + number, no + or spaces
  phoneLabel: "099453 20189",
  hours: "Open daily, closing at 8:30 pm",
  email: "",                            // leave empty to hide
  instagram: "",                        // paste profile link; leave empty to hide
  facebook: "",
  mapQuery: "Shringar Arahanth Complex Moodbidri"
};

// ---- Categories and products. Add price: "₹150" to any product to show a price. ----
const CATEGORIES = [
  { id: "gifts",   name: "Gifts",                 icon: "🎁", color: "#b3123f" },
  { id: "jewel",   name: "Fashion jewellery",     icon: "💍", color: "#c9972b" },
  { id: "bags",    name: "Bags & purses",         icon: "👜", color: "#0f7a5a" },
  { id: "beauty",  name: "Beauty & cosmetics",    icon: "💄", color: "#c2288f" },
  { id: "hair",    name: "Hair accessories",      icon: "🎀", color: "#7a3fb3" },
  { id: "toys",    name: "Toys",                  icon: "🧸", color: "#d9732b" },
  { id: "home",    name: "Home & decor",          icon: "🏠", color: "#2b7fb3" },
  { id: "party",   name: "Party & celebration",   icon: "🎉", color: "#b31264" },
  { id: "station", name: "Stationery",            icon: "✏️", color: "#4a7a0f" }
];

const PRODUCTS = [
  { cat: "gifts",   name: "Gift hampers",          desc: "Ready-to-give sets for birthdays and weddings." },
  { cat: "gifts",   name: "Showpieces",            desc: "Small decorative pieces for any shelf." },
  { cat: "jewel",   name: "Glass bangles", img: "images/glass-bangles.jpg",         desc: "Bright sets in many colours, in all sizes." },
  { cat: "jewel",   name: "Earrings and jhumkas", img: "images/gold-jewellery.jpg",  desc: "Oxidised, stone and gold-tone designs." },
  { cat: "jewel",   name: "Necklace sets", img: "images/gold-jewellery.jpg",         desc: "Matching necklace and earring sets." },
  { cat: "bags",    name: "Handbags", img: "images/bags-shop.jpg",              desc: "Daily and occasion bags in new styles." },
  { cat: "bags",    name: "Purses and pouches",    desc: "Compact purses and travel pouches." },
  { cat: "beauty",  name: "Makeup basics",         desc: "Everyday cosmetics at friendly prices." },
  { cat: "beauty",  name: "Bindis and mehendi",    desc: "Festive and bridal essentials." },
  { cat: "hair",    name: "Clips and bands",       desc: "Clips, scrunchies and hair bands." },
  { cat: "hair",    name: "Hair accessories sets", desc: "Combo sets for girls and women." },
  { cat: "toys",    name: "Soft toys", img: "images/toys.jpg",             desc: "Cuddly gifts for kids." },
  { cat: "toys",    name: "Play toys", img: "images/toys.jpg",             desc: "Fun toys for different ages." },
  { cat: "home",    name: "Decor items",           desc: "Small pieces to brighten your home." },
  { cat: "home",    name: "Pooja items",           desc: "Festival and pooja essentials." },
  { cat: "party",   name: "Party supplies",        desc: "Balloons, banners and return gifts." },
  { cat: "party",   name: "Festival decor",        desc: "Lights and decorations for celebrations." },
  { cat: "station", name: "Notebooks and pens",    desc: "School and office stationery." },
  { cat: "station", name: "Craft supplies",        desc: "Colours, paper and craft items." }
];

// ---- Helpers ----
const waLink = msg => "https://wa.me/" + SHOP.whatsapp + (msg ? "?text=" + encodeURIComponent(msg) : "");
const $ = s => document.querySelector(s);
const catById = id => CATEGORIES.find(c => c.id === id);

// Contact links
document.querySelectorAll("[data-tel]").forEach(a => { a.href = "tel:" + SHOP.phone; if (!a.textContent.trim()) a.textContent = SHOP.phoneLabel; });
document.querySelectorAll("[data-wa]").forEach(a => {
  a.href = waLink(a.getAttribute("data-wa"));
  a.target = "_blank"; a.rel = "noopener";
  if (!a.textContent.trim()) a.textContent = SHOP.phoneLabel;
});
$("#hours").textContent = SHOP.hours;
const q = encodeURIComponent(SHOP.mapQuery);
$("#dir").href = "https://www.google.com/maps/search/?api=1&query=" + q;
$("#map").src = "https://www.google.com/maps?q=" + q + "&output=embed";
if (SHOP.email) { $("#emailL").hidden = false; $("#email").hidden = false; $("#email a").href = "mailto:" + SHOP.email; $("#email a").textContent = SHOP.email; }
SHOP.instagram ? $("#insta").href = SHOP.instagram : $("#insta").remove();
SHOP.facebook ? $("#fb").href = SHOP.facebook : $("#fb").remove();
$("#year").textContent = new Date().getFullYear();

// Category tiles (top of page)
$("#cats").innerHTML = CATEGORIES.map(c =>
  `<a class="cat" href="#collections" data-cat="${c.id}" style="--c:${c.color}"><span>${c.icon}</span>${c.name}</a>`).join("");

// Filter chips + product grid
let active = "all";
function renderProducts() {
  $("#chips").innerHTML = [{ id: "all", name: "All" }, ...CATEGORIES].map(c =>
    `<button class="chip" data-cat="${c.id}" aria-pressed="${c.id === active}">${c.name}</button>`).join("");
  const list = PRODUCTS.filter(p => active === "all" || p.cat === active);
  $("#products").innerHTML = list.map(p => {
    const c = catById(p.cat);
    const msg = "Hi Shringar, I'd like to enquire about: " + p.name;
    return `<article class="prod">
      ${p.img ? `<img class="img" src="${p.img}" alt="${p.name}" loading="lazy">` : `<div class="img" style="background:${c.color}" role="img" aria-label="${p.name}">${c.icon}</div>`}
      <div class="body"><h3>${p.name}</h3><p>${p.desc}</p>${p.price ? `<b>${p.price}</b>` : ""}
      <a class="btn fill sm" href="${waLink(msg)}" target="_blank" rel="noopener">Enquire on WhatsApp</a></div></article>`;
  }).join("");
}
document.addEventListener("click", e => {
  const t = e.target.closest("[data-cat]");
  if (!t) return;
  active = t.dataset.cat;
  renderProducts();
});
renderProducts();
