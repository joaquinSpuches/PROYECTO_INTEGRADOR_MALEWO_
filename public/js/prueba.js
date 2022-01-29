
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const ul = document.querySelector('.nav-ul');
    const ulLinks = document.querySelectorAll('.nav-ul li')



    burger.addEventListener('click', () => {
        ul.classList.toggle('activo'); 
    });
    ulLinks.forEach(ulLinks =>{
        ulLinks.classList.toggle('fade');
    });




}

navSlide();




    