import { Box, Container, Grid } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const PublicFooter = () => {
  return (
    <Box sx={{
      "& a": {
        textDecoration: "none"
      }
    }}>
      <footer className="site-footer">
        <div className="site-footer-top">
          <Container maxWidth="xl" >
            <div className="site-footer-top-inner">
              <Grid container>
                <Grid item
                  md={3}
                // className="col-xl-4 col-lg-6 col-md-6"
                >
                  <div className="footer-widget-column footer-widget-about">
                    <div className="footer-widget-logo">
                      <a href="index.html"><img src="wp-content/themes/truevine-foods/assets/images/footer-logo.png" alt="" width="200" /></a>
                    </div>
                    <div className="footer-widget-about-text-box">
                      <p className="footer-widget-about-text">
                        Truevine Foods: Delivering genuine, original taste with passion, trust, and purity from our humble beginnings                                    </p>
                    </div>
                  </div>
                </Grid>
                <Grid item
                  md={3}
                // className="col-xl-4 col-lg-6 col-md-6"
                >
                  <div className="footer-widget-column footer-widget__Explore">
                    <div className="footer-widget-title-box">
                      <h3 className="footer-widget-title">Explore</h3>
                    </div>
                    <Box sx={{

                    }} component={'ul'} className="footer-widget__Explore-list list-unstyled">
                      <li><Link href="/">Home</Link></li>
                      <li><Link href="/">About Us</Link></li>
                      <li><Link href="/">Products</Link></li>
                      <li><Link href="/">Certifications</Link></li>
                      <li><Link href="/">Contact Us</Link></li>
                    </Box>
                  </div>
                </Grid>
                <Grid item
                  md={3}
                // className="col-xl-4 col-lg-6 col-md-6"
                >
                  <div className="footer-widget-column footer-widget__Explore">
                    <div className="footer-widget-title-box">
                      <h3 className="footer-widget-title">Social Media</h3>
                    </div>
                    <ul className="footer-widget__Explore-list list-unstyled">
                      <li><Link href="/">Facebook</Link></li>
                      <li><Link href="/">Twitter</Link></li>
                      <li><Link href="/">Instagram</Link></li>
                      <li><Link href="/">LinkedIn</Link></li>
                      <li><Link href="/">You Tube</Link></li>

                    </ul>
                  </div>
                </Grid>
                <Grid item md={3} >
                  <div className="footer-widget-column footer-widget-contact">
                    <div className="footer-widget-title-box">
                      <h3 className="footer-widget-title">Contact Us</h3>
                    </div>
                    <ul className="footer-widget-contact-list list-unstyled">
                      <li>
                        <div className="icon">
                          <span className="fa-solid fa-phone-volume"></span>
                        </div>
                        <div className="text">
                          <h6>Phone:</h6>
                          <p><a href="tel:+91 93211 88645">+91 93211 88645</a></p>
                        </div>
                      </li>
                      <li>
                        <div className="icon">
                          <span className="fa-solid fa-envelope-open-text"></span>
                        </div>
                        <div className="text">
                          <h6>Email:</h6>
                          <p><a href="mailto:info@truevinefoods.com">info@truevinefoods.com</a></p>
                        </div>
                      </li>
                      <li>
                        <div className="icon">
                          <span className="fa-solid fa-location-dot"></span>
                        </div>
                        <div className="text">
                          <h6>Location:</h6>
                          <p>Plot no 17, Balan avenue,
                            KTC Nagar, Tirunelveli,
                            Tamil Nadu - 627011
                            India.</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <div className="site-footer-bottom">
          <Container className="container">
            <Grid container>
              <Grid item xl={12}>
                <div className="site-footer-bottom-inner">
                  <p className="site-footer-bottom-text">© Copyright 2023 by <a href="index.html">Truevine Foods</a></p>
                  {/* <p className="site-footer-bottom-text text">Developed by <a href="https://www.hyrrokkin.net/" target="_blank" rel="noreferrer noopener">hyrrokkin.</a></p> */}
                  {/* <div className="site-footer-bottom-scroll">
                    <Link href="/" data-target="html" className="scroll-to-target scroll-to-top"><i className="fa-solid fa-arrow-up-long"></i></Link>
                  </div> */}
                </div>
              </Grid>
            </Grid>
          </Container>
        </div>
      </footer>
      {/* <div className="mobile-nav-wrapper">
        <div className="mobile-nav-overlay mobile-nav-toggler"></div>
        <div className="mobile-nav-content">
          <span className="mobile-nav-close mobile-nav-toggler"><i className="fa fa-times"></i></span>
          <div className="logo-box">
            <a href="index-2.html" aria-label="logo image"><img src="wp-content/themes/truevine-foods/assets/images/logo-mobile.png" width="125" alt="" /></a>
          </div>
          <div className="mobile-nav-container"></div>
          <ul className="mobile-nav-contact list-unstyled">
            <li>
              <i className="fa fa-envelope"></i>
              <a href="mailto:info@truevinefoods.com">info@truevinefoods.com</a>
            </li>
            <li>
              <i className="fa fa-phone-alt"></i>
              <a href="tel:+91 93211 88645">+91 93211 88645</a>
            </li>
          </ul>
          <div className="mobile-nav-top">
            <div className="mobile-nav-social">
              <Link href="/" className="fa-brands fa-facebook-f"></Link>
              <Link href="/" className="fa-brands fa-twitter"></Link>
              <Link href="/" className="fa-brands fa-instagram"></Link>
              <Link href="/" className="fa-brands fa-linkedin-in"></Link>
              <Link href="/" className="fa-brands fa-youtube"></Link>
            </div>
          </div>
        </div>
      </div> */}
    </Box>
  )
}

export default PublicFooter