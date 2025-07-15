package com.nagesh.complaintsystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nagesh.complaintsystem.model.StatusLog;
import com.nagesh.complaintsystem.service.StatusLogService;

@RestController
@RequestMapping("/api/status")
@CrossOrigin
public class StatusLogController {

    @Autowired
    private StatusLogService statusLogService;

    @PostMapping
    public StatusLog updateStatus(@RequestParam Long complaintId,
                                  @RequestParam String status,
                                  @RequestParam String updatedBy) {
        return statusLogService.updateComplaintStatus(complaintId, status, updatedBy);
    }

    @GetMapping("/{complaintId}")
    public List<StatusLog> getStatusLogs(@PathVariable Long complaintId) {
        return statusLogService.getLogsByComplaint(complaintId);
    }
}
