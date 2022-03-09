import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../firebase-config';

function EditUser() {
    const param = useParams();
    const navigate = useNavigate();
    const [targetUser, setTargetUser] = useState({});
    const [userRole, setUserRole] = useState('user');
    const docRef = doc(db, 'users', param.id);

    useEffect(() => {
        const getUser = async () => {
            const docSnap = await getDoc(docRef);
            setTargetUser(docSnap.data());
        }
        getUser();
    }, [docRef]);

    

    const roleHandler = (e) => {
        setUserRole(e.target.value);
    }

    const updateHandler = async () => {
        const userDoc = doc(db, 'users', param.id);
        await updateDoc(userDoc, {
            role: userRole
        });
        navigate(`/all-users`);
    }

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="container-edit d-flex flex-column justify-content-center align-items-start">
                <label htmlFor="" className="p-2">Name: {targetUser.name}</label>
                <label htmlFor="" className="p-2">Email: {targetUser.email}</label>
                <div className="d-flex justify-content-between w-75 p-2">
                    <label htmlFor="">Role: </label>
                    <select name="cars" id="cars" onChange={roleHandler}>
                        {targetUser.role === "admin" ? (
                            <>
                                <option value="admin">admin</option>
                                <option value="user">user</option>
                            </>
                        ) : (
                            <>
                                <option value="user">user</option>
                                <option value="admin">admin</option>
                            </>
                        )}

                    </select>
                </div>
                <div className="d-flex justify-content-center w-100 p-2">
                    <button type="button" className="btn btn-info" onClick={updateHandler}>Update</button>
                </div>

            </div>
        </div>
    )
}

export default EditUser