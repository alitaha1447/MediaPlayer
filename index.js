import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import TrackPlayer from 'react-native-track-player';
// Register TrackPlayer playback service
TrackPlayer.registerPlaybackService(() => require('./src/service.js'));


// Register the main component of your app
AppRegistry.registerComponent(appName, () => App);
