import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import Nav from './components/Nav';
import Footer from './components/Footer';

function App() {
  return (
    <div className='App'>
			<BrowserRouter>
				<Nav />
				<Routes>
					<Route exact path='/' element={<Homepage/>} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</div>
  );
}

export default App;