import React, { useEffect, useState, useRef } from "react";
import './styles-categories.css';

function Categories() {

    let [data, setCategories] = useState([]);
    let extData = useRef();
    let intData = useRef();
    let accData = useRef();

    useEffect(() => {
        fetch('http://localhost:3050/products/list')
            .then(response => response.json())
            .then(data => {
                setCategories(data);
            })
            .catch(err => console.log(err));
    }, []);

    const showDataExt = () => {
        extData.current.classList.toggle('new-p');
    }
    const showDataInt = () => {
        intData.current.classList.toggle('new-p');
    }
    const showDataAcc = () => {
        accData.current.classList.toggle('new-p');
    }

    return (
        <div className="categories">
        <section>
            <h2 className="title">Categorías</h2>
            <h4 className="totalTitle">Total: {data.countCategories}</h4>
            <ul className="list">
                <li>EXTERIOR<i class="fas fa-chevron-down arrow" onClick={showDataExt}></i></li>
                <p ref={extData}>• cant. productos: {data.countByCategory?.EXTERIOR}</p>
                <li>INTERIOR <i class="fas fa-chevron-down arrow" onClick={showDataInt}></i></li>
                <p ref={intData}>• cant. productos: {data.countByCategory?.INTERIOR}</p>
                <li>ACCESORIOS <i class="fas fa-chevron-down arrow" onClick={showDataAcc}></i></li>
                <p ref={accData}>• cant. productos: {data.countByCategory?.ACCESORIOS}</p>
            </ul>
        </section>
        </div>
    );
}

export default Categories