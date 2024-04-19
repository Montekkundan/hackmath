import React from 'react';
import { useCurrentUser } from '@/lib/hooks/use-current-user';
import { Avatar, AvatarImage } from "@/components/ui/avatar";  // Assuming Avatar components are available for displaying user images

function User() {
  const user = useCurrentUser();

  if (!user) return <div>Loading...</div>;  // Display a loading message until the user data is fetched

  return (
    <div>
      <div>Hello, {user.name}</div>
      {user.email && (
        <div>Email: {user.email}</div>
      )}
      {user.image && (
        <Avatar>
          <AvatarImage src={user.image || ""} alt="User Image" />
        </Avatar>
      )}
    </div>
  );
}

export default User;
