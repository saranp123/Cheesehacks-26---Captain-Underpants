package com.kindr.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Opportunity {
    private Long id;
    private Long orgId;
    private String title;
    private List<String> requiredTags;
    private List<String> requiredSkills;
}
