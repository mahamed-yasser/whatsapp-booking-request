(function(w){
var U={};
U.$=function(i){return document.getElementById(i)};
U.h=function(tag,attrs,kids){var e=document.createElement(tag);for(var k in (attrs||{})){if(k==='text')e.textContent=attrs[k];else if(k==='class')e.className=attrs[k];else e.setAttribute(k,attrs[k])}
 (kids||[]).forEach(function(c){e.appendChild(typeof c==='string'?document.createTextNode(c):c)});return e};
U.load=function(key,def){try{var v=JSON.parse(localStorage.getItem(key));return v==null?def:v}catch(e){return def}};
U.save=function(key,v){try{localStorage.setItem(key,JSON.stringify(v));return true}catch(e){return false}};
U.money=function(n,cur){return (cur||'')+(Math.round(n*100)/100).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})};
U.csvCell=function(v){v=String(v==null?'':v);if(/^[=+\-@\t\r]/.test(v)&&!(v.trim()!==''&&isFinite(Number(v))))v="'"+v;return /[",\n\r]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v};
U.toCSV=function(rows){return rows.map(function(r){return r.map(U.csvCell).join(',')}).join('\r\n')};
U.parseCSV=function(t){var rows=[],row=[],f='',q=false,i=0;t=String(t).replace(/^\uFEFF/,'');
 for(;i<t.length;i++){var c=t[i];
  if(q){if(c==='"'){if(t[i+1]==='"'){f+='"';i++}else q=false}else f+=c}
  else if(c==='"')q=true;else if(c===','){row.push(f);f=''}
  else if(c==='\n'||c==='\r'){if(c==='\r'&&t[i+1]==='\n')i++;row.push(f);rows.push(row);row=[];f=''}
  else f+=c}
 if(f!==''||row.length){row.push(f);rows.push(row)}return rows};
U.download=function(name,text,type){var b=new Blob(['\uFEFF'+text],{type:type||'text/csv;charset=utf-8'});var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name;document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},500)};
U.today=function(){var d=new Date();return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2)};
w.U=U})(window);
