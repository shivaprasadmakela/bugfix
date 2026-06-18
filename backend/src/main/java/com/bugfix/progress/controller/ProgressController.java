package com.bugfix.progress.controller;

import com.bugfix.progress.dto.UserProgressDto;
import com.bugfix.progress.service.ProgressService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    private final ProgressService progressService;

    public ProgressController(ProgressService progressService) {
        this.progressService = progressService;
    }

    @GetMapping
    public ResponseEntity<List<UserProgressDto>> getProgress(@AuthenticationPrincipal Jwt jwt) {
        return ResponseEntity.ok(progressService.getProgress(jwt.getSubject()));
    }

    @PostMapping("/complete/{lessonId}")
    public ResponseEntity<UserProgressDto> completeLesson(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable Long lessonId) {
        return ResponseEntity.ok(progressService.completeLesson(jwt.getSubject(), lessonId));
    }

    @PostMapping("/quiz/{lessonId}")
    public ResponseEntity<UserProgressDto> saveQuizScore(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable Long lessonId,
            @RequestParam int score) {
        return ResponseEntity.ok(progressService.saveQuizScore(jwt.getSubject(), lessonId, score));
    }

    @PostMapping("/reset")
    public ResponseEntity<Void> resetProgress(@AuthenticationPrincipal Jwt jwt) {
        progressService.resetProgress(jwt.getSubject());
        return ResponseEntity.ok().build();
    }
}
