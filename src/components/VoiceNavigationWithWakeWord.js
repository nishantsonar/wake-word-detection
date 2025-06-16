import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';

// Constants
const WAKE_WORD_DELAY = 100;
const RECORDING_DURATION = 3000;

// Styled components
const VoiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px;
  max-width: 600px;
  width: 100%;
`;

const StatusIndicator = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  background-color: ${props => props.active ? '#ff4f4f' : '#4CAF50'};
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: scale(1.05);
  }
`;

const MicIcon = styled.div`
  font-size: 32px;
  color: white;
`;

const CommandsContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const CommandTitle = styled.h3`
  color: #333;
  margin-bottom: 10px;
`;

const CommandList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CommandItem = styled.li`
  padding: 10px;
  margin: 5px 0;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
`;

const RecognitionText = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: #fff;
  border-radius: 5px;
  width: 100%;
  min-height: 60px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const WakeWordContainer = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const WakeWordInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const WakeWordStatus = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 255, 255, 0.9);
  padding: 15px 25px;
  border-radius: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 1000;
  animation: fadeIn 0.3s ease-in;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translate(-50%, -20px); }
    to { opacity: 1; transform: translate(-50%, 0); }
  }
`;

const PulsingDot = styled.div`
  width: 12px;
  height: 12px;
  background-color: #ff4f4f;
  border-radius: 50%;
  animation: pulse 1.5s infinite;
  
  @keyframes pulse {
    0% { transform: scale(0.8); opacity: 0.8; }
    50% { transform: scale(1.2); opacity: 1; }
    100% { transform: scale(0.8); opacity: 0.8; }
  }
`;

// Wake word detection helper functions
function levenshteinDistance(str1, str2) {
  const m = str1.length;
  const n = str2.length;

  const dp = Array(m + 1)
    .fill()
    .map(() => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }

  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1, // deletion
          dp[i][j - 1] + 1, // insertion
          dp[i - 1][j - 1] + 1 // substitution
        );
      }
    }
  }

  return dp[m][n];
}

function soundexCode(str) {
  // Basic Soundex implementation for better phonetic matching
  // Convert to uppercase
  str = str.toUpperCase();

  // Keep first letter
  let result = str[0];

  // Map of consonant sounds
  const mapping = {
    B: 1, F: 1, P: 1, V: 1,
    C: 2, G: 2, J: 2, K: 2, Q: 2, S: 2, X: 2, Z: 2,
    D: 3, T: 3,
    L: 4,
    M: 5, N: 5,
    R: 6,
  };

  // Previous digit
  let prevDigit = -1;

  // Process remaining characters
  for (let i = 1; i < str.length; i++) {
    const char = str[i];

    // Get digit for current character
    const digit = mapping[char];

    // Skip vowels and 'H', 'W', 'Y'
    if (digit === undefined) {
      continue;
    }

    // Skip duplicates
    if (digit !== prevDigit) {
      result += digit;
      prevDigit = digit;
    }

    // Stop when we have enough digits
    if (result.length >= 4) {
      break;
    }
  }

  // Pad with zeros if necessary
  while (result.length < 4) {
    result += "0";
  }

  return result;
}

function isWakeWordMatch(text, wakeWord, threshold = 0.65) {
  if (!text || !wakeWord) return false;
  
  // Split the text into words
  const words = text.toLowerCase().split(/\\s+/);

  // Calculate similarity score for each word
  for (const word of words) {
    if (word.length < 3) continue; // Skip very short words

    // 1. Direct match
    if (word === wakeWord.toLowerCase()) return true;

    // 2. Levenshtein distance similarity
    const maxLength = Math.max(word.length, wakeWord.length);
    const distance = levenshteinDistance(word, wakeWord.toLowerCase());
    const similarity = (maxLength - distance) / maxLength;

    if (similarity >= threshold) {
      return true;
    }

    // 3. Check common phonetic variations
    const phoneticVariations = [
      word.replace(/sh/g, "s"),
      word.replace(/sh/g, "ch"),
      word.replace(/bh/g, "b"),
      word.replace(/ni$/g, "nee"),
      word.replace(/i$/g, "ee"),
      word.replace(/^h/, "bh"),
    ];

    for (const variation of phoneticVariations) {
      const phonSimilarity =
        (maxLength - levenshteinDistance(variation, wakeWord.toLowerCase())) / maxLength;
      if (phonSimilarity >= threshold) {
        return true;
      }
    }

    // 4. Soundex comparison (for phonetic similarity)
    if (
      soundexCode(word).substring(0, 2) ===
      soundexCode(wakeWord).substring(0, 2)
    ) {
      // If the first two soundex codes match, do a final similarity check
      if (similarity >= threshold - 0.15) {
        // Lower threshold for phonetic matches
        return true;
      }
    }
  }

  return false;
}

const VoiceNavigationWithWakeWord = ({ onNavigate, commands }) => {
  // States
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [wakeWord, setWakeWord] = useState('hey assistant');
  const [wakeWordDetected, setWakeWordDetected] = useState(false);
  const [isListeningForCommand, setIsListeningForCommand] = useState(false);
  const [detectedWakeWord, setDetectedWakeWord] = useState('');
  const [recognition, setRecognition] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  
  // Refs
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Initialize speech recognition
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';
      
      setRecognition(recognitionInstance);
    } else {
      alert('Speech recognition is not supported in your browser. Try using Chrome.');
    }
  }, []);

  // Start wake word detection
  const startWakeWordDetection = useCallback(() => {
    if (!recognition) return;
    
    console.log("Started listening for wake word...");
    recognition.start();
    setIsListening(true);
  }, [recognition]);

  // Stop wake word detection
  const stopWakeWordDetection = useCallback(() => {
    if (!recognition) return;
    
    recognition.stop();
    setIsListening(false);
  }, [recognition]);

  // Handle recognition results for wake word detection
  useEffect(() => {
    if (!recognition) return;

    const handleResult = (event) => {
      const currentTranscript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join(' ');
      
      setTranscript(currentTranscript);
      
      // Check for wake word if not already detected
      if (!wakeWordDetected && !isRecording) {
        console.log("Checking for wake word in:", currentTranscript);
        
        if (isWakeWordMatch(currentTranscript, wakeWord)) {
          console.log("Wake word detected!");
          setWakeWordDetected(true);
          
          // Try to extract the actual detected variant for debugging
          const words = currentTranscript.toLowerCase().split(/\\s+/);
          for (const word of words) {
            if (levenshteinDistance(word, wakeWord.toLowerCase()) <= 3) {
              setDetectedWakeWord(word);
              break;
            }
          }
          
          stopWakeWordDetection();
          
          // Start command recording after a short delay
          setTimeout(() => {
            startRecording();
            setIsListeningForCommand(true);
          }, WAKE_WORD_DELAY);
        }
      }
    };

    const handleEnd = () => {
      // Restart recognition if it ends and we're still supposed to be listening
      if (isListening && !wakeWordDetected) {
        recognition.start();
      }
    };

    const handleError = (event) => {
      console.error('Speech recognition error', event.error);
      // Attempt to restart after error
      if (isListening && !wakeWordDetected) {
        setTimeout(() => {
          try {
            recognition.start();
          } catch (e) {
            console.error("Failed to restart recognition:", e);
          }
        }, 1000);
      }
    };

    recognition.onresult = handleResult;
    recognition.onend = handleEnd;
    recognition.onerror = handleError;

    return () => {
      recognition.onresult = null;
      recognition.onend = null;
      recognition.onerror = null;
    };
  }, [recognition, wakeWord, wakeWordDetected, isListening, isRecording, stopWakeWordDetection]);

  // Start recording for command
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        processCommand(audioBlob);
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      
      // Stop recording after RECORDING_DURATION
      setTimeout(() => {
        if (mediaRecorderRef.current?.state === "recording") {
          stopRecording();
        }
      }, RECORDING_DURATION);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  // Process the recorded command
  const processCommand = (audioBlob) => {
    // Create a new SpeechRecognition instance for the command
    const commandRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    commandRecognition.lang = 'en-US';
    commandRecognition.continuous = false;
    commandRecognition.interimResults = false;
    
    // Convert blob to audio element and play it to the recognition
    const audio = new Audio(URL.createObjectURL(audioBlob));
    audio.play();
    
    commandRecognition.start();
    
    commandRecognition.onresult = (event) => {
      const commandText = event.results[0][0].transcript;
      setTranscript(commandText);
      
      // Process the command
      processCommandText(commandText);
    };
    
    commandRecognition.onerror = (event) => {
      console.error("Error recognizing command:", event.error);
      resetStates();
    };
    
    commandRecognition.onend = () => {
      resetStates();
    };
  };

  // Process the command text and navigate
  const processCommandText = (commandText) => {
    const lowerText = commandText.toLowerCase();
    
    // Check if the command matches any of our navigation commands
    for (const command of commands) {
      const keywords = command.keywords.map(keyword => keyword.toLowerCase());
      
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        onNavigate(command.action);
        break;
      }
    }
    
    resetStates();
  };

  // Reset all states
  const resetStates = () => {
    setWakeWordDetected(false);
    setIsListeningForCommand(false);
    setIsRecording(false);
    setDetectedWakeWord('');
    
    // Restart wake word detection
    setTimeout(() => {
      startWakeWordDetection();
    }, 500);
  };

  // Start/stop wake word detection on mount/unmount
  useEffect(() => {
    if (recognition) {
      startWakeWordDetection();
    }
    
    return () => {
      if (recognition) {
        stopWakeWordDetection();
      }
    };
  }, [recognition, startWakeWordDetection, stopWakeWordDetection]);

  // Toggle listening manually
  const toggleListening = () => {
    if (isListening) {
      stopWakeWordDetection();
    } else {
      setWakeWordDetected(false);
      setIsListeningForCommand(false);
      startWakeWordDetection();
    }
  };

  return (
    <VoiceContainer>
      <StatusIndicator active={isListening || isRecording} onClick={toggleListening}>
        <MicIcon>{isListening || isRecording ? '⏹' : '🎤'}</MicIcon>
      </StatusIndicator>
      
      <h2>{isListening ? 'Listening for wake word...' : isRecording ? 'Listening for command...' : 'Click to start listening'}</h2>
      
      <RecognitionText>
        {transcript || 'Say your wake word to activate voice commands...'}
      </RecognitionText>
      
      <WakeWordContainer>
        <label htmlFor="wakeWord">Wake Word:</label>
        <WakeWordInput 
          id="wakeWord"
          type="text" 
          value={wakeWord} 
          onChange={(e) => setWakeWord(e.target.value)}
          placeholder="Enter wake word (e.g., 'hey assistant')"
        />
      </WakeWordContainer>
      
      <CommandsContainer>
        <CommandTitle>Available Voice Commands</CommandTitle>
        <CommandList>
          {commands.map((command, index) => (
            <CommandItem key={index}>
              <span>{command.keywords.join(', ')}</span>
              <span>→ {command.description}</span>
            </CommandItem>
          ))}
        </CommandList>
      </CommandsContainer>
      
      {/* Wake word detection status */}
      {wakeWordDetected && isRecording && (
        <WakeWordStatus>
          <PulsingDot />
          <span>Listening for command...</span>
        </WakeWordStatus>
      )}
    </VoiceContainer>
  );
};

export default VoiceNavigationWithWakeWord;