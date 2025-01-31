import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SearchForm from './components/SearchForm';
import Results from './components/Results';

function App() {
    const [flights, setFlights] = useState(null);

    return (
        <Router>
            <div>
                <h1>Flights</h1>
                <Routes>
                    <Route
                        path="/"
                        element={<SearchForm onSearch={(results) => {
                            console.log('Search results:', results); // Add this debug log
                            setFlights(results);
                        }}/>}
                    />
                    <Route path="/results" element={<Results flights={flights}/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;