const names=['武德真經','金剛般若波羅蜜經','藥師琉璃光如來本願功德經','地藏菩薩本願經','般若波羅蜜多心經'];
const $=s=>document.querySelector(s); const key='offline-chant-web-v1';
const state=JSON.parse(localStorage.getItem(key)||'{"goals":[9,9,9,9,9],"records":{}}');
const today=new Date().toISOString().slice(0,10); $('#date').value=today;
function lunar(date){const [y,m,d]=date.split('-').map(Number);return Solar.fromYmd(y,m,d).getLunar()}
function lunarYear(date){return lunar(date).getYear()-1911}
function lunarMonthKey(date){const x=lunar(date);return `${x.getYear()}-${x.getMonth()}`}
function saveState(){localStorage.setItem(key,JSON.stringify(state))}
function totals(filter){const out=[0,0,0,0,0];Object.entries(state.records).filter(([date])=>filter(date)).forEach(([,v])=>v.forEach((n,i)=>out[i]+=n));return out}
function cards(target, values, goals){target.innerHTML=names.map((name,i)=>`<div class="item">${name}<b>${values[i]}${goals?` / ${goals[i]}`:' 部'}</b>${goals?`<progress max="${goals[i]}" value="${Math.min(values[i],goals[i])}"></progress>`:''}</div>`).join('')}
function render(){const date=$('#date').value;const l=lunar(date);$('#lunar').textContent=`農曆 ${l.toString()}・所有資料只保存在本機`;const counts=state.records[date]||[0,0,0,0,0];$('#inputs').innerHTML=names.map((n,i)=>`<label>${n}<input class="count" type="number" min="0" inputmode="numeric" value="${counts[i]}"></label>`).join('');cards($('#monthly'),totals(d=>lunarMonthKey(d)===lunarMonthKey(date)),state.goals);const year=lunarYear(date);$('#yearTitle').textContent=`年度統計（民國 ${year} 年・農曆）`;const annual=totals(d=>lunarYear(d)===year);$('#yearTotal').textContent=`年度總和：${annual.reduce((a,b)=>a+b,0)} 部`;cards($('#annual'),annual,null)}
$('#date').addEventListener('change',render);$('#save').onclick=()=>{state.records[$('#date').value]=[...document.querySelectorAll('.count')].map(x=>Math.max(0,parseInt(x.value||0,10)));saveState();render();alert('已儲存到此裝置。')};
$('#settings').onclick=()=>{const box=$('#goalInputs');box.innerHTML=names.map((n,i)=>`<label>${n}（部）<input class="goal" type="number" min="1" value="${state.goals[i]}"></label>`).join('');$('#goalDialog').showModal()};$('#cancel').onclick=()=>$('#goalDialog').close();$('#saveGoals').onclick=()=>{const goals=[...document.querySelectorAll('.goal')].map(x=>parseInt(x.value,10));if(goals.some(x=>!Number.isInteger(x)||x<1))return alert('請輸入大於 0 的整數。');state.goals=goals;saveState();$('#goalDialog').close();render()};
if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js');render();
