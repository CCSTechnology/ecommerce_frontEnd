import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import PublicHeader from './public/PublicHeader'

import { Box } from '@mui/material'
import { theme } from '../utils/theme'
import { CssBaseline, ThemeProvider } from "@mui/material";
import styled from '@emotion/styled'
import PublicFooter from './public/PublicFooter'
import { restrictHeaderAndFooter } from '../utils/helpers'

const PublicLayout = () => {
  const {pathname} = useLocation()
  const [show, setShow] = useState(false)

  useEffect(()=>{
      setShow(restrictHeaderAndFooter(pathname))
  },[pathname])
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {
        !show ? <Box sx={{
          height: "100vh",
          width: '100vw', background: "#fff"
        }}>
          <PageWrapper>
            <Outlet />
          </PageWrapper>
        </Box> : <Box sx={{
          height: "100vh",
          width: '100vw', background: "#fff"
        }}>  <PublicHeader />
          <PageWrapper>
            <Outlet />
          </PageWrapper>
          <PublicFooter />
        </Box>
      }


    </ThemeProvider>
  )
}

export default PublicLayout


const PageWrapper = styled(Box)`
  min-height:  80vh;
`