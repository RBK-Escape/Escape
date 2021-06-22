import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // eslint-disable-next-line
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("/homeProducts")
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <div>
      <input
        type="text"
        placeholder="search your equipments"
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
      <div>
        {products
        // eslint-disable-next-line
          .filter((products)=> {
              if(products.toLowerCase().includes(searchTerm.toLowerCase()))
              return products
          })
          .map((product) => (
            <p>{product}</p>
          ))}
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