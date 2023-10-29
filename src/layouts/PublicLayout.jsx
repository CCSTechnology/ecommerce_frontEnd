import React from 'react'
import { Outlet } from 'react-router-dom'
import PublicHeader from './public/PublicHeader'
import PublicFooter from './public/PublicFooter'
import { Box, Container } from '@mui/material'
import Topbar from './public/Topbar'
import globalData from '../db/global'
import {  useMode } from '../utils/theme'
import { CssBaseline, ThemeProvider } from "@mui/material";

const PublicLayout = () => {
  const [theme] = useMode();
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth={'xl'} disableGutters>
          {/* <Box sx={{
            position: "sticky",
            top: 0,
            zIndex: 4,
          }}>
            <Topbar content={globalData.topbar} />
          </Box> */}
          <Box>
            <PublicHeader content={globalData.headers} options={globalData.headers.top100Films} />
            <div className='page-container'>
              <Box sx={{
                minHeight :"80vh"
              }}>        
              <Outlet />
              </Box>
            </div>
            <PublicFooter />
          </Box>

        </Container>
      </ThemeProvider>
  )
}

export default PublicLayout