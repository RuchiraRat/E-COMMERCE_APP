import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();  // lowercase to match route param
  const { products } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size,setSize] = useState ('')

  useEffect(() => {
    if (products && products.length > 0) {
      const foundProduct = products.find(item => item._id === productId);
      setProductData(foundProduct || null);

      if (foundProduct?.image?.length > 0) {
        setImage(foundProduct.image[0]);
      } else {
        setImage('');
      }
    }
  }, [productId, products]);

  if (productData === null) {
    return (
      <div style={{ padding: '2rem' }}>
        Product not found or loading...
      </div>
    );
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100" style={{ padding: '2rem' }}>
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image && productData.image.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${productData.name} ${index + 1}`}
                className={`cursor-pointer border ${image === img ? 'border-blue-500' : 'border-transparent'}`}
                onClick={() => setImage(img)}
                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
              />
            ))}
          </div>
          <div className="flex-1">
            {image && (
              <img
                src={image}
                alt={productData.name}
                className="w-full max-h-[500px] object-contain"
              />
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_dull_icon} alt="" className="w-3 5" />
              <p className='pl-2'>(122)</p>
          </div>
          <p className="text-lg mt-4">{productData.description}</p>
          <p className="text-xl font-semibold mt-6">Rs. {productData.price}</p>
          {/* You can add buttons, add to cart etc here */}
          <div className='flex flex-col gap-4 my-8'>
              <p>Select Size</p>
              <div className='flex gap-2'>
                {productData.sizes.map((item,index)=>(
                  <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`} key={index}>{item}</button>
                ))}
              </div>
          </div>
          <button className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product</p>
            <p>Cash on Delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>


      {/* --------------Description and Review Section----------------- */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
         <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                It has survived not only five centuries.</p>

              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                It has survived not only five centuries.</p>
         </div>
      </div>

                {/* ------ display related products -------- */}

                <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) ; 
}

export default Product;
