import React from 'react';
import { Card, Grid, Skeleton, Typography } from '@mui/material';

function NotificationCardLoader({ count }) {
  const loadingCards = [...Array(count)].map((_, index) => (
    <Card
      key={index}
      sx={{
        border: '1px solid #049457',
        borderRadius: '8px',
        padding: 1.5,
        mb: 1,
      }}
      variant="outlined"
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <Typography>
            <Skeleton animation="wave" variant="text" />
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography>
            <Skeleton animation="wave" variant="text" />
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography>
            <Skeleton animation="wave" variant="text" />
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography>
            <Skeleton animation="wave" variant="text" />
          </Typography>
        </Grid>
      </Grid>
    </Card>
  ));

  return <>{loadingCards}</>;
}

export default NotificationCardLoader;
