package com.nagesh.complaintsystem.service;

 
import com.nagesh.complaintsystem.model.Assignment;
import com.nagesh.complaintsystem.model.Complaint;
import com.nagesh.complaintsystem.model.User;
import com.nagesh.complaintsystem.repository.AssignmentRepository;
import com.nagesh.complaintsystem.repository.ComplaintRepository;
import com.nagesh.complaintsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private UserRepository userRepository;

    public Assignment assignComplaint(Long complaintId, Long staffId) {
        Complaint complaint = complaintRepository.findById(complaintId).orElse(null);
        User staff = userRepository.findById(staffId).orElse(null);

        if (complaint == null || staff == null) return null;

        complaint.setStatus("Assigned");
        complaintRepository.save(complaint);

        Assignment assignment = new Assignment();
        assignment.setComplaint(complaint);
        assignment.setStaff(staff);
        assignment.setAssignedAt(LocalDateTime.now());

        return assignmentRepository.save(assignment);
    }

    public List<Assignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }

    public List<Assignment> getAssignmentsByStaff(Long staffId) {
        return assignmentRepository.findByStaffId(staffId);
    }
}
