document.addEventListener('DOMContentLoaded',()=>{
 const catalog=document.querySelector('#bookingServices');
 const steps=[...document.querySelectorAll('.booking-step')];
 const form=document.querySelector('#bookingForm');
 const progress=[...document.querySelectorAll('.booking-progress span')];
 let current=1; let selected=null;
 const services=Array.isArray(window.CHAMOMILE_SERVICES)?window.CHAMOMILE_SERVICES:[];
 const flat=services.flatMap(group=>group.items.map(item=>({category:group.category,name:item[0],description:item[1],duration:item[2]||'N/A',price:item[3]||'N/A'})));
 const show=n=>{current=n;steps.forEach(s=>s.classList.toggle('active',Number(s.dataset.step)===n));progress.forEach((s,i)=>s.classList.toggle('active',i<n));document.querySelector('.booking-shell')?.scrollIntoView({behavior:'smooth',block:'start'});};
 if(catalog){
   if(!flat.length){catalog.innerHTML='<div class="empty-state"><strong>Services are being prepared.</strong><span>Please check back soon.</span></div>'}
   else {
    catalog.innerHTML=services.map((group,gi)=>`<section class="booking-category"><div class="category-title"><div><span>${String(gi+1).padStart(2,'0')}</span><h3>${group.category}</h3></div><small>${group.items.length} SERVICES · PRICES N/A</small></div><div class="booking-service-grid">${group.items.map((s,i)=>`<button type="button" class="booking-service" data-service-index="${flat.findIndex(x=>x.name===s[0]&&x.category===group.category)}"><span>${String(i+1).padStart(2,'0')}</span><strong>${s[0]}</strong><small>${s[2]||'Duration N/A'} · Price N/A</small><i>Choose</i></button>`).join('')}</div></section>`).join('');
    catalog.querySelectorAll('.booking-service').forEach(btn=>btn.addEventListener('click',()=>{catalog.querySelectorAll('.booking-service').forEach(b=>b.classList.remove('selected'));btn.classList.add('selected');selected=flat[Number(btn.dataset.serviceIndex)];document.querySelector('[data-next="2"]')?.focus();}));
   }
 }
 document.querySelectorAll('[data-next]').forEach(btn=>btn.addEventListener('click',()=>{if(current===1&&!selected){catalog?.classList.add('shake');setTimeout(()=>catalog?.classList.remove('shake'),450);return}if(current===3){const date=document.querySelector('#date'),time=document.querySelector('#time');if(!date?.reportValidity()||!time?.reportValidity())return}show(Number(btn.dataset.next));}));
 document.querySelectorAll('[data-prev]').forEach(btn=>btn.addEventListener('click',()=>show(Number(btn.dataset.prev))));
 document.querySelectorAll('.choice').forEach(c=>c.addEventListener('click',()=>{document.querySelectorAll('.choice').forEach(x=>x.classList.remove('selected'));c.classList.add('selected');const input=c.querySelector('input');if(input)input.checked=true;}));
 const date=document.querySelector('#date');if(date){const d=new Date();d.setMinutes(d.getMinutes()-d.getTimezoneOffset());date.min=d.toISOString().split('T')[0];}
 form?.addEventListener('submit',e=>{e.preventDefault();const name=form.elements.name.value.trim();if(!name)return;form.hidden=true;document.querySelector('.booking-progress').hidden=true;const success=document.querySelector('#bookingSuccess');document.querySelector('#successName').textContent=name;success.hidden=false;window.scrollTo({top:0,behavior:'smooth'});});
});