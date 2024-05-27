import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/verification.css';

const Verificationadmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reject_reason, setReject_reason] = useState('');
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    upload_identity: '',
    kota: '',
    kecamatan: '',
    jalan: '',
    package_id: '',
    status_id: '',
    user_id: '',
    id: id ? parseInt(id) : '',
  });

  useEffect(() => {
    // Buat fungsi async untuk mengambil data pengguna berdasarkan ID
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/order/getorder/${id}`);
        setFormData(response.data.data);
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

    // Panggil fungsi fetchUserData saat komponen dimuat
    fetchUserData();
  }, [id]); // Pastikan useEffect dipanggil kembali saat ID berubah

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFormData = { ...formData, reject_reason, id: id };
  
      await axios.put(`http://localhost:3000/order/update`, updatedFormData);
      navigate('/teknisi', { state: { addressData: { kota: formData.kota, kecamatan: formData.kecamatan, jalan: formData.jalan }, id: id } });
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const handleReject = async () => {
    try {
      await axios.put(`http://localhost:3000/order/reject/${id}`, formData);
      navigate('/home', { state: { message: 'Order ditolak.' } });
    } catch (error) {
      console.error('Error rejecting order:', error);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Verifikasi Data Pelanggan</h2>
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
              readOnly
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
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="upload_identity">Upload Identity:</label>
            <input
              type="text"
              id="upload_identity"
              name="upload_identity"
              value={formData.upload_identity}
              onChange={handleChange}
              className="form-control"
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="kota">Kota:</label>
            <input
              type="text"
              id="kota"
              name="kota"
              value={formData.kota}
              onChange={handleChange}
              className="form-control"
              readOnly
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
              readOnly
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
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="reject_reason">Alasan Ditolak:</label>
            <input
              type="text"
              id="reject_reason"
              name="reasonForReject"
              onChange={(e) => setReject_reason(e.target.value)}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Verifikasi
          </button>
          <button type="button" className="btn btn-danger" onClick={handleReject}>
            Tolak
          </button>
        </form>
      </div>
    </div>
  );
};

export default Verificationadmin;