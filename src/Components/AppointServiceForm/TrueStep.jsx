import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';

export default function CustomStepper({ children, activeStep }) {
  return (
    <Box sx={{ maxWidth: 800, textAlign: 'center' }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {children}
      </Stepper>
      {/* {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )} */}
    </Box>
  );
}
