import React from 'react';
import { createRoot } from 'react-dom/client';

const Product = ({name, votes, onVote, index}) => {

    const plus = () => {
        onVote("up", index);
    };
    const minus = () => {
       onVote("down", index);
    };
    return (
        <li>
            <span>{name}</span> - <span>votes: {votes}</span>
            <button onClick={plus}>+</button>{" "}
            <button onClick={minus}>-</button>
        </li>
    );
};

const GroceryApp = (props) => {
    let [products, setProducts] = React.useState(props.products);
    const onVote = (dir, index) => {
       const updatedProducts = [...products];

       if(dir === "up"){
        updatedProducts[index].votes += 1;
       }
       else{
        updatedProducts[index].votes -= 1;
       }

       setProducts(updatedProducts);
    };

    return (
        <ul>
            {/* Render an array of products, which should call onVote when + or - is clicked */}
            {products.map((product, idx) =>
                <Product 
                key={idx}
                name={product?.name}
                votes={product?.votes}
                index={idx}
                onVote={onVote}
                 />
            )}
        </ul>
    );
}

document.body.innerHTML = "<div id='root'></div>";
const root = createRoot(document.getElementById("root"));
root.render(<GroceryApp
    products={[
        { name: "Oranges", votes: 0 },
        { name: "Bananas", votes: 0 }
    ]}
/>);

setTimeout(() => {
    let plusButton = document.querySelector("ul > li > button");
    if (plusButton) {
        plusButton.click();
    }
    setTimeout(() => {
        console.log(document.getElementById('root').outerHTML);
    });
});