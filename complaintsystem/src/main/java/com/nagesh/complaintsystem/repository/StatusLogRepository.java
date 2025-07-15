package com.nagesh.complaintsystem.repository;

 
import com.nagesh.complaintsystem.model.StatusLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StatusLogRepository extends JpaRepository<StatusLog, Long> {
    List<StatusLog> findByComplaintId(Long complaintId); // To get status history of a complaint
}
