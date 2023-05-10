import React from 'react';
import './App.css';
import {AuthScreen} from "./screens/AuthScreen/AuthScreen";
import {ProfileScreen} from "./screens/ProfileScreen/ProfileScreen";
import {FriendsScreen} from "./screens/FriendsScreen/FriendsScreen";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import {PostsScreen} from "./screens/PostsScreen/PostsScreen";

function App() {
  return (
      <Router>
        <Routes>
            <Route path="/" element={<AuthScreen />}/>
            <Route path="/friends" element={<FriendsScreen />}/>
            <Route path="/profile/:id" element={<ProfileScreen/>}/>
            <Route path="/posts" element={<PostsScreen />}/>
        </Routes>
      </Router>
  );
}

export default App;
