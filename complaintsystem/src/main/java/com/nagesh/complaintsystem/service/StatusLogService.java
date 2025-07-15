package com.nagesh.complaintsystem.service;

 
import com.nagesh.complaintsystem.model.Complaint;
import com.nagesh.complaintsystem.model.StatusLog;
import com.nagesh.complaintsystem.repository.ComplaintRepository;
import com.nagesh.complaintsystem.repository.StatusLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class StatusLogService {

    @Autowired
    private StatusLogRepository statusLogRepository;

    @Autowired
    private ComplaintRepository complaintRepository;

    public StatusLog updateComplaintStatus(Long complaintId, String status, String updatedBy) {
        Complaint complaint = complaintRepository.findById(complaintId).orElse(null);
        if (complaint == null) return null;

        complaint.setStatus(status);
        complaintRepository.save(complaint);

        StatusLog log = new StatusLog();
        log.setComplaint(complaint);
        log.setStatus(status);
        log.setUpdatedBy(updatedBy);
        log.setUpdatedAt(LocalDateTime.now());

        return statusLogRepository.save(log);
    }

    public List<StatusLog> getLogsByComplaint(Long complaintId) {
        return statusLogRepository.findByComplaintId(complaintId);
    }
}
