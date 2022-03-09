import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase-config';

function AllUser() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const userCollectionRef = collection(db, 'users');
    const navigate = useNavigate();

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(userCollectionRef);
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            setIsLoading(false);
        }
        getUsers();
    }, [isLoading, userCollectionRef])



    const editHandler = (id) => {
        navigate(`/user/${id}`)
    }

    return (
        <div>
            <table className="table table-bordered table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Sl No.</th>
                        <th scope="col">Email</th>
                        <th scope="col">Name</th>
                        <th scope="col">Role</th>
                        <th scope="col" className="d-flex justify-content-around">
                            <div className="">Edit</div>
                            <div className="">Delete</div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        users.map((user, id) => (
                            <tr key={id}>
                                <th scope="row">{id + 1}</th>
                                <td>{user.email}</td>
                                <td>{user.name}</td>
                                <td>{user.role}</td>
                                <td className="d-flex justify-content-around">
                                    <button type="button" className="btn btn-warning" onClick={() => editHandler(user.id)}>Edit</button>
                                    <button type="button" className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default AllUser