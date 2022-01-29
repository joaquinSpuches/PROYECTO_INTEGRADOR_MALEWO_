import React, { useEffect, useState, useRef } from "react";
import './styles-users.css';

function Users() {
    
    let [data, setUsers] = useState([]);
    let userData = useRef();

    useEffect(() => {
        fetch('http://localhost:3050/users/list')
            .then(response => response.json())
            .then(data => {
                setUsers(data);
            })
            .catch(err => console.log(err));
    }, []);

    let lastUser = data.data?.[data.data?.length -1]
    
    let showUserData = () => {
        userData.current.classList.toggle('new-ul');
    }

    return (
        <div className="users">
        <section>
            <h2 className="title">Usuarios</h2>
            <h4 className="totalTitle">Total: {data.count}</h4>
            <p className="titleDrop">Ultimo usuario</p> <i class="fas fa-chevron-down arrow" onClick={showUserData}></i>
            <ul ref={userData} className="productUl" >
                {data.data?.map((prod, i) => {
                    if (prod.id === lastUser.id) {
                        return (
                            <>
                            <li key={i} className="productLi">Nombre: {prod.name}</li>
                            <li key={i} className="productLi">Nombre: {prod.email}</li>
                            <li key={i} className="productLi">Nombre: {prod.phone}</li>
                            </>
                        )
                    }
                })
                }
            </ul>
        </section>
        </div>
    );
}

export default Users