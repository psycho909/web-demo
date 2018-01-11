var openBtn=document.getElementById('open-btn');
var dialog=document.getElementById('dialog');
var dialogSubmit=document.getElementById('dialog-submit');
var dialogClose=document.getElementById('dialog-close');
openBtn.addEventListener('click',function(){
    dialog.showModal();
})
dialogClose.addEventListener('click',function(){
    dialog.close();
})
function alertMe(){
    alert('Hello World')
}