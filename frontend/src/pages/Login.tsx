import { GoogleAuthProvider,signInWithPopup } from 'firebase/auth';
import { ChangeEvent, useState } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); 
  const [phoneno, setPhoneno] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e:ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePhoneNoChange = (e:ChangeEvent<HTMLInputElement>) => {
    setPhoneno(e.target.value);
  };

  const handleOtpChange = (e:ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleSignUp = async () => {
    // Validate phone number length
    if (phoneno && phoneno.length === 10) {
      console.log("hi");
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER}/api/v1/user/send-otp`, {  // Updated port
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ phoneNumber: phoneno }),  // Updated payload
        });

        const data = await response.json();

        if (response.ok) {
          // OTP sent successfully
          setOtpSent(true);
          alert('OTP has been sent to your phone number.');
        } else {
          // Handle error from the server
          alert(data.message || 'Failed to send OTP. Please try again.');
        }
      } catch (error) {
        // Handle fetch error
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      }
    } else {
      alert('Please enter a valid phone number.');
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER}/api/v1/user/verify-otp`, {  // Updated port
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: phoneno, otp }),  // Updated payload
      });

      const data = await response.json();
      if (response.ok) {
        alert("Phone number verified successfully");
      } else {
        // Handle error from the server
        alert(data.message || 'Failed to verify OTP. Please try again.');
      }
    } catch (error) {
      // Handle fetch error
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleGoogleSignIn = async() => {
    const provider = new GoogleAuthProvider();
    const {user} = await signInWithPopup(auth,provider);
    console.log(user)
    navigate("/")
    
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        {!otpSent ? (
          // Sign-Up Form
          <>
            <div className="form-group">
              <label htmlFor="username">Name</label>
              <input
                type="text"
                id="username"
                placeholder="Enter Name"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="username">Email Id</label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneno">Phone no</label>
              <input
                type="tel"
                id="phoneno"
                placeholder="Enter phone no"
                value={phoneno}
                onChange={handlePhoneNoChange}
              />
            </div>

            <button onClick={handleSignUp} className="btn-signup">
              Sign Up
            </button>
          </>
        ) : (
          // OTP Verification Form
          <>
            <div className="form-group">
              <label htmlFor="otp">Enter OTP</label>
              <input
                type="text"
                id="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={handleOtpChange}
              />
            </div>

            <button onClick={verifyOtp} className="btn-verify">
              Verify OTP
            </button>
          </>
        )}

        {!otpSent && (
          <>
            <div className="divider">or</div>
            <button onClick={handleGoogleSignIn} className="btn-google">
              <span className="google-icon">G</span> Sign up with Google
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
