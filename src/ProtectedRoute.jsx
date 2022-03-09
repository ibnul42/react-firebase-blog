import React, { useContext } from 'react'
import AllUser from './Admin/AllUser';
import GoogleContext from './Context/GoogleContext'
import NotFound from './pages/NotFound';

function ProtectedRoute({ children }) {
    const { loggedUser } = useContext(GoogleContext);
    
        if(loggedUser.role === 'admin') {
            return <AllUser />
        } else {
            return <NotFound />
        }
    
}

export default ProtectedRoute