import './App.css';
import { UnsplashImage } from './components/UnsplashImage';

function App() {

  return (
    <div className="App row justify-content-center">
      <div className="main-sect p-5 text-center">
        <h2 className="mb-3 title">geo-guess</h2>
        <p className="mb-3 info">Direction: Try and guess where the picture is taken</p>
        <UnsplashImage />
      </div>
    </div>
  );
}

export default App;
