const filterSlide = () => {
    const filter = document.querySelector('.filtros img')
    const nav = document.querySelector('.lista-filtros')

    filter.addEventListener('click', () => {
        nav.classList.toggle('active')
    })
}


filterSlide();