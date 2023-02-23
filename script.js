let addToList = document.querySelector("#liveToastBtn");

let liDom = document.querySelector("#task");

let arrayList=[];

const list = document.querySelector("#list")

update();

// localStorage'daki liste elemanları sayfa yenilendiğinde kaybolmasın

function update(){
    addLocalList(); //LOCALDEKİ FONKSİYONUNA BAK,  ELEMAN ARRAY'İMDEN SİLİNMİŞ Mİ YOKSA HALA İÇİNDE Mİ
    arrayList.forEach(function(stay) {
        newliDom(stay); //İÇİNDE İSE ARRAY'DEKİ ELEMANI/ELEMANLARI TEKRAR LİSTEYE EKLEME FONKSİYONUNA GÖTÜR //

    })
}

//İMPUTTA GİRİLEN DEĞERİ ALMA VE TOAST EKLEME//

function newElement(e) {
    const value = liDom.value.trim() //liDom.value inputa girilen girdi(#task) trim() yaparak space tuşuna basınca kabul etmiyor//
    if(value==""){ //birşey yazılmadan direk eklemeye çalışmak demek//
        $('.error.toast').toast("show") //BOOTSTRAP TOASTTA BİLGİSİ VAR//
    }
    else {
        newliDom(value) //imputtaki valuemizi listeye eleman olarak ekleme fonksiyonu//
        liDom.value="" //button a bastıktan sonra imput girdisini temizler//
        $('.success.toast').toast("show")
        newTask(value) //local storage e elemanı ekleme fonksiyonu//
    }

    e.preventDefault();
}

//İMPUTTAKİ VALUEMİZİ LİSTEYE OLARAK EKLEMEK FONKSİYONU//


function newliDom(listElement){
    const newLi = `<li class="myList">${listElement}<i class="fa fa-times close"></i></li>`; //CLOSE CLASSINI HTML KISMINDA EKLEDİM VE ÜSTÜ ÇİZİLMESİN DİYE CSS DOSYASINDA CLOSe CLASINA text-decoration: none; ekledim//
    list.innerHTML += newLi;
}

//CLOSE CLASINI ÇALIŞTIRARAK ELEMAN SİLME VE CHECKED CLASSINI TOGGLE EDEREK KELİMELERİN ÜSTÜNÜ ÇİZME//

list.addEventListener('click', e=>{ //list(#list)
    if(e.target.classList.contains('close')){
        const parent = e.target.parentElement //ul da li ye parent dedim//
        parent.remove()
        const deleted = parent.firstChild.textContent //LOCALDEN SİLME FONKSİYONU// //parentin metin elemanıı olan çocuğu aslında liDom.value.trim() demiş oluyorum//
        deleteFromLocal(deleted)
    }
    if(e.target.classList.contains('myList')) { //myList CLASSI HTML DE Lİ YE EKLEDİĞİM BİR CLASS//
        e.target.classList.toggle('checked') //VARSA TERSİNE ÇEVİR YOKSA ÇALIŞTIR DEMEK//
    } //E.TARGET.CLASSLİST SEÇTİĞİM CLASSTA ANLAMINDA; BU CLASSIN ELEMANLARINA TIKLADIĞIMDA ÇALIŞSIN, BU ŞEKİLDE ANLADIM//
})

//LOCAL STORAGE  OLUŞTURDUĞUM ARRAY'E(arrayList) DEGER(liDom.value.trim()) EKLEME//

function newTask(myValue) {
    addLocalList();
    arrayList.push(myValue);
    localStorage.setItem("locallist", JSON.stringify(arrayList))
}

// LOCAL STORAGE, SİLİNEN VE EKLENEN ELEMANLARI KONTROL EDİP SAYFA YENİLENİNCE SİLİNMEYEN ELEMANLARI TEKRAR EKLE DER VE SAYFAYENİLENCEKALSIN YAPARIZ//


function addLocalList() {
    if (localStorage.getItem("locallist")=== null) { //SAYFA AÇILDIĞINDA LOCAL HİÇ KAYITLI ELEMAN YOK ANLAMINDA//
        arrayList = []; //SAYFAYA EKLENECEK ELEMAN YOK//
    } else {
        arrayList = JSON.parse(localStorage.getItem("locallist")) //LOCALDE ELEMAN VAR , ARRAY'İNE EKLE VE SAYFAYENİLENCEKALSIN YAP//
    }
}

// LOCAL STORAGEDEN DEGER İ SİLMEK//

function deleteFromLocal(deletes) {
    addLocalList();
    arrayList.forEach(function(getdel, index) { //DİZİDE İNDEXE GÖRE ELEMANLARA BAK//
        if (deletes === getdel) { //İNDEXTEKİ DEGER deletes'E  EŞİTSE//
            arrayList.splice(index, 1); //SİL//
        }
    });
    localStorage.setItem("locallist", JSON.stringify(arrayList));
}

//LOCAL STORAGE İ PEK ANLAMADIM AMA PRATİK YAPTIKCA GELİŞİR//
// bu ödevin çoğu github.com/Rabiaats/todolist hesabından yardım alınarak yapılmıştır. katkı sağlayanların emeğine sağlık// 