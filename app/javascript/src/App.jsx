import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import PostIndex from './pages/PostIndex';
import PostShow from './pages/PostShow';
import PostForm from './pages/PostForm';

function App({ userId }) {
    return (
        <div className="react-app">
            <Routes>
                <Route path="/organisations/:organisationId/posts" element={<PostIndex userId={userId}  />} />
                <Route path="/organisations/:organisationId/posts/new" element={<PostForm userId={userId} isNew={true} />} />
                <Route path="/organisations/:organisationId/posts/:id" element={<PostShow userId={userId} />} />
                <Route path="/organisations/:organisationId/posts/:id/edit" element={<PostForm userId={userId} isNew={false} />} />
            </Routes>
        </div>
    );
}

export default App;


