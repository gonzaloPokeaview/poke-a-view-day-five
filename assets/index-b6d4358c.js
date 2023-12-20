(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))f(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const y of n.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&f(y)}).observe(document,{childList:!0,subtree:!0});function i(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function f(e){if(e.ep)return;e.ep=!0;const n=i(e);fetch(e.href,n)}})();const h=(t,o)=>{for(const i in o)t.style[i]=o[i]},$=t=>t.charAt(0).toUpperCase()+t.slice(1),L=(t,o)=>{const i=t.indexOf(o);i!==-1&&t.splice(i,1)},B=document.body,x=document.createElement("header"),b=document.createElement("section");b.id="main";const k=document.createElement("img");k.src="logo.png";k.className="logoImage";const N=document.createElement("article");N.id="siteInfo";const A=document.createElement("h2");A.textContent="Come and find out which of the Nintendo Pokémon games your favorite Pokémon was featured in!";N.append(A);let c=[];JSON.stringify(c);let O=0;window.addEventListener("beforeunload",t=>{localStorage.setItem("favoriteArray",JSON.stringify(c)),console.log(c)});window.addEventListener("load",t=>{console.log(c);const o=localStorage.getItem("favoriteArray");o&&(c=JSON.parse(o))});x.append(k,N);B.append(x,b);const P=async()=>{try{const o=await(await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")).json(),i=async(f,e)=>{const n=e<10?`000${e+1}`:e<100?`00${e+1}`:e<1e3?`0${e+1}`:`${e+1}`,s=await(await fetch(f)).json(),u=document.createElement("div");u.className="eachPokeBox";const v=document.createElement("h3"),d=document.createElement("img"),l=document.createElement("input");l.value="More info",l.type="submit",l.id=`${s.name}moreInfoButton`;const a=document.createElement("input");a.value="Add to favorites",a.type="submit",a.className="heart",a.id=`${s.name}favoriteButton`;const r=document.createElement("div"),E=document.createElement("div"),g=$(s.name);v.textContent=`${g} #${n}`,s.sprites.other["official-artwork"].front_default?(d.src=`${s.sprites.other["official-artwork"].front_default}`,d.alt=`picture of ${s.name}`):(d.src="https://t4.ftcdn.net/jpg/00/89/55/15/240_F_89551596_LdHAZRwz3i4EM4J0NHNHy2hEUYDfXc0j.jpg",d.alt=`Sorry no image available at this time of ${s.name}`),u.append(v,d,l,a),E.id=`${s.name}GameInfo`,E.className="gameInfo",r.className="pokemonCard",r.textContent=`${g} is a pokemon that can be found in the following version(s) of the Pokemon games:`,r.style.display="none",r.append(E),b.append(r),l.addEventListener("click",p=>{if(p.preventDefault(),p.target.id===`${s.name}moreInfoButton`)if(r.style.display==="none"){r.style.display="block";const m=document.createElement("div");m.className="modal-bg",m.style.display="flex",m.appendChild(r),document.body.appendChild(m),h(r,{color:"blue","background-color":"#F0F8FF",padding:"1em",margin:"1em","max-width":"50vw","border-radius":"1em"}),l.value="Close",p.target.checked||(s.game_indices.forEach(async I=>{const w=document.createElement("p");w.className="gameText";const C=$(I.version.name);w.textContent=`${C}`,E.append(w)}),p.target.checked=!0),r.append(l,a,v,d)}else{r.style.display="none",l.value="More info",u.append(v,d,l,a);const m=document.querySelector(".modal-bg");m.style.display="none",m.parentNode.removeChild(m)}}),a.addEventListener("click",p=>{p.preventDefault(),console.log(`favoriteAmount:${O}, favoriteArray.length: ${c.length}, favoriteArray: ${c}`),c.includes(g)?(L(c,g),a.value="Add to favorites",h(a,{color:"white","background-color":"#1A1A1A"})):(c.push(g),a.value="Remove from favorites",h(a,{color:"Black","background-color":"white"}))}),b.appendChild(u),h(u,{"font-size":"0.85em",color:"blue","background-color":"coral",padding:"10px",margin:"1em",width:"20%","border-radius":"1em"}),h(d,{width:"75%","max-width":"300px"})};o.results.forEach(async(f,e)=>{await i(f.url,e)})}catch(t){console.error("Error:",t)}};P();