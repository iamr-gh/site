async function u(){const r=document.getElementById("github-loading"),a=document.getElementById("github-content"),o=document.getElementById("github-error");try{const n=await fetch("https://api.github.com/users/iamr-gh/events?per_page=30");if(!n.ok)throw new Error("Failed to fetch GitHub data");const s=(await n.json()).filter(t=>t.type==="PushEvent"),i=new Map;s.forEach(t=>{const e=t.repo.name;i.has(e)||i.set(e,{name:e,description:t.payload.description||"",url:`https://github.com/${e}`,lastPush:new Date(t.created_at)})});const d=Array.from(i.values()).sort((t,e)=>e.lastPush-t.lastPush).slice(0,3);if(r.classList.add("hidden"),d.length===0){o.textContent="No recent activity found",o.classList.remove("hidden");return}a.innerHTML=d.map(t=>{const e=l(t.lastPush);return`
          <div class="space-y-1">
            <a href="${t.url}" target="_blank" rel="noopener noreferrer" 
               class="text-sm font-medium text-foreground hover:text-primary transition-colors">
              ${t.name}
            </a>
            <p class="text-xs text-muted-foreground">
              ${t.description||"No description available"}
            </p>
            <p class="text-xs text-muted-foreground">
              updated ${e}
            </p>
          </div>
        `}).join(""),a.classList.remove("hidden")}catch(n){console.error("Error fetching GitHub activity:",n),r.classList.add("hidden"),o.classList.remove("hidden")}}function l(r){const a=Math.floor((new Date-r)/1e3),o={year:31536e3,month:2592e3,week:604800,day:86400,hour:3600,minute:60};for(const[n,c]of Object.entries(o)){const s=Math.floor(a/c);if(s>=1)return s===1?`1 ${n} ago`:`${s} ${n}s ago`}return"just now"}document.addEventListener("DOMContentLoaded",u);
