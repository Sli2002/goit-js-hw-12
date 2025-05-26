import{a as w,S as v,i as a}from"./assets/vendor-CrlV4O_2.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function e(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=e(t);fetch(t.href,r)}})();const q="50394880-18f1d62e7610047a874f2c643",S="https://pixabay.com/api/";async function f(o,s){const e={key:q,q:o,page:s,per_page:20,image_type:"photo",orientation:"horizontal",safesearch:!0};return(await w.get(S,{params:e})).data}const m=document.querySelector(".gallery"),p=document.querySelector(".loader"),h=document.querySelector(".load-more"),B=new v(".gallery a");function y(o){const s=o.map(e=>`
      <li class="gallery-item">
        <a href="${e.largeImageURL}">
          <img src="${e.webformatURL}" alt="${e.tags}" />
        </a>
        <div class="info">
          <p><b>Likes:</b> ${e.likes}</p>
          <p><b>Views:</b> ${e.views}</p>
          <p><b>Comments:</b> ${e.comments}</p>
          <p><b>Downloads:</b> ${e.downloads}</p>
        </div>
      </li>
    `).join("");m.insertAdjacentHTML("beforeend",s),B.refresh()}function M(){m.innerHTML=""}function g(){p.classList.remove("hidden")}function L(){p.classList.add("hidden")}function b(){h.classList.remove("hidden")}function l(){h.classList.add("hidden")}const u=document.querySelector(".form"),$=document.querySelector(".load-more");let P="",i=1,d=0;u.addEventListener("submit",async o=>{o.preventDefault();const e=o.target.elements["search-text"].value.trim();if(!e){a.warning({message:"Please enter a search query"});return}i=1,M(),l(),g();try{const n=await f(e,i);if(d=n.totalHits,n.hits.length===0){a.info({message:"No images found"});return}y(n.hits),d>15&&b()}catch{a.error({message:"Failed to fetch images"})}finally{L(),u.reset()}});$.addEventListener("click",async()=>{i+=1,g(),l();try{const o=await f(P,i);y(o.hits);const s=Math.ceil(d/20);i>=s?(a.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),l()):b();const e=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}catch{a.error({message:"Error loading more images"})}finally{L()}});
//# sourceMappingURL=index.js.map
