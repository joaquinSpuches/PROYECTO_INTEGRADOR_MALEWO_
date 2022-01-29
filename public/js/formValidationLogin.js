window.addEventListener('load', () => {
    let form = document.querySelector(".form");

    const passReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let errors = [];

    let email = form.elements.namedItem('email');
    let finalEmail = document.querySelector('#email')
    let password = form.elements.namedItem('password');
    let finalPass = document.querySelector('#password')

   
    email.addEventListener('input', validate)
    password.addEventListener('input', validate)

    function validate(e) {
        let target = e.target
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
    }
    function  lastValidation () {
        
         if(passReg.test(finalPass.value)) {
         }else {
            errors.push('La contraseña debe contar con un minimo de 8 caracteres y debe tener al menos una mayúscula y un número');
         }
        if(emailReg.test(finalEmail.value)) {
        }else {
            errors.push('Se debe ingresar un email valido');
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
        if(errors.length > 0) {
            e.preventDefault();
            alert(unorderedList(errors));
            errors = [];
        }
    });
});



