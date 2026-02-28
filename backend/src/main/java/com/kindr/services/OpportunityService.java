package com.kindr.services;

import com.kindr.models.Opportunity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class OpportunityService {

    private final List<Opportunity> opportunities = new ArrayList<>();
    private final AtomicLong idGenerator = new AtomicLong(4);

    public OpportunityService() {
        opportunities.add(Opportunity.builder()
                .id(1L)
                .orgId(1L)
                .title("Beach cleanup coordinator")
                .requiredTags(List.of("environment", "sustainability"))
                .requiredSkills(List.of("outreach", "writing", "organizing"))
                .build());
        opportunities.add(Opportunity.builder()
                .id(2L)
                .orgId(2L)
                .title("Remote tutoring - math & science")
                .requiredTags(List.of("education", "community"))
                .requiredSkills(List.of("tutoring", "teaching"))
                .build());
        opportunities.add(Opportunity.builder()
                .id(3L)
                .orgId(3L)
                .title("Social media volunteer")
                .requiredTags(List.of("animal-welfare", "community"))
                .requiredSkills(List.of("social-media", "writing"))
                .build());
    }

    public List<Opportunity> findAll() {
        return new ArrayList<>(opportunities);
    }

    public Optional<Opportunity> findById(Long id) {
        return opportunities.stream().filter(o -> o.getId().equals(id)).findFirst();
    }

    public Opportunity create(Opportunity opportunity) {
        Opportunity created = Opportunity.builder()
                .id(idGenerator.getAndIncrement())
                .orgId(opportunity.getOrgId())
                .title(opportunity.getTitle())
                .requiredTags(opportunity.getRequiredTags() != null ? opportunity.getRequiredTags() : List.of())
                .requiredSkills(opportunity.getRequiredSkills() != null ? opportunity.getRequiredSkills() : List.of())
                .build();
        opportunities.add(created);
        return created;
    }
}
