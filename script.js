const questions=[
 {title:'Date de rencontre',type:'date'},
 {title:'Date mise ensemble',type:'date'},
 {title:'Notre musique',type:'music'},
 {title:'Notre meilleur souvenir',type:'text'},
 {title:'Notre pire souvenir',type:'text'},
 {title:'Notre plat',type:'text'},
 {title:'LE souvenir, premier qui vient en tête',type:'text'},
 {title:"L'objet qui te fait penser à moi",type:'text'},
 {title:"L'objet qui te fait penser à nous",type:'text'},
 {title:'Notre photo',type:'photo'},
 {title:'Le mot qui nous décrit',type:'text'},
 {title:'Un film qui nous ressemble ?',type:'text'}
];
// À personnaliser plus tard avec les titres des musiques et les trois photos.
const musics=['Musique 1 (à remplacer)','Musique 2 (à remplacer)','Musique 3 (à remplacer)'];
const photos=['Photo 1 (à ajouter)','Photo 2 (à ajouter)','Photo 3 (à ajouter)'];
const storageKey='notre-histoire-reponses-v1';
let answers={};try{answers=JSON.parse(localStorage.getItem(storageKey)||'{}')||{}}catch{answers={}}
let index=0;
const $=id=>document.getElementById(id);
function show(id){['welcome','quiz','result'].forEach(x=>$(x).classList.toggle('hidden',x!==id));window.scrollTo(0,0)}
function save(){try{localStorage.setItem(storageKey,JSON.stringify(answers))}catch{}}
function render(){const q=questions[index];$('counter').textContent=`Question ${index+1} sur ${questions.length}`;$('progress').style.width=`${(index+1)/questions.length*100}%`;$('question').textContent=q.title;const root=$('answer');root.replaceChildren();const val=answers[index]||'';
 if(q.type==='date'){const input=document.createElement('input');input.type='date';input.value=val;input.setAttribute('aria-label',q.title);input.oninput=()=>{answers[index]=input.value;save()};root.append(input)}
 else if(q.type==='text'){const input=document.createElement('textarea');input.placeholder='Écris ce qui te vient en tête…';input.value=val;input.setAttribute('aria-label',q.title);input.oninput=()=>{answers[index]=input.value;save()};root.append(input)}
 else{const options=q.type==='music'?musics:photos;const wrapper=document.createElement('div');if(q.type==='photo')wrapper.className='photo-grid';options.forEach((option,i)=>{const label=document.createElement('label');label.className='option'+(q.type==='photo'?' photo-option':'');const radio=document.createElement('input');radio.type='radio';radio.name='choice';radio.value=option;radio.checked=val===option;radio.onchange=()=>{answers[index]=option;save()};const text=document.createElement('span');text.textContent=option;label.append(radio,text);wrapper.append(label)});root.append(wrapper);const note=document.createElement('p');note.className='note';note.textContent=q.type==='music'?'Les titres et les extraits seront ajoutés plus tard.':'Les trois vraies photos seront ajoutées plus tard.';root.append(note)}
 $('prev').disabled=index===0;$('next').textContent=index===questions.length-1?'Voir mes réponses ♡':'Suivant →';show('quiz')}
function dateText(value){if(!value)return 'Non renseigné';const [y,m,d]=value.split('-');return `${d}/${m}/${y}`}
function summary(){const root=$('summary');root.replaceChildren();questions.forEach((q,i)=>{const entry=document.createElement('div');entry.className='entry';const title=document.createElement('h3');title.textContent=`${i+1}. ${q.title}`;const content=document.createElement('p');const value=answers[i];content.textContent=q.type==='date'?dateText(value):value||'Non renseigné';entry.append(title,content);root.append(entry)});show('result')}
$('start').onclick=()=>{index=0;render()};$('prev').onclick=()=>{if(index>0){index--;render()}};$('next').onclick=()=>{if(index<questions.length-1){index++;render()}else summary()};$('edit').onclick=()=>{index=questions.length-1;render()};$('download').onclick=()=>window.print();
