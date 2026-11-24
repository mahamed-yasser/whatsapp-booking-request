(function(){var $=U.$,h=U.h;
var S=U.load('bk.setup',{biz:'Sample Dental Clinic',phone:'',svcs:'Check-up\nTeeth cleaning\nWhitening consultation'});
['biz','phone','svcs'].forEach(function(k){$(k).value=S[k];$(k).addEventListener('input',function(){S[k]=$(k).value;if(!CUST)U.save('bk.setup',S);drawSvc();build()})});
var CUST=false;
function enc(o){return btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')}
function dec(s){try{var o=JSON.parse(decodeURIComponent(escape(atob(s.replace(/-/g,'+').replace(/_/g,'/')))));
 if(!o||typeof o.b!=='string'||typeof o.p!=='string'||typeof o.s!=='string')return null;
 var sv=o.s.split('\n').map(function(x){return x.trim().slice(0,60)}).filter(Boolean).slice(0,20);
 if(!sv.length||!/^[1-9]\d{7,14}$/.test(o.p.replace(/[\s\-+()]/g,'')))return null;
 return {biz:o.b.slice(0,80),phone:o.p.replace(/[\s\-+()]/g,''),svcs:sv.join('\n')}}catch(e){return null}}
var m=/^#cfg=([A-Za-z0-9_-]+)$/.exec(location.hash||'');
if(m){var c=dec(m[1]);if(c){S=c;CUST=true;var sp=$('setup');if(sp)sp.hidden=true}}
var d=new Date();d.setDate(d.getDate()+1);$('date').min=U.today();
function drawSvc(){var cur=$('svc').value,s=$('svc');s.textContent='';S.svcs.split('\n').map(function(x){return x.trim()}).filter(Boolean).slice(0,20).forEach(function(x){s.appendChild(h('option',{value:x,text:x}))});if(cur)s.value=cur}
function digits(p){return String(p).replace(/[\s\-+()]/g,'')}
function build(showErr){var er=[],se=[];var p=digits(S.phone);
 if(!/^[1-9]\d{7,14}$/.test(p))se.push(p?'WhatsApp number must be 8 to 15 digits with country code, no leading 0 or +.':'Enter the business WhatsApp number (with country code) in Business setup. The button stays disabled until a valid number is set.');
 if(!S.svcs.trim())se.push('Add at least one service.');
 $('serr').textContent=se.join(' ');$('serr').hidden=!se.length;
 var n=$('name').value.trim(),dt=$('date').value,tm=$('time').value;
 if(n.length<2)er.push('Enter your name.');if(!dt)er.push('Pick a date.');else if(dt<U.today())er.push('Date is in the past.');if(!tm)er.push('Pick a time.');
 var msg='Hello'+(S.biz?' '+S.biz:'')+', I would like to request an appointment.\n\nName: '+n+'\nService: '+$('svc').value+'\nPreferred: '+dt+' at '+tm+($('alt').value.trim()?'\nAlternative: '+$('alt').value.trim():'')+($('notes').value.trim()?'\nNotes: '+$('notes').value.trim():'')+'\n\nPlease confirm if this time is available. Thank you.';
 $('prev').textContent=msg;var ok=!er.length&&!se.length;
 if(showErr){$('err').textContent=er.concat(se).join(' ');$('err').hidden=ok}
 var a=$('send');if(ok){a.href='https://wa.me/'+p+'?text='+encodeURIComponent(msg);a.removeAttribute('aria-disabled')}else{a.href='#';a.setAttribute('aria-disabled','true')}
 return {ok:ok,msg:msg,errs:er.concat(se)}}
['name','svc','date','time','alt','notes'].forEach(function(k){$(k).addEventListener('input',function(){build(false)})});
$('send').addEventListener('click',function(e){var r=build(true);if(!r.ok)e.preventDefault()});
$('copy').addEventListener('click',function(){var r=build(true);if(!r.ok)return;window.__copied=r.msg;if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(r.msg).catch(function(){})});
var lk=$('mklink');if(lk)lk.addEventListener('click',function(){var p=digits(S.phone);if(!/^[1-9]\d{7,14}$/.test(p)||!S.svcs.trim()){$('serr').textContent='Fix the number and services first.';$('serr').hidden=false;return}
 var u=location.href.split('#')[0]+'#cfg='+enc({b:S.biz,p:p,s:S.svcs});$('linkout').value=u;$('linkbox').hidden=false;if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(u).catch(function(){})});
drawSvc();build(false);window.__bk={build:build,enc:enc,dec:dec};
})();
