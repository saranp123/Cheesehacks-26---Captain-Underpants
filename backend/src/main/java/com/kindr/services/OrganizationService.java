package com.kindr.services;

import com.kindr.models.Organization;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrganizationService {

    private final List<Organization> organizations = new ArrayList<>();

    public OrganizationService() {
        organizations.add(Organization.builder()
                .id(1L)
                .name("Green Earth Initiative")
                .focusAreas(List.of("environment", "sustainability", "climate"))
                .build());
        organizations.add(Organization.builder()
                .id(2L)
                .name("Community Learning Hub")
                .focusAreas(List.of("education", "community", "youth"))
                .build());
        organizations.add(Organization.builder()
                .id(3L)
                .name("Paws & Claws Rescue")
                .focusAreas(List.of("animal-welfare", "rescue", "community"))
                .build());
    }

    public Optional<Organization> findById(Long id) {
        return organizations.stream().filter(o -> o.getId().equals(id)).findFirst();
    }
}
