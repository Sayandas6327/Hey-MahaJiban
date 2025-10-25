
import './Footer.css'
import { FaGithub } from "react-icons/fa6"
import { FaInstagram } from "react-icons/fa";
const Footer = () => {
  return (
    
    <div className='footer'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-4 col-sm-4'>
            <h4>Sishuswapna Prakashan</h4>
            <p>1/1 Brindaban Mallick Lane, Kolkata 700009</p>
          </div>
          <div className='col-md-4 col-sm-4'>
            <div className='container-fluid d-flex justify-content-center'>
              <h4>Hey Mahajiban</h4>
            </div>
            <div className='container-fluid d-flex justify-content-center'>
              &nbsp;<p className='m-0'>&copy; Sayan Das</p>
            </div>
            <div className='container-fluid d-flex justify-content-center'>
              <a href="https://www.github.com/Sayandas6327"><FaGithub className='footer-icons'/></a>
      
              <a href="https://www.instagram.com/sayandas6327"><FaInstagram className='footer-icons'/></a>
            </div>
          </div>
          <div className='col-md-4 col-sm-4'>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Footer
