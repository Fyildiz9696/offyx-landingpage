import{s as n,I as c,a as d,b as l,g as o}from"./hero-finder.CjyutB_r.js";let t=c;const a={tiles:document.getElementById("afinder-tiles"),intermediateAddress:document.getElementById("afinder-intermediate-address"),intermediateCoworking:document.getElementById("afinder-intermediate-coworking"),result:document.getElementById("afinder-result")},u=document.getElementById("afinder-result-card");function s(e){if(Object.values(a).forEach(r=>r.classList.add("finder__stage--hidden")),e.stage==="tiles"){a.tiles.classList.remove("finder__stage--hidden");return}if(e.stage==="intermediate"){e.tileId==="address"&&a.intermediateAddress.classList.remove("finder__stage--hidden"),e.tileId==="coworking"&&a.intermediateCoworking.classList.remove("finder__stage--hidden");return}e.stage==="result"&&(a.result.classList.remove("finder__stage--hidden"),m(e.packageId))}function m(e){const r=o(e);u.innerHTML=`
      <div class="result-card ${r.recommended?"result-card--recommended":""}">
        ${r.recommended?'<span class="result-card__badge">Empfohlen</span>':""}
        <div class="result-card__header">
          <h3 class="result-card__name">${r.name}</h3>
          <div class="result-card__price"><span class="result-card__price-amount">${r.price}</span><span class="result-card__price-note">${r.priceNote}</span></div>
        </div>
        <p class="result-card__persona">${r.personaText}</p>
        <ul class="result-card__features" role="list">
          ${r.features.map(i=>`<li class="result-card__feature"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg><span>${i}</span></li>`).join("")}
        </ul>
        <div class="result-card__actions"><a class="btn btn--primary result-card__cta" href="${r.ctaHref}">${r.cta}</a></div>
      </div>`}document.querySelectorAll("#advisor-finder [data-tile]").forEach(e=>{e.addEventListener("click",()=>{t=n(e.dataset.tile),s(t)})});a.intermediateAddress.querySelectorAll("[data-option]").forEach(e=>{e.addEventListener("click",()=>{t.stage==="intermediate"&&(t=d(t,e.dataset.option),s(t))})});a.intermediateCoworking.querySelectorAll("[data-option]").forEach(e=>{e.addEventListener("click",()=>{t.stage==="intermediate"&&(t=d(t,e.dataset.option),s(t))})});["aback-from-address","aback-from-coworking","aback-from-result"].forEach(e=>{document.getElementById(e)?.addEventListener("click",()=>{t=l(),s(t)})});s(t);
