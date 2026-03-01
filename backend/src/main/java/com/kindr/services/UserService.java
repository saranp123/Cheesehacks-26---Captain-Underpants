package com.kindr.services;

import com.kindr.models.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final List<User> users = new ArrayList<>();

    public UserService() {
        users.add(User.builder()
                .id("v_10485")
                .name("Alex Chen")
                .alignmentTags(List.of("environment", "education", "animal-welfare"))
                .skills(List.of("teaching", "writing", "social-media"))
                .build());
        users.add(User.builder()
                .id("v_10486")
                .name("Sam Rivera")
                .alignmentTags(List.of("health", "community", "education"))
                .skills(List.of("data-entry", "translation", "tutoring"))
                .build());
        users.add(User.builder()
                .id("v_10487")
                .name("Jordan Lee")
                .alignmentTags(List.of("environment", "sustainability", "climate"))
                .skills(List.of("research", "writing", "outreach"))
                .build());
    }

    public Optional<User> findById(String id) {
        return users.stream().filter(u -> u.getId().equals(id)).findFirst();
    }
}
