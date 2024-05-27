import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Table = () => {
  const [dataPesanan, setDataPesanan] = useState([]);
  const [dataTeknisi, setDataTeknisi] = useState([]);
  const [dataPaket, setDataPaket] = useState([]);
  const navigate = useNavigate();


  console.log('dd', dataPesanan)

  useEffect(() => {
    fetchData();
  }, []);


  const handleDetailClick = (id) => {
    navigate(`/verificationadmin/${id}`);
  };


  const fetchData = async () => {
    try {
      const responsePesanan = await axios.get('http://localhost:3000/order/getdataorder');
      setDataPesanan(responsePesanan.data.data);

      const responseTeknisi = await axios.get('http://localhost:3000/teknisi/allteknisidesc');
      setDataTeknisi(responseTeknisi.data.data);

      const responsePaket = await axios.get('http://localhost:3000/package/getallpackagesort');
      setDataPaket(responsePaket.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <div>
      <h2>Data Pesanan</h2>
      <table className="table">
        <thead>
          <tr>
            <th>id</th>
            <th>Nama Konsumen</th>
            <th>nama paket</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {dataPesanan.map((item, index) => {
            if(item.package_id == 1) return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.nama}</td>
                  <td>Package Basic</td>
                  <td><button className='button' onClick={() => handleDetailClick(item.id)}>detail</button></td>
                </tr>
              )
            if(item.package_id == 2) return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.nama}</td>
                  <td>Package Medium</td>
                  <td><button className='button' onClick={() => handleDetailClick(item.id)}>detail</button></td>
                </tr>
              )
            return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.nama}</td>
                  <td>Package Advance</td>
                  <td><button className='button' onClick={() => handleDetailClick(item.id)}>detail</button></td>
                </tr>
              )
            })}
        </tbody>
      </table>

      <h2>Data Paket Terbanyak Terjual</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Id Paket</th>
            <th>Nama Paket</th>
            <th>Jumlah Terjual</th>
          </tr>
        </thead>
        <tbody>
          {dataPaket.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.nama}</td>
              <td>{item.jumlah_penjualan}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Data Teknisi Terbanyak Ditugaskan</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nama Teknisi</th>
            <th>Total Handling</th>
          </tr>
        </thead>
        <tbody>
          {dataTeknisi.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.nama}</td>
              <td>{item.total_handling}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
