package com.nagesh.complaintsystem.repository;
 
import org.springframework.data.jpa.repository.JpaRepository;

import com.nagesh.complaintsystem.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
