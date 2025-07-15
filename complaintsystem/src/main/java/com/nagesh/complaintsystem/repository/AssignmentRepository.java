package com.nagesh.complaintsystem.repository;

 
import com.nagesh.complaintsystem.model.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    List<Assignment> findByStaffId(Long staffId); // To get assignments by staff
}
