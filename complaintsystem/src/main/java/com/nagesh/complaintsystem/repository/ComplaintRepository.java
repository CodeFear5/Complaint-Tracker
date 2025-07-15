package com.nagesh.complaintsystem.repository;

 
import com.nagesh.complaintsystem.model.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    List<Complaint> findBySubmittedById(Long userId); // To get complaints by user
}
