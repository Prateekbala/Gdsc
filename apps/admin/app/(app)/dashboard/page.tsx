"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useRouter } from 'next/navigation';
import Typography from '@mui/material/Typography';


interface User {
  name: string;
  email: string;
  id:string;
}

export default function Page() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {

    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/allusers');
        console.log(response);
        if (response.data.success) {
          setUsers(response.data.users);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  const onCardClick = (userId: string) => {
    router.push(`/allProjects/${userId}`);
  };


  return (
    <div className="flex min-h-screen flex-col md:flex-row items-center justify-evenly p-24">
      <div>
        <Typography variant="h4" component="div" gutterBottom>
          Users
        </Typography>
        {users.map((user, index) => (
          <Card key={index} sx={{ maxWidth: 345, marginBottom: 2 }} onClick={() => onCardClick(user.id)}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: {user.email}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
