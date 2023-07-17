import React, { useContext } from 'react';
import { UserContext } from './UserContext';

const UserDetails = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h2>User Details</h2>
      {user ? (
        <div>
          <h3>Name: {user.name}</h3>
          <h3>Email: {user.email}</h3>
        </div>
      ) : (
        <h3>Please sign in to view user details.</h3>
      )}
    </div>
  );
};

export default UserDetails;
