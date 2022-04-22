import './App.css';
import Search from "./search/search"
import { Link, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <>
            <center>
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">

                    <a class="navbar-brand" href="main.html">ATLAS</a>

                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item active">
                                <Link class="nav-link" to="/blogs">Blogs <span class="sr-only">(current)</span></Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/search">Search <span class="sr-only">(current)</span></Link>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="planner.html">Trip Planner</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="about.html">About</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="SignInPage.html">
                                    <img class="sign" src="https://cdn3.iconfinder.com/data/icons/login-6/512/LOGIN-10-512.png" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </center>
            <Routes>
                <Route path='search' element={<Search />}></Route>
            </Routes>
        </>
    );
}

export default App;
