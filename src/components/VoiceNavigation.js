import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

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

const VoiceNavigation = ({ onNavigate, commands }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';
      
      setRecognition(recognitionInstance);
    } else {
      alert('Speech recognition is not supported in your browser. Try using Chrome.');
    }
  }, []);

  // Handle recognition results
  useEffect(() => {
    if (!recognition) return;

    const handleResult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      
      setTranscript(transcript);
      processCommand(transcript);
    };

    const handleEnd = () => {
      setIsListening(false);
    };

    const handleError = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.onresult = handleResult;
    recognition.onend = handleEnd;
    recognition.onerror = handleError;

    return () => {
      recognition.onresult = null;
      recognition.onend = null;
      recognition.onerror = null;
    };
  }, [recognition]);

  // Process the recognized command
  const processCommand = useCallback((transcript) => {
    const lowerTranscript = transcript.toLowerCase().trim();
    
    // Check if the transcript matches any command
    for (const command of commands) {
      const keywords = command.keywords.map(keyword => keyword.toLowerCase());
      
      if (keywords.some(keyword => lowerTranscript.includes(keyword))) {
        onNavigate(command.action);
        return;
      }
    }
    
    // If no command matched
    setTranscript(`Command not recognized: "${transcript}"`);
  }, [commands, onNavigate]);

  // Toggle listening state
  const toggleListening = () => {
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      recognition.start();
      setIsListening(true);
    }
  };

  return (
    <VoiceContainer>
      <StatusIndicator active={isListening} onClick={toggleListening}>
        <MicIcon>{isListening ? '⏹' : '🎤'}</MicIcon>
      </StatusIndicator>
      
      <h2>{isListening ? 'Listening...' : 'Click to speak'}</h2>
      
      <RecognitionText>
        {transcript || 'Your spoken command will appear here...'}
      </RecognitionText>
      
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
    </VoiceContainer>
  );
};

export default VoiceNavigation;