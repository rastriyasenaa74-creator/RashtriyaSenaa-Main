const API_URL="https://script.google.com/macros/s/AKfycbw2OTyx412C8_czpqRJ-0-GbOTZcSzSJvENMiXoLZ0cfS1-mw_qiTKzLgLluy2_nrvV1w/exec";

const items=[
["index.html","HOME"],
["about.html","ABOUT US"],
["mission.html","MISSION & VISION"],
["membership.html","MEMBERSHIP"],
["how-to-join.html","HOW TO JOIN"],
["contact.html","CONTACT US"]
];

const cur=(location.pathname.split("/").pop()||"index.html").toLowerCase();

const h=document.querySelector("header");

if(h)
h.innerHTML=
'<div class="top"><div class="container">'+
'<span>★ न्याय • समानता • संविधान ★</span>'+
'<span>भारत के लिए • समाज के लिए</span>'+
'</div></div>'+
'<div class="navbar"><div class="container nav">'+
'<a class="brand" href="index.html">RashtriyaSenaa<span>मानव जन कल्याण समिति</span></a>'+
'<button class="menu" id="menu">☰</button>'+
'<nav class="navlinks" id="navlinks">'+
items.map(x=>'<a class="'+(cur===x[0]?"active":"")+'" href="'+x[0]+'">'+x[1]+'</a>').join("")+
'<a href="login.html">MEMBER LOGIN</a>'+
'<a class="join" href="register.html">JOIN NOW</a>'+
'</nav></div></div>';

document.getElementById("menu")?.addEventListener(
"click",
()=>document.getElementById("navlinks").classList.toggle("open")
);

const f=document.querySelector("footer");

if(f)
f.innerHTML=
'<div class="footer"><div class="container footgrid">'+
'<div><div class="brand" style="color:#fff">RashtriyaSenaa<span style="color:#999">मानव जन कल्याण समिति</span></div>'+
'<p>न्याय • समानता • संविधान</p></div>'+
'<div><h3>QUICK LINKS</h3>'+
items.slice(1).map(x=>'<a href="'+x[0]+'">'+x[1]+'</a>').join("")+
'</div>'+
'<div><h3>MEMBERS</h3>'+
'<a href="register.html">Member Registration</a>'+
'<a href="status.html">Check Status</a>'+
'<a href="login.html">Member Login</a>'+
'<a href="admin.html">Admin Panel</a>'+
'</div></div>'+
'<div class="container copy">© 2026 RashtriyaSenaa. All Rights Reserved.</div></div>';

async function api(d){
const r=await fetch(API_URL,{
method:"POST",
headers:{"Content-Type":"text/plain;charset=utf-8"},
body:JSON.stringify(d)
});
return await r.json();
}


/* ================================
   HOMEPAGE LIVE COUNTERS
   बाकी website को touch नहीं करता
================================ */

async function loadHomeCounts(){

try{

const r=await api({
action:"siteStats"
});

if(!r || !r.success) return;


/* Registration */
const registerIds=[
"registerCount",
"homeRegisterCount"
];

registerIds.forEach(id=>{
const el=document.getElementById(id);
if(el) el.textContent=r.register ?? 0;
});


/* Review / Pending */
const reviewIds=[
"reviewCount",
"homeReviewCount"
];

reviewIds.forEach(id=>{
const el=document.getElementById(id);
if(el) el.textContent=r.review ?? 0;
});


/* Approval */
const approveIds=[
"approveCount",
"homeApproveCount"
];

approveIds.forEach(id=>{
const el=document.getElementById(id);
if(el) el.textContent=r.approve ?? 0;
});


/* Digital ID */
const digitalIds=[
"digitalIdCount",
"homeDigitalIdCount"
];

digitalIds.forEach(id=>{
const el=document.getElementById(id);
if(el) el.textContent=r.digitalId ?? 0;
});


}catch(error){

console.log("Counter error:",error);

}

}


/* Homepage खुलते ही count load */
if(document.readyState==="loading"){

document.addEventListener(
"DOMContentLoaded",
loadHomeCounts
);

}else{

loadHomeCounts();

}
