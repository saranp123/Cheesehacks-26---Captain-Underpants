package com.kindr.controllers;

import com.kindr.models.Opportunity;
import com.kindr.services.OpportunityService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/opportunities")
@CrossOrigin(origins = "http://localhost:3000")
public class OpportunityController {

    private final OpportunityService opportunityService;

    public OpportunityController(OpportunityService opportunityService) {
        this.opportunityService = opportunityService;
    }

    @GetMapping
    public List<Opportunity> getOpportunities() {
        return opportunityService.findAll();
    }

    @PostMapping
    public ResponseEntity<Opportunity> createOpportunity(@RequestBody Opportunity opportunity) {
        if (opportunity.getTitle() == null || opportunity.getTitle().isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        Opportunity created = opportunityService.create(opportunity);
        return ResponseEntity.ok(created);
    }
}
