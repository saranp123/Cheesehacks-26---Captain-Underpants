package com.kindr.services;

import com.kindr.models.MatchResult;
import com.kindr.models.Opportunity;
import com.kindr.models.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class MatchService {

    private final UserService userService;
    private final OpportunityService opportunityService;

    public MatchService(UserService userService, OpportunityService opportunityService) {
        this.userService = userService;
        this.opportunityService = opportunityService;
    }

    /**
     * Computes a Fit Score (0-100) by comparing the user's alignmentTags/skills
     * against the opportunity's requiredTags/requiredSkills.
     * 50% weight on tag overlap, 50% on skill overlap.
     */
    public MatchResult getFitScore(String userId, String opportunityId) {
        User user = userService.findById(userId).orElse(null);
        Opportunity opportunity = opportunityService.findById(opportunityId).orElse(null);

        if (user == null) {
            return MatchResult.builder()
                    .userId(userId)
                    .opportunityId(opportunityId)
                    .fitScore(0)
                    .message("User not found")
                    .build();
        }
        if (opportunity == null) {
            return MatchResult.builder()
                    .userId(userId)
                    .opportunityId(opportunityId)
                    .fitScore(0)
                    .message("Opportunity not found")
                    .build();
        }

        List<String> reqTags = nullToEmpty(opportunity.getRequiredTags());
        List<String> reqSkills = nullToEmpty(opportunity.getRequiredSkills());
        List<String> userTags = nullToEmpty(user.getAlignmentTags());
        List<String> userSkills = nullToEmpty(user.getSkills());

        int tagScore = computeOverlapScore(reqTags, userTags);
        int skillScore = computeOverlapScore(reqSkills, userSkills);

        int fitScore;
        String message;
        if (reqTags.isEmpty() && reqSkills.isEmpty()) {
            fitScore = 50;
            message = "No requirements specified; default score.";
        } else if (reqTags.isEmpty()) {
            fitScore = skillScore;
            message = "Match based on skills only.";
        } else if (reqSkills.isEmpty()) {
            fitScore = tagScore;
            message = "Match based on values/alignment only.";
        } else {
            fitScore = (tagScore + skillScore) / 2;
            message = String.format("Tags: %d%%, Skills: %d%%", tagScore, skillScore);
        }

        return MatchResult.builder()
                .userId(userId)
                .opportunityId(opportunityId)
                .fitScore(Math.min(100, Math.max(0, fitScore)))
                .message(message)
                .build();
    }

    private static List<String> nullToEmpty(List<String> list) {
        return list == null ? List.of() : list;
    }

    /**
     * Returns 0-100: percentage of required items that the user has.
     * Case-insensitive comparison.
     */
    private int computeOverlapScore(List<String> required, List<String> userHas) {
        if (required.isEmpty()) return 100;
        Set<String> userSet = userHas.stream()
                .map(String::toLowerCase)
                .collect(Collectors.toSet());
        long matched = required.stream()
                .map(String::toLowerCase)
                .filter(userSet::contains)
                .count();
        return (int) Math.round(100.0 * matched / required.size());
    }
}
