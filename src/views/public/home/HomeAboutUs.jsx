import { Box, Container, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const HomeAboutUs = ({ aboutUs }) => {
  const [title, setTitle] = useState([])
 


  
  return (
    <section className="about-section pt-80 pb-90">
      <Container >
        <Grid container justifyContent={'center'} >
          <Grid item md={6}>
            <div className="section-title mb-40">{
              aboutUs?.subtitle && <h6 className="sub-title">{aboutUs?.subtitle}</h6>
            }
              {
                aboutUs?.title && (
                  <>{String(aboutUs?.title || '').split(' ').map((titles, index, array) => {
                    return index === 0 && <h2 key={index} className="title">{aboutUs?.title}</h2>
                  })}</>)
              }
            </div>
            <Box className="about-content" sx={{
              "& p": {
                marginBottom: "1rem"
              }
            }}>
              <div dangerouslySetInnerHTML={{
                __html : aboutUs.data
              }}>
              </div>
              <Box marginBlock={3}>
                <Link href="/" className="theme-btn">Know More <i className="fa-solid fa-arrow-right"></i> </Link>
              </Box>
            </Box>
          </Grid>
          <Grid item md={6} sx={{
            "& img": {
              width: "536px"
            }
          }}>
            <img src="https://truevinefoods.com/wp-content/uploads/2023/07/about.png" className="img-fluid" alt="About Img" />
          </Grid>
        </Grid>
      </Container>
    </section>
  )
}

export default HomeAboutUs