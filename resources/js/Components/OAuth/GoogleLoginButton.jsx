// components/GoogleLoginButton.jsx

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8000/auth/google'; // Laravel route
  };

  return (
    <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md shadow-sm transition duration-150"
    >
        <svg className="w-5 h-5" viewBox="0 0 488 512" xmlns="http://www.w3.org/2000/svg">
            <path fill="white" d="M488 261.8c0-17.8-1.5-35.1-4.3-51.8H249v98h134.3c-5.8 31.3-23.2 57.9-49.6 75.7v62h80.3c46.9-43.3 74-107.2 74-183.9z"/>
            <path fill="white" d="M249 512c67.3 0 123.9-22.4 165.2-60.8l-80.3-62c-22.3 15-50.8 23.8-84.9 23.8-65 0-120-43.8-139.7-102.7H25.1v64.4C65.6 466.6 150.2 512 249 512z"/>
            <path fill="white" d="M109.3 310.3c-9.7-28.9-9.7-60.4 0-89.3v-64.4H25.1c-38.5 76.8-38.5 167.1 0 243.9l84.2-64.4z"/>
            <path fill="white" d="M249 100.2c35.5 0 67.3 12.2 92.5 36.3l69.4-69.4C372.9 24.5 318.1 0 249 0 150.2 0 65.6 45.4 25.1 118.9l84.2 64.4C129 144 184 100.2 249 100.2z"/>
        </svg>
        Continue with Google
    </button>
  );
};

export default GoogleLoginButton;
