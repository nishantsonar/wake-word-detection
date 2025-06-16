import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import icon from "../assets/assetsManager";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

// Constants
const WAKE_WORD_DELAY = 100;
const RECORDING_DURATION = 3000;
const CONST_WAKE_WORD="bhashini";
const ROUTEMAP = {
  about: "/about-bhashini",
  services: "/services",
  sahyogi: "/sahyogi",
  pravakta: "/pravakta",
  prayog: "/parikshan-app",
  bhashadaan: "/bhashadaan/en/home",
  home: "/",
  unknown: "/",
};

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
    B: 1,
    F: 1,
    P: 1,
    V: 1,
    C: 2,
    G: 2,
    J: 2,
    K: 2,
    Q: 2,
    S: 2,
    X: 2,
    Z: 2,
    D: 3,
    T: 3,
    L: 4,
    M: 5,
    N: 5,
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

function isWakeWordMatch(text, wakeWord = CONST_WAKE_WORD, threshold = 0.65) {
  // Split the text into words
  const words = text.toLowerCase().split(/\s+/);

  // Calculate similarity score for each word
  for (const word of words) {
    if (word.length < 3) continue; // Skip very short words

    // 1. Direct match
    if (word === wakeWord) return true;

    // 2. Levenshtein distance similarity
    const maxLength = Math.max(word.length, wakeWord.length);
    const distance = levenshteinDistance(word, wakeWord);
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
        (maxLength - levenshteinDistance(variation, wakeWord)) / maxLength;
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

function VoiceNavigation() {
  // States
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [res, setRes] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [wakeWordDetected, setWakeWordDetected] = useState(false);
  const [isListeningForCommand, setIsListeningForCommand] = useState(false);
  const [detectedWakeWord, setDetectedWakeWord] = useState("");

  // Refs
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const abortControllerRef = useRef(new AbortController());

  // Hooks
  const navigate = useNavigate();
  const location = useLocation();
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  // Initialize wake word detection
  const startWakeWordDetection = () => {
    if (!browserSupportsSpeechRecognition) {
      console.error("Browser doesn't support speech recognition.");
      return;
    }
    console.log("Started listening for wake word...");
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-IN",
      interimResults: true,
    });
  };


  // when page load then the user click on the page to play the audio
  // useEffect(() => {
  //   const audio = new Audio(AudioDatas);
  //   audio.preload = "auto";
  
  //   const tryPlay = () => {
  //     audio.play().catch(error => {
  //       console.warn("Still blocked:", error);
  //     });
  
  //     // Remove listener after first interaction
  //     window.removeEventListener("click", tryPlay);
  //   };
  
  //   // Attach one-time user interaction listener
  //   window.addEventListener("click", tryPlay);
  
  //   // Cleanup
  //   return () => {
  //     audio.pause();
  //     audio.src = "";
  //     window.removeEventListener("click", tryPlay);
  //   };
  // }, []);
  
  
  // Start wake word detection on mount and location change
  useEffect(() => {
    startWakeWordDetection();
    return () => {
      SpeechRecognition.stopListening();
    };
  }, [browserSupportsSpeechRecognition, location]);

  // Reset states on location change
  useEffect(() => {
    resetAllStates();
  }, [location]);

  const resetAllStates = () => {
    setWakeWordDetected(false);
    setIsListeningForCommand(false);
    setIsRecording(false);
    setIsMicrophoneOn(false);
    setDetectedWakeWord("");
    resetTranscript();
    if (mediaRecorderRef.current && isRecording) {
      stopRecording();
    }
  };

  // Handle recording start
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        chunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/wav" });
        processAudioData(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setIsMicrophoneOn(true);

      // Stop recording after RECORDING_DURATION
      setTimeout(() => {
        if (mediaRecorderRef.current?.state === "recording") {
          stopRecording();
        }
      }, RECORDING_DURATION);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  // Handle recording stop
  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      setIsRecording(false);
      setIsMicrophoneOn(false);
    }
  };

  // Process audio data
  const processAudioData = async (audioBlob) => {
    if (audioBlob) {
      setIsLoading(true);
      // console.log("Processing audio data...", audioBlob);

      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64data = reader.result;
        const audioContent = base64data.split(",")[1];

        try {
          abortControllerRef.current.abort();
          abortControllerRef.current = new AbortController();
          const payload = {
            config: {
              language: {
                sourceLanguage: "hi",
              },
              hotwords: {
                words: [],
                weight: 25.0,
              },
              audioFormat: "wav",
              postProcessors: [""],
            },
            audio: [{ audioContent }],
          };

          const response = await fetch("https://vns-prod.bhashini.co.in/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            signal: abortControllerRef.current.signal,
          });

          const data = await response.json();
          setRes(data.output[0].intent);
          console.log("API Response:", data);
        } catch (err) {
          if (err.name !== "AbortError") {
            console.error("Error processing audio:", err);
          }
        } finally {
          setIsLoading(false);
        }
      };
    }
  };

  // Handle navigation based on intent
  // Handle navigation based on intent
useEffect(() => {
  if (res) {
    const key = res.toLowerCase();
    const route = ROUTEMAP[key] || `/${res}`;
    navigate(route);
    
    // Use absolute path from the root
    const audioUrl = `/Audio/${key}.mp3`;
    console.log("Attempting to play audio:", audioUrl);
    
    const audio = new Audio(audioUrl);
    
    // Add better error handling
    audio.addEventListener('error', (e) => {
      console.error(`Audio error for ${audioUrl}:`, e);
    });
    
    // Play the audio
    audio.play().catch((error) => {
      console.warn("Audio playback blocked:", error);
    });
    
    resetAllStates();
    setRes(null);
  }
}, [res, navigate]);


  // Handle wake word detection with dynamic similarity matching
  useEffect(() => {
    const text = transcript.toLowerCase();
    console.log("Transcript:", text);
    
    // Skip processing if already detected or recording
    if (wakeWordDetected || isRecording) return;
        console.log("Transcript:", text);

    // Check for wake word with our similarity function
    if (isWakeWordMatch(text, CONST_WAKE_WORD)) {
      console.log("Wake word detected in:", text);
      setWakeWordDetected(true);

      // Try to extract the actual detected variant for debugging
      const words = text.toLowerCase().split(/\s+/);
      for (const word of words) {
        if (levenshteinDistance(word, CONST_WAKE_WORD) <= 3) {
          setDetectedWakeWord(word);
          break;
        }
      }

      SpeechRecognition.stopListening();
      resetTranscript();
      setTimeout(() => {
        startRecording();
        setIsListeningForCommand(true);
      }, WAKE_WORD_DELAY);
    }
  }, [transcript, wakeWordDetected, isRecording]);

  // Handle info button click
  const handleInfoClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowModal(!showModal);
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showModal && !event.target.closest(".modal-container")) {
        setShowModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showModal]);

  return (
    <div className="relative">
      <div className="flex items-center justify-end">
        <span className="w-6 h-6 me-3">
          <svg
            width="8"
            className="w-full h-full"
            height="9"
            viewBox="0 0 8 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.74505 4.64355C1.64503 4.65437 1.56493 4.7609 1.57509 4.86743C1.71496 6.12415 2.66513 7.07246 3.82559 7.16823V8.09494H2.60502C2.49483 8.09494 2.41513 8.19065 2.41513 8.29717C2.41513 8.4037 2.505 8.49941 2.60502 8.49941H5.42554C5.53572 8.49941 5.61542 8.4037 5.61542 8.29717C5.61542 8.19065 5.52556 8.09494 5.42554 8.09494H4.20537V7.16823C5.36582 7.07252 6.31603 6.11377 6.45586 4.86701C6.46602 4.76048 6.3957 4.65395 6.28591 4.64313C6.18588 4.63231 6.08586 4.70721 6.0757 4.82414C5.95575 5.93225 5.07587 6.77414 4.01545 6.77414C2.96522 6.77414 2.07522 5.93274 1.95479 4.82456C1.94503 4.71804 1.84507 4.63273 1.74505 4.64355Z"
              fill="white"
            />
            <path
              d="M4.01441 6.26339C4.89469 6.26339 5.61477 5.49647 5.61477 4.55894V2.20445C5.61477 1.26692 4.89469 0.5 4.01441 0.5C3.13414 0.5 2.41406 1.26692 2.41406 2.20445V4.55894C2.41406 5.50687 3.13414 6.26339 4.01441 6.26339ZM2.79425 2.20445C2.79425 1.4908 3.34437 0.904914 4.01441 0.904914C4.68446 0.904914 5.23458 1.49082 5.23458 2.20445V2.22567L4.01441 2.22609C3.90423 2.22609 3.82453 2.3218 3.82453 2.42832C3.82453 2.54568 3.9144 2.63056 4.01441 2.63056H5.23458V3.17402H4.01441C3.90423 3.17402 3.82453 3.26973 3.82453 3.37626C3.82453 3.49361 3.9144 3.57849 4.01441 3.57849H5.23458V4.12195H4.01441C3.90423 4.12195 3.82453 4.21766 3.82453 4.32419C3.82453 4.44154 3.9144 4.52642 4.01441 4.52642H5.23458V4.54764C5.23458 5.2613 4.68446 5.84718 4.01441 5.84718C3.34437 5.84718 2.79425 5.26128 2.79425 4.54764V2.20445Z"
              fill="white"
            />
            <path
              d="M0.754072 5.01636C0.804083 5.01636 0.854093 4.99513 0.88418 4.95227C0.954117 4.87779 0.954117 4.75004 0.88418 4.66473C0.56419 4.32393 0.38407 3.86577 0.38407 3.38639C0.38407 2.89619 0.56419 2.44886 0.88418 2.10805C0.954117 2.03357 0.954117 1.90582 0.88418 1.82051C0.814243 1.74603 0.694298 1.74603 0.614201 1.82051C0.224275 2.2358 0.00390625 2.80049 0.00390625 3.38637C0.00390625 3.97226 0.223875 4.53698 0.614201 4.95223C0.664212 4.99509 0.714223 5.01636 0.754072 5.01636Z"
              fill="white"
            />
            <path
              d="M1.11713 4.4311C1.15699 4.47354 1.207 4.49518 1.24724 4.49518C1.29725 4.49518 1.34727 4.47396 1.37735 4.4311C1.44729 4.35661 1.44729 4.22887 1.37735 4.14356C1.18747 3.94132 1.08745 3.675 1.08745 3.38704C1.08745 3.0995 1.18747 2.83318 1.37735 2.63052C1.44729 2.55603 1.44729 2.42828 1.37735 2.34297C1.30741 2.26849 1.18747 2.26849 1.10737 2.34297C0.577176 2.91847 0.57717 3.85553 1.11713 4.4311Z"
              fill="white"
            />
            <path
              d="M1.61215 3.90907C1.652 3.95152 1.70202 3.97316 1.74226 3.97316C1.78211 3.97316 1.84228 3.95193 1.87237 3.90907C1.94231 3.83458 1.94231 3.70684 1.87237 3.62153C1.75242 3.49378 1.75242 3.28073 1.87237 3.15298C1.94231 3.07849 1.94231 2.95074 1.87237 2.86544C1.80243 2.79095 1.68249 2.79095 1.60239 2.86544C1.47228 3.00401 1.40235 3.18502 1.40235 3.38725C1.40195 3.57909 1.48204 3.77093 1.61215 3.90907Z"
              fill="white"
            />
            <path
              d="M7.13253 4.66628C7.06259 4.74077 7.06259 4.86851 7.13253 4.95382C7.17238 4.99627 7.22239 5.0179 7.26264 5.0179C7.30249 5.0179 7.36266 4.99668 7.39274 4.95382C8.20308 4.09077 8.20308 2.67433 7.39274 1.81124C7.32281 1.73675 7.20286 1.73675 7.12277 1.81124C7.05283 1.88572 7.05283 2.01347 7.12277 2.09878C7.80261 2.81285 7.8026 3.96298 7.13253 4.66628Z"
              fill="white"
            />
            <path
              d="M6.93806 3.38708C6.93806 3.67462 6.83803 3.94094 6.64815 4.1436C6.57821 4.21809 6.57821 4.34583 6.64815 4.43114C6.688 4.47359 6.73802 4.49522 6.77826 4.49522C6.81811 4.49522 6.87828 4.474 6.90837 4.43114C7.44833 3.85606 7.44833 2.91855 6.90837 2.34297C6.83843 2.26849 6.71849 2.26849 6.63839 2.34297C6.56845 2.41746 6.56845 2.54521 6.63839 2.63052C6.83804 2.83316 6.93806 3.09953 6.93806 3.38708Z"
              fill="white"
            />
            <path
              d="M6.14815 3.90907C6.18801 3.95152 6.23802 3.97316 6.27826 3.97316C6.32827 3.97316 6.37828 3.95193 6.40837 3.90907C6.53848 3.7705 6.60841 3.58949 6.60841 3.38725C6.60841 3.19542 6.53848 3.00358 6.40837 2.86544C6.33843 2.79095 6.21849 2.79095 6.13839 2.86544C6.06845 2.93992 6.06845 3.06767 6.13839 3.15298C6.25834 3.28073 6.25834 3.49378 6.13839 3.62153C6.07822 3.69602 6.07822 3.82418 6.14815 3.90907Z"
              fill="white"
            />
          </svg>
        </span>
        <span className="text-[15px]">
          Say &quot;BHASHINI&quot; to Navigate through voice.
        </span>

        {/* Wake word status */}
        {wakeWordDetected && isRecording && (
          <div className="fixed top-10 left-1/2 transform -translate-x-1/2 px-4">
            <div className="flex items-center gap-4 bg-white/90 rounded-full px-6 py-2 shadow-lg">
              <img
                src={icon.soundBubble}
                className="w-8 h-8 md:w-8 md:h-8 lg:w-8 lg:h-8"
                alt="voice"
              />
              <span className="text-lg font-medium text-gray-800 whitespace-nowrap">
                BHASHINI Listening your command...
              </span>
              {/* {detectedWakeWord && (
                <span className="text-xs text-gray-500">
                  (Detected: {detectedWakeWord})
                </span>
              )} */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default VoiceNavigation;
