import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Product = () => {
  const { ProductId } = useParams(); // should match the route param key
  const { products } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    if (products && products.length > 0) {
      const foundProduct = products.find((item) => item._id === ProductId);
      setProductData(foundProduct || null);
      console.log(foundProduct);
    }
  }, [ProductId, products]);

  if (productData === null) {
    return <div style={{ padding: '2rem' }}>Product not found or loading...</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{productData.name}</h1>
      <p>{productData.description}</p>
      {/* Add more product fields as needed */}
    </div>
  );
};

export default Product;
