import React, { useEffect, useState } from 'react';
import '../css/home.css'
import { useNavigate } from 'react-router-dom';
import haveToken from '../utils';
import { useLocation } from 'react-router-dom';
import Modal from './Modal';


function Home() {
    const location = useLocation();
    const message = location.state && location.state.message;
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);
    const logout = () => {
        localStorage.clear()
        navigate('/login')
    }

    const handlePackageSelection = (packageName) => {
        localStorage.setItem('selectedPackage', packageName);
        navigate('/verification');
      };

    useEffect(() => {
        haveToken(navigate)
        if (message) {
            setShowModal(true);
        }
    }, [navigate, message])
  return (
    <div className="container-1">

    <div className='navigation'>
        <div className="logo">
          <span>@</span>
          i-Net
        </div>
        <nav>
          <button className='button-status'>Pesanan Saya</button>
          <button className='button-status' onClick={()=>logout()}>Log Out</button>
        </nav>
    </div>


      <h1 className="title">Choose your package</h1>
      <p className="subtitle">
        Choose a plan that's right for your growing team. Simple pricing. No hidden
        charges.
      </p>
      <div className="save-banner">Save up to 20%!</div>

      <div className="packages">
        <div className="package">
          <h2>BASIC</h2>
          <div className="price">$9</div>
          <ul className="features">
            <li>Unlimited Quota</li>
            <li>Up To 10 Mbps</li>
            <li>1-5 Aktif User</li>
          </ul>
          <button className="button" onClick={() => handlePackageSelection('1')}>Pilih Paket</button>
        </div>
        <div className="package">
          <h2>MEDIUM</h2>
          <div className="price">$29</div>
          <ul className="features">
          <li>Unlimited Quota</li>
            <li>Up To 30 Mbps</li>
            <li>1-30 Aktif User</li>
          </ul>
          <button className="button" onClick={() => handlePackageSelection('2')}>Pilih Paket</button>
        </div>
        <div className="package">
          <h2>ADVANCE</h2>
          <div className="price">$99</div>
          <ul className="features">
          <li>Unlimited Quota</li>
            <li>Up To 50 Mbps</li>
            <li>1-50 Aktif User</li>
          </ul>
          <button className="button" onClick={() => handlePackageSelection('3')}>Pilih Paket</button>
        </div>
      </div>
      <Modal show={showModal} setShow={setShowModal}>
                {message && <p>{message}</p>}
            </Modal>
    </div>
  );
}

export default Home;