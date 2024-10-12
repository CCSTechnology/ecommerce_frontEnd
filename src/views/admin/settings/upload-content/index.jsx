import { Box, Stack } from '@mui/material'
import React from 'react'
import TopBreaccrumb from '../../../../components/TopBreadcrumb'
import UploadContentData from '../../../../components/uploadContentData'

export default function UploadContent() {
  return (
    <Box>
      <Box className="indexBox">
        <Stack
          direction={{ lg: "row", sm: "column" }}
          gap={2}
          alignItems={"center"}
        >
          <Box sx={{ width: "100%", typography: "body1" }}>
            {" "}
            <TopBreaccrumb title={"Upload Content"} to={`/admin/dashboard`} />
            <UploadContentData />
          </Box>
        </Stack>

      </Box>
    </Box>
  )
}
