import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const Search = () => {
  const [resourceType, setresourceType] = useState('searchProducts');
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/${resourceType}`)
      .then((result) => {
        console.log(result);
        setProducts(result.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [resourceType]);
  return (
    <div>
      <input
        type="text"
        placeholder="search your equipments"
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
      <button type="button"  onClick={() => setresourceType('')}>Search</button>
      <div>
        {products.filter((value) => {
          if(searchTerm === "") {
            return value
        }
            else if(value.toLowerCase().includes(searchTerm.toLowerCase()))
              return value
          })
          .map((product, key) => {
            <div>
            <img src={product.image} alt='img'/>
            <p>{product.name}</p>
            <div>Add To Cart</div>
            </div>
})}
      </div>
    </div>
  );
};

export default Search;

// import React from "react";
// import axios from "axios";
// import { useState, useEffect } from "react";

// const Search = ({ title, items = [], multiSelect = false }) => {
//   const [open, setOpen] = useState(false);
//   const [selection, useSelection] = useState([]);
//   const toggle = () => setOpen(!open);
//   useEffect(() => {
//         axios
//           .get("/homeProducts")
//           .then((result) => {
//             console.log(result);
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       });

//   function handleClick(item) {}

//   return (
//     <div>
//       <div
//         tabIndex={0}
//         role="button"
//         onKeyPress={() => toggle(!open)}
//         onClick={() => toggle(!open)}
//       >
//         <div>
//           <p>{title}</p>
//         </div>
//         <div>
//           <p>{open ? 'Close' : 'Open'}</p>
//         </div>
//       </div>
//       {open && (
//         <ul>
//           {items.map(item => (
//             <li>
//               <button type='button' onClick={() => handleClick(item)}>
//                 <span>{item.value}</span>
//                 <span>Selected ...</span>
//               </button>
//             </li>
//           )
//           )}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Search;