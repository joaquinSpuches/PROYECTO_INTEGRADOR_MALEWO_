import React, { useEffect, useState, useRef } from "react";
import './styles-products.css';

function Products() {

    let [data, setProducts] = useState([]);
    let prodData = useRef();

    useEffect(() => {
        fetch('http://localhost:3050/products/list')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
            .catch(err => console.log(err));
    }, []);

    const showProdData = () => {
        prodData.current.classList.toggle('new-ul');
    }

    return (
        <div className="products">
        <section>
            <h2 className="title">Productos</h2>
            <h4 className="totalTitle">Total: {data.count}</h4>
            <p className="titleDrop">Productos</p> <i class="fas fa-chevron-down arrow" onClick={showProdData}></i>
            <ul ref={prodData} className="productUl">
                {data.data?.length === 0 && <p>Cargando</p>}
                {
                    data.data?.map((product, i) => {
                        return (
                            <li key={i} className="productLi">
                                <h> • {product.name}</h>
                            </li>
                        )
                    })
                }
            </ul>
        </section>
        </div>
    );
}

export default Products