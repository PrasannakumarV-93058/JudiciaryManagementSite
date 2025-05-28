package com.fsad.JudiciaryManagementSiteBackend.Controller;

import com.fsad.JudiciaryManagementSiteBackend.DTO.CaseDisplayDTO;
import com.fsad.JudiciaryManagementSiteBackend.Service.ReportService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class ReportControllerTest {

    @Mock
    private ReportService reportService;

    @InjectMocks
    private ReportController reportController;

    private CaseDisplayDTO sampleReport;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        sampleReport = new CaseDisplayDTO(); // Fill fields as needed
    }

    // -----------------------------
    // Test: /cases endpoint
    // -----------------------------

    @Test
    public void testGetCaseReports_Success() {
        when(reportService.generateCaseDisplayReports()).thenReturn(List.of(sampleReport));

        List<CaseDisplayDTO> result = reportController.getCaseReports();

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(reportService, times(1)).generateCaseDisplayReports();
    }

    @Test
    public void testGetCaseReports_EmptyResult_ThrowsNotFound() {
        when(reportService.generateCaseDisplayReports()).thenReturn(Collections.emptyList());

        ReportController.ReportNotFoundException ex = assertThrows(
                ReportController.ReportNotFoundException.class,
                () -> reportController.getCaseReports());

        assertEquals("No case reports available.", ex.getMessage());
    }

    @Test
    public void testGetCaseReports_ThrowsUnexpectedError() {
        when(reportService.generateCaseDisplayReports()).thenThrow(new RuntimeException("DB connection failed"));

        ReportController.ReportGenerationException ex = assertThrows(
                ReportController.ReportGenerationException.class,
                () -> reportController.getCaseReports());

        assertTrue(ex.getMessage().contains("Error generating case reports: DB connection failed"));
    }

    // -----------------------------
    // Test: /judgements endpoint
    // -----------------------------

    @Test
    public void testGetJudgementSummaries_Success() {
        when(reportService.generateCaseDisplayReports()).thenReturn(List.of(sampleReport));

        List<CaseDisplayDTO> result = reportController.getJudgementSummaries();

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(reportService, times(1)).generateCaseDisplayReports();
    }

    @Test
    public void testGetJudgementSummaries_EmptyResult_ThrowsNotFound() {
        when(reportService.generateCaseDisplayReports()).thenReturn(Collections.emptyList());

        ReportController.ReportNotFoundException ex = assertThrows(
                ReportController.ReportNotFoundException.class,
                () -> reportController.getJudgementSummaries());

        assertEquals("No judgment summaries available.", ex.getMessage());
    }

    @Test
    public void testGetJudgementSummaries_ThrowsUnexpectedError() {
        when(reportService.generateCaseDisplayReports()).thenThrow(new RuntimeException("Null pointer"));

        ReportController.ReportGenerationException ex = assertThrows(
                ReportController.ReportGenerationException.class,
                () -> reportController.getJudgementSummaries());

        assertTrue(ex.getMessage().contains("Error generating judgment summaries: Null pointer"));
    }
}
