import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/verification.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import haveToken from '../utils';

const Verification = () => {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.clear()
        navigate('/login')
    }

    useEffect(() => {
        haveToken(navigate)
    }, [navigate])

  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    upload_identity: '',
    kota: '',
    kecamatan: '',
    jalan: '',
    package_id: '',
    status_id: '1',
    user_id: JSON.parse(localStorage.getItem('session')).id,
  });

  useEffect(() => {
    const selectedPackage = localStorage.getItem('selectedPackage');
    setFormData((prevFormData) => ({
      ...prevFormData,
      package_id: selectedPackage || ''
    }));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/order/create', formData);
      console.log('Order berhasil dibuat:', response.data);
      navigate('/home', { state: { message: 'Pesanan berhasil, menunggu verifikasi' } });
    } catch (error) {
      console.error('Gagal membuat order:', error);
    }
  };

  return (
    
    <div className="container">

      <div className="form-container">
        <h2>Data Diri Pelanggan</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nama">Nama Lengkap:</label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="upload_identity">upload_identity:</label>
            <input
              type=""
              id="upload_identity"
              name="upload_identity"
              value={formData.upload_identity}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </form>
      </div>
      <div className="form-container">
        <h2>Alamat Pemasangan</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="kota">Kota:</label>
            <input
              type="text"
              id="kota"
              name="kota"
              value={formData.kota}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="kecamatan">Kecamatan:</label>
            <input
              type="text"
              id="kecamatan"
              name="kecamatan"
              value={formData.kecamatan}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="jalan">Jalan:</label>
            <input
              type="text"
              id="jalan"
              name="jalan"
              value={formData.jalan}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            KIRIM PESANAN
          </button>
          <button className='button-status' onClick={()=>logout()}>Log Out</button>
        </form>
      </div>
    </div>
  );
};

export default Verification;
