import{s as d,I as l,a as o,b as c,g as m}from"./hero-finder.CjyutB_r.js";let t=l;const r={tiles:document.getElementById("afinder-tiles"),intermediateAddress:document.getElementById("afinder-intermediate-address"),intermediateCoworking:document.getElementById("afinder-intermediate-coworking"),result:document.getElementById("afinder-result")},f=document.getElementById("afinder-result-card");function n(e){if(Object.values(r).forEach(i=>i.classList.add("finder__stage--hidden")),e.stage==="tiles"){r.tiles.classList.remove("finder__stage--hidden");return}if(e.stage==="intermediate"){e.tileId==="address"&&r.intermediateAddress.classList.remove("finder__stage--hidden"),e.tileId==="coworking"&&r.intermediateCoworking.classList.remove("finder__stage--hidden");return}e.stage==="result"&&(r.result.classList.remove("finder__stage--hidden"),g(e.packageId))}function g(e){const i=m(e),a=i.recommended;f.innerHTML=`
      <div style="
        position:relative;
        background:#fff;
        border:${a?"2px solid #b45309":"1px solid #e8ddd0"};
        border-radius:14px;
        padding:1.75rem;
        box-shadow:0 2px 12px rgba(0,0,0,0.08);
      ">
        ${a?'<span style="position:absolute;top:-1px;right:1.25rem;background:#b45309;color:#fff;font-size:0.68rem;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;padding:3px 10px;border-radius:0 0 8px 8px;">Empfohlen</span>':""}
        <h3 style="font-family:var(--font-heading);font-size:1.15rem;font-weight:700;color:#1c1917;margin:0 0 0.35rem 0;">${i.name}</h3>
        <div style="display:flex;align-items:baseline;gap:0.25rem;margin-bottom:0.75rem;">
          <span style="font-family:var(--font-heading);font-size:1.75rem;font-weight:700;color:#b45309;line-height:1;">${i.price}</span>
          <span style="font-size:0.82rem;color:#78716c;">${i.priceNote}</span>
        </div>
        <p style="font-size:0.875rem;color:#57534e;font-style:italic;margin:0 0 1.1rem 0;line-height:1.55;border-bottom:1px solid #f0e8df;padding-bottom:1rem;">${i.personaText}</p>
        <ul style="list-style:none;padding:0;margin:0 0 1.5rem 0;display:flex;flex-direction:column;gap:0.55rem;">
          ${i.features.map(s=>`<li style="display:flex;align-items:flex-start;gap:0.55rem;font-size:0.875rem;color:#1c1917;line-height:1.45;"><svg style="flex-shrink:0;margin-top:0.15rem;color:#b45309;" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg><span>${s}</span></li>`).join("")}
        </ul>
        <a href="${i.ctaHref}" style="display:inline-flex;align-items:center;justify-content:center;width:100%;background:#b45309;color:#fff;font-weight:600;font-size:0.9rem;padding:0.75rem 1.25rem;border-radius:8px;text-decoration:none;min-height:44px;transition:background 0.2s;" onmouseover="this.style.background='#92400e'" onmouseout="this.style.background='#b45309'">${i.cta}</a>
      </div>`}document.querySelectorAll("#advisor-finder [data-tile]").forEach(e=>{e.addEventListener("click",()=>{t=d(e.dataset.tile),n(t)})});r.intermediateAddress.querySelectorAll("[data-option]").forEach(e=>{e.addEventListener("click",()=>{t.stage==="intermediate"&&(t=o(t,e.dataset.option),n(t))})});r.intermediateCoworking.querySelectorAll("[data-option]").forEach(e=>{e.addEventListener("click",()=>{t.stage==="intermediate"&&(t=o(t,e.dataset.option),n(t))})});["aback-from-address","aback-from-coworking","aback-from-result"].forEach(e=>{document.getElementById(e)?.addEventListener("click",()=>{t=c(),n(t)})});n(t);
