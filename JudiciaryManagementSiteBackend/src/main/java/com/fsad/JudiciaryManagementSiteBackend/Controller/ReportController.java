package com.fsad.JudiciaryManagementSiteBackend.Controller;

import com.fsad.JudiciaryManagementSiteBackend.DTO.CaseDisplayDTO;
import com.fsad.JudiciaryManagementSiteBackend.Service.ReportService;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@Tag(name = "Report Controller", description = "APIs for generating reports")
public class ReportController {

	@Autowired
	private ReportService reportService;

	// Endpoint to generate case reports
	@GetMapping("/cases")
	@Operation(summary = "Generate reports on cases and results")
	@PreAuthorize("hasRole('Admin') or hasRole('Clerk')")  // Restrict to specific roles
	public List<CaseDisplayDTO> getCaseReports() {
		try {
			List<CaseDisplayDTO> caseReports = reportService.generateCaseDisplayReports();
			if (caseReports.isEmpty()) {
				throw new ReportNotFoundException("No case reports available.");
			}
			return caseReports;
		} catch (Exception e) {
			throw new ReportGenerationException("Error generating case reports: " + e.getMessage());
		}
	}

	// Endpoint to get summarized judgments
	@GetMapping("/judgements")
	@Operation(summary = "Get summarized list of judgments")
	@PreAuthorize("hasRole('CLERK')")  // Restrict to specific roles
	public List<CaseDisplayDTO> getJudgementSummaries() {
		try {
			List<CaseDisplayDTO> judgementSummaries = reportService.generateCaseDisplayReports();
			if (judgementSummaries.isEmpty()) {
				throw new ReportNotFoundException("No judgment summaries available.");
			}
			return judgementSummaries;
		} catch (Exception e) {
			throw new ReportGenerationException("Error generating judgment summaries: " + e.getMessage());
		}
	}

	// Custom exception handler to handle "No Reports Found"
	@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Report not found")
	public static class ReportNotFoundException extends RuntimeException {
		public ReportNotFoundException(String message) {
			super(message);
		}
	}

	// Custom exception handler for any report generation failure
	@ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR, reason = "Error generating report")
	public static class ReportGenerationException extends RuntimeException {
		public ReportGenerationException(String message) {
			super(message);
		}
	}
}
