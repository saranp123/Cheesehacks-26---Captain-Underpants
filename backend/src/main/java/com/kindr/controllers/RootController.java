package com.kindr.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class RootController {

    @GetMapping({"", "/"})
    public Map<String, Object> root() {
        return Map.of(
                "app", "KINDR",
                "message", "Micro-volunteering API",
                "apiBase", "/api",
                "endpoints", Map.of(
                        "users", "GET /api/users/{id}",
                        "organizations", "GET /api/organizations/{id}",
                        "opportunities", "GET /api/opportunities, POST /api/opportunities",
                        "match", "GET /api/match/{userId}/{opportunityId}"
                )
        );
    }
}
