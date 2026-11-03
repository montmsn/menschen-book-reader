// Interface language switch (Deutsch / English) shared by reader.html and index.html.
// German is the source language in the markup; when English is chosen, UI text nodes,
// titles and placeholders are swapped (and restored when switching back).
// Book content, dialogues, translations and user notes are never touched.
(function(){
const KEY="menschenUiLang";
// Whole-string replacements (trimmed text)
const D={
 // reader toolbar & tabs
 "Notiz":"Note","Alles löschen und neu anfangen":"Delete everything and start over","Seite als erledigt markieren":"Mark page as done","Noch keine Prüfungen.":"No checks yet.","Lernpfad":"Path","Hören":"Listen","Wörter":"Words","Notizen":"Notes","Tutor":"Tutor","🤖 Tutor":"🤖 Tutor","Prüfen":"Check","✅ Diese Seite prüfen":"✅ Check this page","Chat leeren":"Clear chat","Senden":"Send",
 "Antworten auf dieser Seite prüfen (KI)":"Check answers on this page (AI)","Frag den Tutor… (z. B. Warum ist das falsch?)":"Ask the tutor… (e.g. Why is this wrong?)",
 "Schreib deine Antworten mit ⌨️ auf die Seite, dann prüfen lassen. Danach kannst du Fragen zu deinen Fehlern stellen.":"Type your answers on the page with ⌨️, then have them checked. Afterwards you can ask about your mistakes.",
 "Prüfe deine Antworten…":"Checking your answers…","Öffne eine Kursbuch- oder Arbeitsbuch-Seite mit Antworten.":"Open a Kursbuch or Arbeitsbuch page with answers.",
 "Auf dieser Seite gibt es noch keine Antworten. Schreib sie mit ⌨️ Schreiben / ☑️ Ankreuzen auf die Seite.":"There are no answers on this page yet. Add them with ⌨️ Type / ☑️ Tick.",
 "Diese Seite gehört zu keiner Lektion (keine Lösungen vorhanden).":"This page doesn't belong to a lesson (no answer key).",
 "KI nicht verfügbar – bitte die App mit start.command (server.py) starten.":"AI unavailable – start the app with start.command (server.py).",
 "KI ist aus: GEMINI_API_KEY fehlt in .env.":"AI is off: GEMINI_API_KEY is missing in .env.","Schreiben":"Type","Ankreuzen":"Tick","Verschieben":"Move","Schrift kleiner":"Smaller text","Schrift größer":"Larger text",
 "Antwort auf die Seite schreiben (klicken)":"Type an answer on the page (click)","Ankreuzen (klicken: ✓ → ✗ → weg)":"Tick (click: ✓ → ✗ → remove)","Markieren":"Highlight","Stift":"Pen","Export":"Export","Import":"Import","Trainer":"Trainer",
 "🧭 Lernpfad":"🧭 Path","🎧 Hören":"🎧 Listen","⭐ Wörter":"⭐ Words","📝 Notizen":"📝 Notes",
 "Audio 🎧":"Audio 🎧","Übersetzer":"Translator","Übersetzen":"Translate","🌐 Übersetzen":"🌐 Translate",
 "⭐ Merken":"⭐ Save","⭐ Gemerkt!":"⭐ Saved!","➕ Notiz":"➕ Note",
 "✏️ Falsch erkannt? Text oben korrigieren und Enter drücken – die Korrektur wird gemerkt.":"✏️ Misread? Fix the text above and press Enter – the correction is remembered.",
 "Notiz zu dieser Seite":"Note for this page","Alle Notizen":"All notes","Meine Wörter":"My words",
 "🃏 Wiederholen":"🃏 Review","Noch keine Notizen.":"No notes yet.",
 "Markiere ein Wort im Buch, übersetze es und klicke ⭐ Merken.":"Select a word in the book, translate it and click ⭐ Save.",
 "🎉 Fertig!":"🎉 Done!","✗ Noch nicht":"✗ Not yet","✓ Kann ich":"✓ I know it",
 "✓ Fertig":"✓ Done","🔄 Neu übersetzen":"🔄 Translate again","Abbrechen":"Cancel","Speichern":"Save",
 "Deutsch":"German","Übersetzung":"Translation","Öffnen":"Open","Übungstrainer":"Practice trainer",
 "🎉 Alle Lektionen fertig!":"🎉 All lessons finished!","Audio nicht gefunden.":"Audio not found.",
 "Übersetzung nicht erreichbar – Internet prüfen oder Google-Link nutzen.":"Translation unavailable – check your internet or use the Google link.",
 "📖 Kursbuch lesen & Audio hören":"📖 Read the Kursbuch & listen to the audio",
 "✅ Kursbuch-Lösungen vergleichen":"✅ Compare with the Kursbuch answers",
 "✍️ Arbeitsbuch-Übungen machen":"✍️ Do the Arbeitsbuch exercises",
 "✅ Arbeitsbuch-Lösungen prüfen":"✅ Check the Arbeitsbuch answers",
 "🎯 Im Übungstrainer festigen":"🎯 Practise in the trainer",
 // trainer
 "🇩🇪 Deutsch A1 Trainer":"🇩🇪 German A1 Trainer","Begleiter zu Menschen A1.1 · Lektion 1–12":"Companion to Menschen A1.1 · Lessons 1–12",
 "📖 Reader":"📖 Reader","← Übersicht":"← Overview","📇 Wortschatz":"📇 Vocabulary","✅ Quiz":"✅ Quiz",
 "💬 Dialog":"💬 Dialogue","📘 Grammatik":"📘 Grammar","✍️ Lückentext":"✍️ Fill in the blanks",
 "🔊 Anhören":"🔊 Listen","Sehr gut! 🎉":"Very good! 🎉","Weiter üben! 💪":"Keep practising! 💪","Nochmal":"Again",
 "▶ Ganzen Dialog abspielen":"▶ Play the whole dialogue",
 "Tipp: Lies den Dialog laut mit, dann tausche die Rollen.":"Tip: read the dialogue aloud along with it, then swap roles.",
 "Prüfen":"Check","✓ Richtig!":"✓ Correct!",
 // titles & placeholders
 "Andere PDF öffnen":"Open another PDF","Vorherige Seite":"Previous page","Nächste Seite":"Next page","Verkleinern":"Zoom out","Vergrößern":"Zoom in",
 "Ansehen / Text auswählen":"View / select text","Notiz anheften":"Pin a note","Markieren (ziehen)":"Highlight (drag)","Zeichnen":"Draw",
 "Element löschen (anklicken)":"Erase (click an item)","Farbe":"Colour","Rückgängig":"Undo","Notizen exportieren":"Export notes",
 "Notizen importieren":"Import notes","Hell / Dunkel":"Light / dark","Seitenleiste":"Sidebar","Wiederholen":"Repeat","5 s zurück":"Back 5 s",
 "Deutsch anhören":"Listen in German","Übersetzung anhören":"Listen to translation","Langsam":"Slow","Wort für später merken":"Save word for later",
 "Als Seitennotiz speichern":"Save as page note","Anhören":"Listen","Bearbeiten":"Edit","Löschen":"Delete",
 "Notiz…":"Note…","Suchen…":"Search…","Wort/Satz eingeben oder im Buch markieren…":"Type a word/sentence or select it in the book…",
 "Wörter, Fragen, Hausaufgaben…":"Words, questions, homework…","Antwort…":"Answer…","Sprache / Language":"Sprache / Language"
};
const tr=s=>D[s]??s;
// Patterned strings (whole text, anchored)
const R=[
 [/^Fortschritt: (\d+)%$/,(m,a)=>`Progress: ${a}%`],
 [/^\((\d+)\/(\d+) Schritte\)$/,(m,a,b)=>`(${a}/${b} steps)`],
 [/^▶ Weiter: Lektion (\d+) – (.*)$/,(m,a,b)=>`▶ Next: Lesson ${a} – ${modul(tr(b))}`],
 [/^(.*), S\. ([\d–]+)(?: · (\d+)\/(\d+) Seiten gesehen)?$/,(m,b,p,x,y)=>`${b}, p. ${p}${x?` · ${x}/${y} pages seen`:""}`],
 [/^📍 (.*), S\. (\d+)(.*)$/,(m,b,p,r)=>`📍 ${b}, p. ${p}${r}`],
 [/^\(S\. ([\d–]+)\)$/,(m,a)=>`(p. ${a})`],
 [/^✅ Seite (\d+) prüfen \(Lektion (\d+)\)$/,(m,a,b)=>`✅ Check page ${a} (Lesson ${b})`],
 [/^(\d+)\/(\d+) richtig$/,(m,a,b)=>`${a}/${b} correct`],
 [/^Fehler: (.*)$/,(m,a)=>`Error: ${a}`],
 [/^📜 Verlauf \($/,()=>"📜 History ("],
 [/^(.*), S\. (\d+)$/,(m,a,b)=>`${a}, p. ${b}`],
 [/^(.*), S\. ([\d–]+) · (\d+)\/(\d+) Seiten erledigt$/,(m,b,p,x,y)=>`${b}, p. ${p} · ${x}/${y} pages done`],
 [/^Seite (\d+)$/,(m,a)=>`Page ${a}`],
 [/^· (\d+) Markierung\(en\)$/,(m,a)=>`· ${a} mark(s)`],
 [/^(\d+) Wörter$/,(m,a)=>`${a} words`],
 [/^(\d+)\/(\d+) · klicken zum Umdrehen$/,(m,a,b)=>`${a}/${b} · click to flip`],
 [/^Klicken zum Umdrehen · (\d+)\/(\d+)$/,(m,a,b)=>`Click to flip · ${a}/${b}`],
 [/^Frage (\d+)\/(\d+)$/,(m,a,b)=>`Question ${a}/${b}`],
 [/^Ergebnis: (.*)$/,(m,a)=>`Result: ${a}`],
 [/^✗ Richtig ist: (.*)$/,(m,a)=>`✗ Correct answer: ${a}`],
 [/^Lektion (\d+)$/,(m,a)=>`Lesson ${a}`],
 [/^Lektion (\d+): (.*)$/,(m,a,b)=>`Lesson ${a}: ${b}`],
 [/^Modul (\d+)$/,(m,a)=>`Module ${a}`],
 [/^(.*) · Grammatik: (.*)$/,(m,a,b)=>`${a} · Grammar: ${b}`],
 [/^(\S+ )?Modul (\d+): Kursbuch-Extras \(Lesemagazin, Film, Landeskunde\)$/,(m,i,a)=>`${i||""}Module ${a}: Kursbuch extras (reading, film, culture)`],
 [/^(\S+ )?Modul (\d+): Wiederholung & Selbsteinschätzung$/,(m,i,a)=>`${i||""}Module ${a}: Review & self-assessment`]
];
function modul(s){for(const [re,f] of R.slice(-2))if(re.test(s))return s.replace(re,f);return s}
function toEn(s){const t=s.trim();if(!t)return s;let o=D[t];
  if(o===undefined)for(const [re,f] of R)if(re.test(t)){o=t.replace(re,f);break}
  return o===undefined?s:s.replace(t,o)}

// Containers whose text is book/learning content or user data
const SKIP="#tl,#page,.dlg,.gram,#trOut,.flash,.opts,#wlist .lab b,#wlist .lab span,#wcard .card,.item div,.msg.a .res span,.msg.a div,.lsn>summary,.lesson .t,.lesson .s,textarea,script,style";
const SKIP_ATTR="#tl,#page,.dlg";
let lang="de";try{lang=localStorage.getItem(KEY)||"de"}catch(e){}
const orig=new WeakMap(),attrOrig=new WeakMap();let busy=false;
function doText(n){
  if(n.parentElement&&n.parentElement.closest(SKIP))return;
  if(!orig.has(n)||(n.nodeValue!==orig.get(n).en)){orig.set(n,{de:n.nodeValue,en:null})}
  const o=orig.get(n);
  if(lang==="en"){const e=toEn(o.de);if(e!==o.de){o.en=e;if(n.nodeValue!==e)n.nodeValue=e}}
  else if(n.nodeValue!==o.de)n.nodeValue=o.de;
}
function doAttrs(el){if(el.closest(SKIP_ATTR))return;
  for(const a of["title","placeholder"]){const v=el.getAttribute(a);if(v==null)continue;
    let m=attrOrig.get(el)||{};if(!(a in m)||(v!==m[a]&&v!==tr(m[a]))){m[a]=v;attrOrig.set(el,m)}
    const want=lang==="en"?tr(m[a]):m[a];if(v!==want)el.setAttribute(a,want)}}
function walk(root){busy=true;
  if(root.nodeType===3){doText(root)}else if(root.nodeType===1){
    if(root.matches?.("[title],[placeholder]"))doAttrs(root);
    root.querySelectorAll?.("[title],[placeholder]").forEach(doAttrs);
    const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode())doText(n)}
  busy=false}
new MutationObserver(ms=>{if(busy)return;for(const m of ms){
  if(m.type==="characterData")walk(m.target);else m.addedNodes.forEach(walk)}})
  .observe(document.documentElement,{subtree:true,childList:true,characterData:true});

function setLang(l){lang=l;try{localStorage.setItem(KEY,l)}catch(e){}
  document.querySelectorAll("[data-uilang]").forEach(b=>b.textContent=l==="en"?"🌐 EN":"🌐 DE");walk(document.body)}
window.uiLang={get:()=>lang,set:setLang};
function init(){document.querySelectorAll("[data-uilang]").forEach(b=>{b.title="Sprache / Language";b.onclick=()=>setLang(lang==="en"?"de":"en")});setLang(lang)}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
