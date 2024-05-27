import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/teknisi.css';
import { useNavigate } from 'react-router-dom';

const Teknisi = () => {
  const [selectedTechnicianId, setSelectedTechnicianId] = useState();
  const [orderId, setOrderId] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    kota: '',
    kecamatan: '',
    jalan: '',
  });
  const [technicians, setTechnicians] = useState([]);

  // Mengambil data teknisi dari backend saat komponen dimuat
  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const response = await axios.get('http://localhost:3000/teknisi/getallteknisi');
        setTechnicians(response.data.data);
        console.log("Data teknisi:", response.data.data.data);
      } catch (error) {
        console.error('Error fetching technicians:', error);
      }
    };

    fetchTechnicians(); // Panggil fungsi untuk mengambil data teknisi saat komponen dimuat
  }, []); // Tambahkan array kosong sebagai dependencies agar useEffect hanya dijalankan sekali saat komponen dimuat

  useEffect(() => {
    if (location.state && location.state.addressData) {
      setFormData({
        kota: location.state.addressData.kota || '',
        kecamatan: location.state.addressData.kecamatan || '',
        jalan: location.state.addressData.jalan || '',
      });
    }
  
    if (location.state && location.state.id) {
      setOrderId(location.state.id);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'nama') {
    const technicianId = parseInt(value, 10)
      setSelectedTechnicianId(value); // Simpan ID teknisi yang dipilih
      const selectedTechnician = technicians.find(technician => technician.id === technicianId);
      if (selectedTechnician) {
        setFormData(prevFormData => ({
          ...prevFormData,
          nip: selectedTechnician.nip || '',
          no_telp: selectedTechnician.no_telp || ''
        }));
      }
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gabungkan ID teknisi yang dipilih dengan data order
      const updatedFormData = { ...formData, teknisi_id: selectedTechnicianId, id: orderId};
      const { nip, no_telp, ...dataToSend } = updatedFormData;
      console.log('Data yang akan dikirim ke backend:', updatedFormData);
      console.log('Data yang akan dikirim ke backend:', dataToSend);

      // Kirim data order ke backend
      await axios.put(`http://localhost:3000/order/update`, dataToSend);
      // Clear form setelah pengiriman berhasil
      setFormData({
        kota: '',
        kecamatan: '',
        jalan: '',
      });
      setSelectedTechnicianId(''); // Reset pilihan teknisi setelah submit berhasil
      navigate('/table');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Pilih Teknisi</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <br/>
            <select value={selectedTechnicianId} onChange={handleChange} name="nama" className="form-control">
              <option value="">Pilih Teknisi</option>
              {technicians.map((technician) => (
                <option key={technician.id} value={parseInt(technician.id)}>
                  {technician.nama}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="no_telp">No. Telepon:</label>
            <input
              type="text"
              id="no_telp"
              name="no_telp"
              value={formData.no_telp}
              onChange={handleChange}
              className="form-control"
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="nip">NIP:</label>
            <input
              type="text"
              id="nip"
              name="nip"
              value={formData.nip}
              onChange={handleChange}
              className="form-control"
              readOnly
            />
          </div>
          <button type="submit" className="btn btn-primary">
            SUBMIT TEKNISI
          </button>
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
        </form>
      </div>
    </div>
  );
};

export default Teknisi;
