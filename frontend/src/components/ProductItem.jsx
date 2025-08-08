import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price, noLink = false }) => {
  const { currency } = useContext(ShopContext);

  const Wrapper = noLink ? 'div' : Link;
  const wrapperProps = noLink ? {} : { to: `/product/${id}` };

  return (
    <Wrapper className="text-gray-700 cursor-pointer" {...wrapperProps}>
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out duration-300"
          src={image[0]}
          alt={name}
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency} {price}
      </p>
    </Wrapper>
  );
};

export default ProductItem;