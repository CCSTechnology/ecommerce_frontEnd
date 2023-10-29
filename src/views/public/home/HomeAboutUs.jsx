import { Box, Container, Grid } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const HomeAboutUs = () => {
  return (
    <section className="about-section pt-80 pb-90">
      <Container >
        <Grid container justifyContent={'center'} >
          <Grid item  md={6}>
            <div className="section-title mb-40">
              <h6 className="sub-title">About Us</h6>
              <h2 className="title"><span>Welcome To</span> Truevine Foods</h2>
            </div>
            <Box className="about-content" sx={{
              "& p" :{
                marginBottom : "1rem"
              }
            }}>
              <div>
                <p>Truevine Foods was born out of passion to deliver a genuine and non-diluted food products by retaining its original qualities and reaching out to the consumers with the product known for its true and original taste. We aim to build a brand which wins the trust of the consumers for its originality and purity.</p>
                <p>Truevine was started with its humble beginning by converting our residence into a small makeshift office and all the ideas and planning take place here before being actually converted in to reality.</p>
                <p>We believe food is an expression of emotions and love when cooked with passion and that’s why we continue to strive hard by identifying regional markets and researching on various spices and reaching out to the best and original ingredients which as part of the process can add more value to the final product that we develop and stands for the values that we believe on which of our company is found.</p>
              </div>
              <Box marginBlock={3}>
                <Link href="/" className="theme-btn">Know More <i className="fa-solid fa-arrow-right"></i> </Link>
              </Box>
            </Box>
          </Grid>
          <Grid item  md={6} sx={{
            "& img" :{
              width : "536px"
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