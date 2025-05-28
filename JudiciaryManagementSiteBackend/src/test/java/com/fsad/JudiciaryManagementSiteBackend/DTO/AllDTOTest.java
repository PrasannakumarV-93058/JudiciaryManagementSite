package com.fsad.JudiciaryManagementSiteBackend.DTO;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

public class AllDTOTest {

    @Test
    public void testCaseReport_classExists() {
        // CaseReport is an empty class, just instantiate and check not null
        CaseReport caseReport = new CaseReport();
        assertNotNull(caseReport);
    }

    @Test
    public void testJudgementSummary_gettersAndSetters() {
        Long judgementId = 123L;
        String summary = "This is a judgement summary.";
        Date judgementDate = new Date();

        JudgementSummary judgementSummary = new JudgementSummary(judgementId, summary, judgementDate);

        // Verify constructor sets fields correctly
        assertEquals(judgementId, judgementSummary.getJudgementId());
        assertEquals(summary, judgementSummary.getSummary());
        assertEquals(judgementDate, judgementSummary.getJudgementDate());

        // Test setters
        Long newId = 456L;
        String newSummary = "Updated summary.";
        Date newDate = new Date(judgementDate.getTime() + 100000L);

        judgementSummary.setJudgementId(newId);
        judgementSummary.setSummary(newSummary);
        judgementSummary.setJudgementDate(newDate);

        assertEquals(newId, judgementSummary.getJudgementId());
        assertEquals(newSummary, judgementSummary.getSummary());
        assertEquals(newDate, judgementSummary.getJudgementDate());
    }

    @Test
    public void testProceedings_gettersAndSetters() {
        LocalDateTime date = LocalDateTime.now();
        String description = "Initial description";

        Proceedings proceedings = new Proceedings(date, description);

        // Verify constructor sets fields correctly
        assertEquals(date, proceedings.getDate());
        assertEquals(description, proceedings.getDescription());

        // Test setters
        LocalDateTime newDate = date.plusDays(1);
        String newDescription = "Updated description";

        proceedings.setDate(newDate);
        proceedings.setDescription(newDescription);

        assertEquals(newDate, proceedings.getDate());
        assertEquals(newDescription, proceedings.getDescription());
    }
}
