// import React, { useState } from 'react';
// import { Card, Button, Input } from '@mui/material';
// import { ArrowLeft } from 'lucide-react';

// const ForgotPassword = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState(['', '', '', '']);
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const handleEmailSubmit = (e) => {
//     e.preventDefault();
//     setCurrentStep(2);
//   };

//   const handleOtpSubmit = (e) => {
//     e.preventDefault();
//     setCurrentStep(3);
//   };

//   const handlePasswordSubmit = (e) => {
//     e.preventDefault();
//     // Handle password update logic here
//     console.log('Password updated');
//   };

//   const handleOtpChange = (index, value) => {
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     // Auto-focus next input
//     if (value && index < 3) {
//       const nextInput = document.getElementById(`otp-${index + 1}`);
//       if (nextInput) nextInput.focus();
//     }
//   };

//   const renderStep = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <div className="w-full max-w-md p-6">
//             <div className="mb-6">
//               <Button
//                 variant="ghost"
//                 className="p-0 mb-4"
//                 onClick={() => setCurrentStep(currentStep - 1)}
//               >
//                 <ArrowLeft className="h-5 w-5 mr-2" />
//               </Button>
//               <h2 className="text-xl font-semibold mb-2">Forgot password</h2>
//               <p className="text-gray-600 text-sm">
//                 Enter your email to reset the password
//               </p>
//             </div>

//             <form onSubmit={handleEmailSubmit}>
//               <div className="mb-4">
//                 <Input
//                   type="email"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full p-2"
//                   required
//                 />
//               </div>
//               <Button
//                 type="submit"
//                 className="w-full bg-blue-500 hover:bg-blue-600"
//               >
//                 Reset Password
//               </Button>
//             </form>
//           </div>
//         );

//       case 2:
//         return (
//           <div className="w-full max-w-md p-6">
//             <div className="mb-6">
//               <Button
//                 variant="ghost"
//                 className="p-0 mb-4"
//                 onClick={() => setCurrentStep(currentStep - 1)}
//               >
//                 <ArrowLeft className="h-5 w-5 mr-2" />
//               </Button>
//               <h2 className="text-xl font-semibold mb-2">Check your email</h2>
//               <p className="text-gray-600 text-sm">
//                 We sent a code to {email}
//               </p>
//             </div>

//             <form onSubmit={handleOtpSubmit}>
//               <div className="flex gap-2 mb-4 justify-center">
//                 {otp.map((digit, index) => (
//                   <Input
//                     key={index}
//                     id={`otp-${index}`}
//                     type="text"
//                     maxLength={1}
//                     className="w-12 h-12 text-center text-xl"
//                     value={digit}
//                     onChange={(e) => handleOtpChange(index, e.target.value)}
//                     required
//                   />
//                 ))}
//               </div>
//               <Button
//                 type="submit"
//                 className="w-full bg-blue-500 hover:bg-blue-600"
//               >
//                 Verify Code
//               </Button>
//               <p className="text-sm text-center mt-4">
//                 Haven't got the email yet?{' '}
//                 <button
//                   type="button"
//                   className="text-blue-500 hover:text-blue-600"
//                   onClick={() => console.log('Resend email')}
//                 >
//                   Resend email
//                 </button>
//               </p>
//             </form>
//           </div>
//         );

//       case 3:
//         return (
//           <div className="w-full max-w-md p-6">
//             <div className="mb-6">
//               <Button
//                 variant="ghost"
//                 className="p-0 mb-4"
//                 onClick={() => setCurrentStep(currentStep - 1)}
//               >
//                 <ArrowLeft className="h-5 w-5 mr-2" />
//               </Button>
//               <h2 className="text-xl font-semibold mb-2">Set a new password</h2>
//               <p className="text-gray-600 text-sm">
//                 Please enter your new password
//               </p>
//             </div>

//             <form onSubmit={handlePasswordSubmit}>
//               <div className="mb-4">
//                 <Input
//                   type="password"
//                   placeholder="Password"
//                   value={newPassword}
//                   onChange={(e) => setNewPassword(e.target.value)}
//                   className="w-full p-2 mb-3"
//                   required
//                 />
//                 <Input
//                   type="password"
//                   placeholder="Confirm Password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   className="w-full p-2"
//                   required
//                 />
//               </div>
//               <Button
//                 type="submit"
//                 className="w-full bg-blue-500 hover:bg-blue-600"
//               >
//                 Update Password
//               </Button>
//             </form>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <Card className="w-full max-w-md mx-auto">
//       {renderStep()}
//     </Card>
//   );
// };

// export default ForgotPassword;

import React, { useState } from 'react';
import { 
  Card, 
  Button, 
  Input,
  Typography,
  Box,
  InputBase,
  styled
} from '@mui/material';
import { ArrowLeft } from 'lucide-react';

// Custom styled components
const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: '440px',
  margin: '0 auto',
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  borderRadius: '12px'
}));

const StyledButton = styled(Button)(({ theme }) => ({
  width: '100%',
  padding: '12px',
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: '16px',
  backgroundColor: '#3b82f6',
  '&:hover': {
    backgroundColor: '#2563eb',
  }
}));

const StyledOTPInput = styled(InputBase)(({ theme }) => ({
  width: '48px',
  height: '48px',
  textAlign: 'center',
  fontSize: '20px',
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
  '&:focus': {
    border: '2px solid #3b82f6',
    backgroundColor: '#fff',
  },
  input: {
    textAlign: 'center',
  }
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  width: '100%',
  padding: '12px 16px',
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
  marginBottom: '12px',
  transition: 'all 0.2s',
  '&:focus-within': {
    border: '2px solid #3b82f6',
    backgroundColor: '#fff',
  }
}));

const ForgotPassword = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setCurrentStep(3);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    console.log('Password updated');
  };

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Box sx={{ p: 0 , marginTop: "-20px"}}>

            <Box sx={{ mb: 1 }}>
              <Button
                // startIcon={<ArrowLeft />}
                sx={{ 
                  minWidth: 'auto',
                  color: 'text.primary',
                  '&:hover': { backgroundColor: 'transparent' }
                }}
                onClick={() => setCurrentStep(currentStep - 1)}
              />
              {/* <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
                Forgot password
              </Typography>*/}
              <Typography variant="body2" color="text.secondary">
                Enter your registered email address to receive a verification code.
              </Typography> 
            </Box>

            <form onSubmit={handleEmailSubmit}>
              <Box sx={{ mb: 2}}>
                <StyledInput
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  required
                />
              </Box>
              <StyledButton variant="contained" type="submit">
                Reset Password
              </StyledButton>
            </form>
          </Box>
        );

      case 2:
        return (
          <Box sx={{ p: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Button
                startIcon={<ArrowLeft />}
                sx={{ 
                  p: 0, 
                  mb: 2, 
                  minWidth: 'auto',
                  color: 'text.primary',
                  '&:hover': { backgroundColor: 'transparent' }
                }}
                onClick={() => setCurrentStep(currentStep - 1)}
              />
              <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
                Check your email
              </Typography>
              <Typography variant="body2" color="text.secondary">
                We sent a code to {email}
              </Typography>
            </Box>

            <form onSubmit={handleOtpSubmit}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  gap: 1, 
                  justifyContent: 'center',
                  mb: 3 
                }}
              >
                {otp.map((digit, index) => (
                  <StyledOTPInput
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    required
                  />
                ))}
              </Box>
              <StyledButton variant="contained" type="submit">
                Verify Code
              </StyledButton>
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Haven't got the email yet?{' '}
                  <Button
                    sx={{ 
                      p: 0, 
                      textTransform: 'none',
                      color: '#3b82f6',
                      '&:hover': { backgroundColor: 'transparent', color: '#2563eb' }
                    }}
                    onClick={() => console.log('Resend email')}
                  >
                    Resend email
                  </Button>
                </Typography>
              </Box>
            </form>
          </Box>
        );

      case 3:
        return (
          <Box sx={{ p: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Button
                startIcon={<ArrowLeft />}
                sx={{ 
                  p: 0, 
                  mb: 2, 
                  minWidth: 'auto',
                  color: 'text.primary',
                  '&:hover': { backgroundColor: 'transparent' }
                }}
                onClick={() => setCurrentStep(currentStep - 1)}
              />
              <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
                Set a new password
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Please enter your new password
              </Typography>
            </Box>

            <form onSubmit={handlePasswordSubmit}>
              <Box sx={{ mb: 3 }}>
                <StyledInput
                  type="password"
                  placeholder="Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  fullWidth
                  required
                />
                <StyledInput
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  fullWidth
                  required
                />
              </Box>
              <StyledButton variant="contained" type="submit">
                Update Password
              </StyledButton>
            </form>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <StyledCard>
      {renderStep()}
    </StyledCard>
  );
};

export default ForgotPassword;