package com.kindr.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MatchResult {
    private Long userId;
    private Long opportunityId;
    private int fitScore;  // 0-100
    private String message;
}
