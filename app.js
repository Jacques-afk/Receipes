const menu = document.querySelector('#mobilemenu');
const menulink = document.querySelector('.nav-links');

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menulink.classList.toggle('active');
})