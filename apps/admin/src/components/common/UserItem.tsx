"use client"
import React, { useState } from 'react';

interface UserItemProps {
    user: {
      id: number;
      name: string | null;
      email: string | null;
      role: string | null; // Allow role to be null
    };
    onDelete: (id: number) => void;
    onSave: (id: number, newRole: 'ADMIN' | 'USER') => void; // Specify exact string literals expected
  }
  
  const UserItem: React.FC<UserItemProps> = ({ user, onDelete, onSave }) => {
    const [role, setRole] = useState(user.role || 'USER'); // Default to 'USER' if role is null
  
    return (
      <div className="flex items-center justify-between p-2 border-b">
        <div>
          <p>{user.name ? user.name : 'No name'} ({user.email ? user.email : 'No email'})</p>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="ADMIN">Admin</option>
            <option value="USER">User</option>
          </select>
        </div>
        <div>
          <button onClick={() => onSave(user.id, role as 'ADMIN' | 'USER')} className="mr-2">Save</button>
          <button onClick={() => onDelete(user.id)} className="text-red-500">Delete</button>
        </div>
      </div>
    );
  };
  
  export default UserItem;
  
