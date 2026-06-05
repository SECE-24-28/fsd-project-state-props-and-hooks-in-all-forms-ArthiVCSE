import React from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import ApartmentIcon from '@mui/icons-material/Apartment';
import BedIcon from '@mui/icons-material/Bed';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SecurityIcon from '@mui/icons-material/Security';
import ParkIcon from '@mui/icons-material/Park';
import WifiIcon from '@mui/icons-material/Wifi';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';

const highlights = [
  { img: '/images/room.jpg', title: <span className="d-flex align-items-center justify-content-center gap-2"><BedIcon /> Modern Rooms</span>, desc: 'Spacious rooms with beds, study tables, wardrobes, fans, and attached facilities.' },
  { img: '/images/dining.jpg', title: <span className="d-flex align-items-center justify-content-center gap-2"><RestaurantIcon /> Dining Facilities</span>, desc: 'Healthy and hygienic meals prepared with balanced nutrition and quality standards.' },
  { img: '/images/secured.jpg', title: <span className="d-flex align-items-center justify-content-center gap-2"><SecurityIcon /> 24×7 Security</span>, desc: 'CCTV monitoring, biometric entry systems, and hostel wardens ensure student safety.' },
  { img: '/images/campus-life.jpg', title: <span className="d-flex align-items-center justify-content-center gap-2"><ParkIcon /> Campus Life</span>, desc: 'Sports areas, recreation zones, reading halls, and green surroundings for students.' },
];

const facilities = [
  <span className="d-flex align-items-center justify-content-center gap-2"><WifiIcon /> High-Speed Wi-Fi</span>,
  <span className="d-flex align-items-center justify-content-center gap-2"><SportsSoccerIcon /> Sports Facilities</span>,
  <span className="d-flex align-items-center justify-content-center gap-2"><LocalLaundryServiceIcon /> Laundry Services</span>,
  <span className="d-flex align-items-center justify-content-center gap-2"><LocalHospitalIcon /> Medical Support</span>,
  <span className="d-flex align-items-center justify-content-center gap-2"><MenuBookIcon /> Study Halls</span>,
  <span className="d-flex align-items-center justify-content-center gap-2"><DirectionsBusIcon /> Transport Access</span>,
  <span className="d-flex align-items-center justify-content-center gap-2"><LocalCafeIcon /> Cafeteria</span>,
  <span className="d-flex align-items-center justify-content-center gap-2"><BatteryChargingFullIcon /> Power Backup</span>,
];

function Hostel() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <TopBar message={<span className="d-flex align-items-center justify-content-center gap-2"><ApartmentIcon fontSize="small" /> Safe • Smart • Comfortable Student Living</span>} />
      <Navbar />

      {/* HERO */}
      <section className="container py-3">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h1 className="fw-bold mb-4">Premium Hostel &amp; Student Accommodation</h1>
            <p className="text-secondary lh-lg">
              Ashford University provides modern, safe, and student-friendly hostel
              facilities designed to create a comfortable living and learning environment.
              <br />
              Our hostels include high-speed Wi-Fi, furnished rooms, hygienic dining,
              recreation centres, gym facilities, medical support, and 24×7 security.
              <br />
              Separate hostels are available for boys and girls with wardens, biometric
              entry systems, CCTV surveillance, and smart campus access.
            </p>
            <div className="mt-4">
              <Link to="/contact" className="btn btn-primary rounded-pill px-4 py-2">
                Contact Warden
              </Link>
            </div>
          </div>
          <div className="col-lg-6 mt-4 mt-lg-0">
            <img src="/images/hostel.jpg" className="img-fluid rounded-4 shadow" alt="Hostel" />
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="container pb-4">
        <div className="text-center mb-4">
          <h2 className="fw-bold">Hostel Highlights</h2>
          <p className="text-secondary">Smart facilities built for student comfort</p>
        </div>
        <div className="row g-4">
          {highlights.map(({ img, title, desc }) => (
            <div className="col-md-6 col-lg-3" key={title}>
              <div className="card border-0 shadow rounded-4 h-100">
                <img src={img} className="card-img-top" height="220" alt={title} />
                <div className="card-body">
                  <h5>{title}</h5>
                  <p className="text-secondary">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FACILITIES */}
      <section className="container pb-3">
        <div className="card border-0 shadow-lg rounded-4 p-7">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Facilities Available</h2>
            <p className="text-secondary">
              Designed to support academic and personal growth of students
            </p>
          </div>
          <br>
          </br>
          <div className="row text-center g-4">
            {facilities.map((f, i) => (
              <div className="col-md-3" key={i}>
                <div className="p-4 bg-light rounded-4 shadow-sm h-100">
                  <h5>{f}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Hostel;