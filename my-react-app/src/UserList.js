import React, { useEffect, useState } from 'react';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('http://localhost:5000/api/users');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json().catch(error => {
                console.error('Error parsing JSON:', error);
            });

            setUsers(data);
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h2>Registered Users</h2>
            <ul>
                {users && users.map((user) => (
                    <li key={`${user.username}-${user.role}`}>

                        {user.username} - Role: {user.role} 
                        {user.expertise && ` (${user.expertise})`}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
