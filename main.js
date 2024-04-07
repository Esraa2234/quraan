// explore button
let exploreButton =  document.querySelector(".title .btn");
    hadithSection = document.querySelector('.hadith');
    exploreButton.addEventListener('click', ()=>{
        hadithSection.scrollIntoView({
            behavior : "smooth"
        })
})
let fixedNav = document.querySelector(".header"),
        scrollBtn = document.querySelector('.scrollBtn')
window.addEventListener("scroll",()=>{
    window.scrollY > 100 ? fixedNav.classList.add('active') : fixedNav.classList.remove('active');
    window.scrollY > 500 ? scrollBtn.classList.add('active') : scrollBtn.classList.remove('active');
    // if(window.scrollY > 500){
    //     scrollBtn.classList.add('active')
    // } else {
    //     scrollBtn.classList.remove('active')
    // }
})
scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top : 0,
        behavior : "smooth"
    })
});
// hadith changer
let hadithContainer = document.querySelector('.hadithContainer'),
        next = document.querySelector('.buttons  .next'),
        prev = document.querySelector('.buttons  .prev'),
        number = document.querySelector('.buttons  .number');
        let hadithIndex = 0;
    HadithChanger();
function HadithChanger(){
    fetch("https://api.hadith.gading.dev/books/muslim?range=1-300%22")
    .then(res => res.json())
    .then((data) => {
        //console.log(data);
        let hadiths =  data.data.hadiths;
       // console.log(hadiths);
    changeHadith()
        next.addEventListener('click', ()=>{
        hadithIndex == 299 ? hadithIndex = 0 : hadithIndex++;
        changeHadith();
    })
        prev.addEventListener('click', ()=>{
        hadithIndex == 0 ? hadithIndex = 299 : hadithIndex--;
        changeHadith();
        })
        function  changeHadith(){
        hadithContainer.innerHTML = hadiths[hadithIndex].arab;
        number.innerText = `300 - ${hadithIndex + 1}`;
        }
    })
}
// 
let sections = document.querySelectorAll('section'),
    links = document.querySelectorAll('.header ul li');
links.forEach(link => {
    link.addEventListener('click', ()=>{
        document.querySelector('.header ul li.active').classList.remove('active');
        link.classList.add('active');
        let target = link.dataset.filter;
        // console.log(target);
        sections.forEach(section =>{
            if(section.classList.contains(target)){
                section.scrollIntoView({
                    behavior :  'smooth'
                })
            }
        })
    })
})
// surah api
let  surahsContainer = document.querySelector('.surahsContainer');
getSurahs()
function  getSurahs(){
    fetch("https://api.alquran.cloud/v1/meta")
    .then((res) => res.json())
    .then((data)=>{
// console.log(data)
        let surahs = data.data.surahs.references;
//console.log(surahs);
        let numberSurahs = 114;                     
// data.data.surahs.count;
    surahsContainer.innerHTML = "";
    for(let i = 0; i<numberSurahs ;i++){
        // surahs[1]
        surahsContainer.innerHTML += `
        <div class="surah">
        <p> ${surahs[i].name}</p>
        <p> ${surahs[i].englishName} </p>
    </div>`
    }
    let surahsTitles = document.querySelectorAll(".surah");
    // console.log(surahsTitles);
    let popup = document.querySelector(".surah-popup"),
    ayatContainer =  document.querySelector(".ayat");
    surahsTitles.forEach((title,index)=>{
        title.addEventListener("click", ()=> {
            fetch(`https://api.alquran.cloud/v1/surah/${index + 1}`)
            .then(res => res.json())
            .then(data=>{
                // console.log(data);
                ayatContainer.innerHTML ="";
                let ayat = data.data.ayahs;
                ayat.forEach(aya=>{
                    popup.classList.add('active'),
                    ayatContainer.innerHTML +=`
                    <p> (${aya.numberInSurah}) - ${aya.text}</p>
                    ` 
                })
            })
        })
    })
    let  closePopup = document.querySelector('.close-popup');
    closePopup.addEventListener('click',()=>{
        popup.classList.remove('active');
    })
    })
}
// pray yime
let cards = document.querySelector('.cards');
getPrayTime();
http://api.aladhan.com/v1/timingsByCity?city=cairo&country=egypt&method=8
function getPrayTime(){
    fetch("https://api.aladhan.com/v1/timingsByCity?city=Cairo&country=Egypt&method=8")
    .then(response => response.json())
    .then(data =>{
        // console.log(data);
        let times=  data.data.timings;
        cards.innerHTML="";
        for(let i in times){
            // console.log(i)
            // console.log(times[i]);
            cards.innerHTML+= `
            <div class="card">
            <div class="circle">
                <svg>
                    <circle cx="100" cy="100" r="100"></circle>
                </svg>
            <div class="praytime">${times[i]}</div>
            </div>
                <p>${i}</p>
            </div>
            `
        }
    })
}
// active side bar
let bars = document.querySelector('.bars'),
    sideBar =document.querySelector('.header ul');
bars.addEventListener('click' , ()=>{
    sideBar.classList.toggle("active")
})