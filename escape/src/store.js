import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarouselPage from './slideImage.js';
import './store.css';
// eslint-disable-next-line
import Cart from './cart.js'

import { useCart } from "react-use-cart";

const Store = (props) => {
    const [resourceType, setresourceType] = useState('allEquipments');
    const [equipements, setEquipments] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [select, setSelect] = useState("");
    const [itemId, setItemId] = useState(0);
    const { addItem } = useCart();



    console.log("id store", props.id)
    //to get the equipment from database
    useEffect(() => {
        axios.get(`http://localhost:3001/api/${resourceType}`).then((result) => {
            // console.log(result)
            setEquipments(result.data)
        }).catch((err) => { console.log(err); })

    }, [resourceType])

    //to select equipment by price
    useEffect(() => {
        axios.get(`http://localhost:3001/api/select/${select}`).then((result) => {
            // console.log(result)
            setEquipments(result.data)
        }).catch((err) => { console.log(err); })

    }, [select])

    //to update the inCart
    useEffect(() => {
        axios.patch(`http://localhost:3001/api/catItem/${itemId}`).then((result) => {
            console.log(result.data)
        })
        return () => {
            setItemId(0)
        }
    }, [itemId])


    return (
        <>
            <CarouselPage />
            <main>
                <section className="equipment section">
                    <div className="title">
                        <h2>Our Equipments</h2>
                        <input className="col-md-6 offset-md-2 filter-btn search" type="search" placeholder="Search..." aria-label="Search" value={searchTerm} onChange={e => { setSearchTerm(e.target.value) }} />
                        <div className="btn-container">
                            <button type="button" className="filter-btn space" onClick={() => setresourceType('allEquipments')}>All Equipments</button>
                            <button type="button" className="filter-btn space" onClick={() => setresourceType('toRent')}>Equipments to rent</button>
                            <button type="button" className="filter-btn space" onClick={() => setresourceType('toBuy')}>Equipments to buy</button>
                            <select className="filter-btn selector" onChange={
                                // eslint-disable-next-line
                                e => { const selectedPrice = e.target.value; setSelect(selectedPrice); console.log(selectedPrice); }}>
                                <option value="all">
                                    Filter By Price
                                </option>
                                <option value="toRent">
                                    Rent
                                </option>
                                <option value="toSell">Buy</option>
                            </select>
                        </div>
                        <div className="underline"></div>
                    </div>
                    <div className="section-center">
                        { // eslint-disable-next-line
                            equipements.filter((val) => {

                                if (searchTerm === "") {
                                    return val
                                } else if (val.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                                    return val
                                }
                            }).map((equipment, key) => {
                                return (
                                    <div key={equipment.id}>
                                        <article className="eq-item">
                                            <img src={equipment.image} alt="equipment" className="photo" />
                                            <div className="item-info" >
                                                <header>
                                                    <h4>{equipment.name} </h4>
                                                    <h4 className="price"> TDN {equipment.price}</h4>
                                                </header>
                                                <p className="item-tex">{equipment.description}</p>
                                                <h4>State : {equipment.etat}</h4>
                                                <button type="button" class="btn btn-danger m-4" onClick={() => {
                                                    setItemId(equipment.id); equipment.inCart = !equipment.inCart;
                                                    if (equipment.inCart) {
                                                        addItem(equipment)
                                                    }
                                                }}>Add to Cart</button>
                                            </div>
                                        </article>
                                    </div>
                                )
                            })
                        }
                    </div>
                </section>
            </main>
        </>
    );
};

export default Store;
