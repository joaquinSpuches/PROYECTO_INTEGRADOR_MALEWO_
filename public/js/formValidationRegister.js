window.addEventListener('load', () => {
    let form = document.querySelector(".form");

    const passReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    let errors = [];

    let name = form.elements.namedItem('name');
    let finalName = document.querySelector('#name');
    let email = form.elements.namedItem('email');
    let finalEmail = document.querySelector('#email');
    let tel = form.elements.namedItem('phone');
    let finalTel = document.querySelector('#tel');
    let password = form.elements.namedItem('password');
    let finalPass = document.querySelector('#password');
    let finalFile = document.querySelector('#Image');

    name.addEventListener('input', validate)
    email.addEventListener('input', validate)
    tel.addEventListener('input', validate)
    password.addEventListener('input', validate)

    console.log(errors);
    function validate(e) {
        let target = e.target
        if (target.name == 'name') {
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
        if(target.name == 'password') {
            if (passReg.test(target.value)) {
                target.classList.remove('notOk');
                target.classList.remove('error-border');
                target.classList.add('ok');
            }else {
                target.classList.remove('ok');
                target.classList.add('notOk');
                target.classList.add('error-border');
            }
        }
        if(target.name == 'email') {
            if (emailReg.test(target.value)) {
                target.classList.remove('notOk');
                target.classList.remove('error-border');
                target.classList.add('ok');
            }else {
                target.classList.remove('ok');
                target.classList.add('notOk');
                target.classList.add('error-border');
            }
        }
        if(target.name == 'phone') {
            if (target.value.length >= 13 && target.value.length <= 15) {
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
            errors.push('El nombre de usuario debe tener mas de 4 caracteres');
         }
         if(passReg.test(finalPass.value)) {
         }else {
            errors.push('La contraseña debe contar con un minimo de 8 caracteres y debe tener al menos una mayúscula y un número');
         }
        if(emailReg.test(finalEmail.value)) {
        }else {
            errors.push('Se debe ingresar un email valido');
        }
         if(finalTel.value.length >= 13 && finalTel.value.length <= 15) {
         }else {
            errors.push('Se debe ingresar un numero de telefono valido (Ej: 541188731490)');
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



