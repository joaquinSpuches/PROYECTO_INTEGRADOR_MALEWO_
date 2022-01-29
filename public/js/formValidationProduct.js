window.addEventListener('load', () => {
    let form = document.querySelector("#form");

    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    let errors = [];

    let name = form.elements.namedItem('Nombre');
    let finalName = document.querySelector('#name');
    let desc = form.elements.namedItem('Descripcion');
    let finalDesc = document.querySelector('#description');
    let finalFile = document.querySelector('#img');
    
    name.addEventListener('input', validate)
    desc.addEventListener('input', validate)
    
    function validate(e) {
        let target = e.target
        if (target.name == 'Nombre') {
            if (target.value.length > 4) {
                target.classList.remove('notOk');
                target.classList.remove('error-border');
                target.classList.add('ok');
             }else {
                target.classList.remove('ok');
                target.classList.add('notOk');
                target.classList.add('error-border')
             }
        }
        if(target.name == 'Descripcion') {
            if (target.value.length >= 20) {
                target.classList.remove('notOk');
                target.classList.remove('error-border');
                target.classList.add('ok');
             }else {
                target.classList.remove('ok');
                target.classList.add('notOk');
                target.classList.add('error-border');
             }
        }
    }
    function  lastValidation () {
        if(finalName.value.length > 4) {
         }else {
            errors.push('El nombre del producto debe tener al menos 5 caracteres');
         }
         if(finalDesc.value.length >= 20) {
         }else {
            errors.push('La descripción debera tener al menos 20 caracteres');
         }
         if(!allowedExtensions.exec(finalFile.value)) {
            errors.push('Formato de archivo erroneo')
        }
    }
    
    function unorderedList(list) {
        var result = '';
        list.forEach(listItem => {
            result += '•' + ' ' + listItem + '\n';
        })
        return result;
    }
    form.addEventListener('submit', (e) => {
        lastValidation()
        console.log(errors);
        if(errors.length > 0) {
            e.preventDefault();
            alert(unorderedList(errors));
            errors = [];
            console.log(errors);
        }
    });
});
