import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import CarouselPage from './slideImage.js';

const Store = () => {
 const [resourceType, setresourceType] = useState('allEquipments');
 const [equipements, setEquipments] = useState([]);
 const [searchTerm, setSearchTerm] = useState("");
 const searchHandler = () => {

 }
 const getSearchDom = () => {
 }
    useEffect (() => {
    axios.get(`http://localhost:3001/api/${resourceType}`).then((result) => {
        console.log(result)
        setEquipments(result.data)
 }).catch((err) => {console.log(err);})

}, [resourceType]) 

 return (
    <>
    {/* <div class="container px-0"> */}
    <CarouselPage />
    {/* </div> */}
    <div className='m-4'></div>
    <div className="container px-0 ">
    <div className="row gx-1">
    <div className="col-4 ">
     <div className="p-3 ">
     <div className="col-6 col-sm-7 p-3 d-flex">
    <input className="form-control" type="search" placeholder="Search..." aria-label="Search" value={searchTerm} onChange={e=> {setSearchTerm(e.target.value)}} />
    {/* <button className="btn btn-outline-success" >Search</button> */}
     </div>
     <div className="col-6 col-sm-7 p-3">
     <button type="button" className="btn btn-warning" onClick={() => setresourceType('allEquipments')}>All Equipments</button>
     </div>
     <div className="col-6 col-sm-7 p-3">
     <button type="button" className="btn btn-warning" onClick={() => setresourceType('toRent')}>Equipments to rent</button>
     </div>
     <div className="col-6 col-sm-7 p-3">
     <button type="button" className="btn btn-warning" onClick={() => setresourceType('toBuy')}>Equipments to buy</button>
     </div>
     </div>
    </div>
    <div className="col">
    <div className="p-3 ">
    <div className="container mb-5 mt-5">
    <div className="row">
      { equipements.filter((val) => {
          if(searchTerm === "") {
              return val
          } else if (val.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
              return val
          }
      }).map((equipment, key) => {
                return (
                    <div className="col-md-6">
                    <div className="card mt-3">
                    <div className="align-items-center p-2 text-center"> 
                    <img src={equipment.image} className="rounded  img-thumbnail" alt='equipment'/>
                    <h5>{equipment.name}</h5>
                        <div className='mt-3 info'>
                            <span className="text1 d-block">text</span>
                            <span className="text1">text</span>
                        </div>  
                        <div className="cost mt-3 text-dark">
                            <span>Dt</span>
                            <div>
                            <button type="button" class="btn btn-danger m-4">Add to Cart</button>
                            </div>
                        </div>             
                    </div>
                    </div>
                    </div>
                )

            })
        }
    </div>
    </div>

      </div>
     </div>
  </div>
</div>
    </>
 )

}

export default Store;

 