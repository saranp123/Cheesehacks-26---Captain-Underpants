package com.kindr.controllers;

import com.kindr.models.MatchResult;
import com.kindr.services.MatchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/match")
@CrossOrigin(origins = "http://localhost:3000")
public class MatchController {

    private final MatchService matchService;

    public MatchController(MatchService matchService) {
        this.matchService = matchService;
    }

    @GetMapping("/{userId}/{opportunityId}")
    public ResponseEntity<MatchResult> getMatch(
            @PathVariable Long userId,
            @PathVariable Long opportunityId) {
        MatchResult result = matchService.getFitScore(userId, opportunityId);
        return ResponseEntity.ok(result);
    }
}
