# Voice Navigation System

A React-based web application that allows users to navigate through the interface using voice commands. This project demonstrates how to implement voice recognition and navigation in a modern web application.

## Features

- **Voice Command Navigation**: Navigate between pages using natural voice commands
- **Visual Feedback**: Clear visual indicators when voice recognition is active
- **Accessible Design**: Built with accessibility in mind
- **Responsive Interface**: Works on desktop and mobile devices
- **Command History**: Track and display voice command usage

## Demo

[Live Demo](#) (Coming soon)

## Voice Commands

The application responds to the following voice commands:

- "Go home" / "Home page" - Navigate to the Home page
- "Dashboard" / "Go to dashboard" / "Show dashboard" - Navigate to the Dashboard
- "Settings" / "Go to settings" / "Show settings" - Navigate to the Settings page
- "Profile" / "Go to profile" / "Show profile" - Navigate to the Profile page

## Technologies Used

- React
- React Router
- Styled Components
- Web Speech API
- JavaScript (ES6+)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/voice-navigation-system.git
   ```

2. Navigate to the project directory:
   ```
   cd voice-navigation-system
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open your browser and visit `http://localhost:3000`

## Browser Compatibility

The Web Speech API is supported in the following browsers:

- Chrome (desktop & Android)
- Edge
- Safari (desktop & iOS)
- Firefox (with flags enabled)

## Project Structure

```
src/
├── components/
│   ├── Navbar.js
│   └── VoiceNavigation.js
├── pages/
│   ├── Home.js
│   ├── Dashboard.js
│   ├── Settings.js
│   └── Profile.js
├── App.js
└── index.js
```

## How It Works

1. The application uses the Web Speech API's `SpeechRecognition` interface to listen for user commands
2. When a command is recognized, it is processed to determine the user's intent
3. If the command matches a known navigation command, the app navigates to the appropriate page
4. Visual feedback is provided to the user throughout this process

## Accessibility

This project is built with accessibility in mind:

- All interactive elements are keyboard accessible
- ARIA attributes are used where appropriate
- Color contrast meets WCAG standards
- Voice commands provide an alternative navigation method for users with mobility impairments

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [React Router](https://reactrouter.com/)
- [Styled Components](https://styled-components.com/)

---

Created with ❤️ by Nishant Sonar