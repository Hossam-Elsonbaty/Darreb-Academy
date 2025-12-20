import React from 'react';
import { Link } from 'react-router-dom';
import img from '../../assets/images/love_15118349.webp';

const SuccessPayment = () => {
  
  return (
    <main className='error'>
      <div className='container'>
        <img src={img} alt="success image" />
        <p>
          Course has been Successfully Purchased
        </p>
        <Link to='/' className='return-home'>GO BACK HOME</Link>
      </div>
    </main>
  )
}

export default SuccessPayment;