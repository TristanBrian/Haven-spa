import React, { useEffect, useState } from 'react';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('http://localhost:5000/users');
            const data = await response.json();
            setUsers(data);
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h2>Registered Users</h2>
            <ul>
                {users && Object.keys(users).map((username) => (
                    <li key={username}>
                        {username} - Role: {users[username].role}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
