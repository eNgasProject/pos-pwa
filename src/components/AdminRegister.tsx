// src/components/AdminRegister.tsx
import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { db } from "../db";

const AdminRegister: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    store_id: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await db.users.add({
        user_id: Math.floor(Math.random() * 1000000), // Temporary ID
        username: formData.username,
        email: formData.email,
        password: formData.password, // Should be hashed in production
        store_id: Number(formData.store_id) || undefined,
        roles: ["admin"],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        sync_status: "pending",
      });
      alert("Admin registered successfully!");
      setFormData({ username: "", email: "", password: "", store_id: "" });
    } catch (error) {
      console.error("Error registering admin:", error);
      alert("Registration failed.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Admin Registration
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Store ID"
            name="store_id"
            type="number"
            value={formData.store_id}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AdminRegister;