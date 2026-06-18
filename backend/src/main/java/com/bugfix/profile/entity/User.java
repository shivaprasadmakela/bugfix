package com.bugfix.profile.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    private String id; // Matches the Supabase Auth UUID

    @Column(unique = true)
    private String email;

    private String fullName;
    private String avatar;
    private String role;
    private String bio;

    public User() {}

    public User(String id, String email, String fullName, String avatar, String role, String bio) {
        this.id = id;
        this.email = email;
        this.fullName = fullName;
        this.avatar = avatar;
        this.role = role;
        this.bio = bio;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
}
