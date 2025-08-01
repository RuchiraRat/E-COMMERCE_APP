import React from 'react';

const Title = ({ text1, text2 }) => {
  return (
    <div className='inline-flex items-center gap-2 mb-4'>
        <p className='text-gray-600'>{text1} <span className='text-gray-700 font-medium'>{text2}</span></p>
        <p className='w-8 h-[1px] sm:w-12 bg-gray-700'></p>
    </div>
  );
};

export default Title;
