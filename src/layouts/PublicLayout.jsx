import React from 'react'
import { Outlet } from 'react-router-dom'
import PublicHeader from './public/PublicHeader'

import { Box } from '@mui/material'
import { theme } from '../utils/theme'
import { CssBaseline, ThemeProvider } from "@mui/material";
import styled from '@emotion/styled'
import PublicFooter from './public/PublicFooter'

const PublicLayout = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        height: "100vh",
        width: '100vw', background: "#fff"
      }}>
        <PublicHeader />
        <PageWrapper>
          <Outlet />
        </PageWrapper>
        <PublicFooter />
      </Box>

    </ThemeProvider>
  )
}

export default PublicLayout


const PageWrapper = styled(Box)`
  min-height:  80vh;
`