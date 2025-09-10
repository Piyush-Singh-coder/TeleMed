import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
// The main App component that handles Jitsi integration
const JistiMeet = () => {
  const {name} = useParams();
  const {authUser} = useAuthStore();
  const [roomName, setRoomName] = useState(name);
  const [displayName, setDisplayName] = useState(authUser.name);
  const [api, setApi] = useState(null);
  const jitsiContainerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  // useEffect hook to load the Jitsi Meet External API script
  useEffect(() => {
    // Check if the script is already loaded to avoid multiple loads
    if (window.JitsiMeetExternalAPI) {
      setLoading(false);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://meet.jit.si/external_api.js';
    script.async = true;
    script.onload = () => {
      console.log("Jitsi Meet External API script loaded successfully.");
      setLoading(false);
    };
    script.onerror = () => {
      console.error("Failed to load Jitsi Meet External API script.");
      setError("Failed to load the Jitsi meeting script. Please check your internet connection.");
      setLoading(false);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      if (api) {
        api.dispose();
      }
    };
  }, []);

  // Function to start the meeting
  const startMeeting = () => {
    if (!roomName.trim()) {
        setError("Please enter a room name to start the meeting.");
        return;
    }

    if (!jitsiContainerRef.current) {
        console.error('Jitsi container not available. This is an unexpected error.');
        setError('Jitsi container not found. An internal error occurred.');
        return;
    }

    if (!window.JitsiMeetExternalAPI) {
        console.error('Jitsi API is not loaded yet. Cannot start meeting.');
        setError('Jitsi API is still loading. Please wait a moment and try again.');
        return;
    }

    setError(null);
    console.log(`Starting meeting for room: ${roomName} with display name: ${displayName}`);

    // Set the domain for the Jitsi instance
    const domain = 'meet.jit.si';
    const options = {
      roomName: roomName,
      parentNode: jitsiContainerRef.current,
      userInfo: {
        displayName: displayName,
      },
      // Customize the meeting interface and features
      configOverwrite: {
        startWithAudioMuted: false,
        disableInviteFunctions: true,
      },
      interfaceConfigOverwrite: {
        DEFAULT_BACKGROUND: '#333333',
        JITSI_WATERMARK_LINK: '',
        SHOW_JITSI_WATERMARK: false,
      },
    };

    try {
        const newApi = new window.JitsiMeetExternalAPI(domain, options);
        setApi(newApi);
        console.log("Jitsi API instance created successfully.");

        // Event listeners for the Jitsi API
        newApi.addEventListener('readyToClose', () => {
          console.log("Jitsi meeting is ready to close. Disposing API.");
          newApi.dispose();
          setApi(null);
        });

    } catch (e) {
        console.error('Error initializing Jitsi API:', e);
        setError('An error occurred while starting the meeting. Please try again.');
    }
  };

  // Function to end the meeting
  const endMeeting = () => {
    if (api) {
      console.log("Ending meeting and disposing API.");
      api.executeCommand('hangup');
      api.dispose();
      setApi(null);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 font-inter text-gray-100 p-4 sm:p-8">
      <div className="w-full max-w-4xl bg-gray-800 rounded-xl shadow-lg p-6 sm:p-10 flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 text-center">Jitsi Meeting Integration</h1>

        {/* The Jitsi container is always rendered but is hidden when not in use */}
        <div 
          ref={jitsiContainerRef} 
          id="jitsi-container" 
          className={`w-full h-[600px] rounded-lg shadow-inner overflow-hidden border border-gray-600 ${!api ? 'hidden' : ''}`}>
        </div>
        
        {/* Conditional rendering for the meeting form or the end button */}
        {!api ? (
          <div className="w-full space-y-6">
            <div className="space-y-4">
              {/* Room Name Input */}
              <div className="flex flex-col">
                <label htmlFor="roomName" className="text-sm font-medium text-gray-400 mb-1">Room Name</label>
                <input
                  type="text"
                  id="roomName"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  placeholder="Enter a room name"
                  className="w-full px-4 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                />
              </div>

              {/* Display Name Input */}
              <div className="flex flex-col">
                <label htmlFor="displayName" className="text-sm font-medium text-gray-400 mb-1">Your Name</label>
                <input
                  type="text"
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                />
              </div>
            </div>

            {/* Error Message Display */}
            {error && (
                <div className="bg-red-500 text-white text-center py-2 px-4 rounded-lg">
                    {error}
                </div>
            )}

            {/* Start Meeting Button */}
            <button
              onClick={startMeeting}
              disabled={loading}
              className={`w-full py-3 px-6 rounded-lg font-bold text-white transition-all duration-300 transform hover:scale-105 shadow-md
                ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'}`}
            >
              {loading ? 'Loading Jitsi...' : 'Start Meeting'}
            </button>
          </div>
        ) : (
          <div className="w-full">
            {/* End Meeting Button */}
            <button
              onClick={endMeeting}
              className="mt-6 w-full py-3 px-6 rounded-lg font-bold text-white transition-all duration-300 transform hover:scale-105 shadow-md bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
            >
              End Meeting
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JistiMeet;
