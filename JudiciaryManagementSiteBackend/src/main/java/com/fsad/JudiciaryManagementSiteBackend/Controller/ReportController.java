package com.fsad.JudiciaryManagementSiteBackend.Controller;

import com.fsad.JudiciaryManagementSiteBackend.DTO.CaseDisplayDTO;
import com.fsad.JudiciaryManagementSiteBackend.Service.ReportService;
import com.fsad.JudiciaryManagementSiteBackend.Entity.Case;
import com.fsad.JudiciaryManagementSiteBackend.Repository.CaseRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.net.HttpURLConnection;
import java.net.URL;
import java.io.OutputStream;
import java.io.InputStreamReader;
import java.io.BufferedReader;
import org.json.JSONObject;
import org.json.JSONArray;

@RestController
@RequestMapping("/api/reports")
@Tag(name = "Report Controller", description = "APIs for generating reports")
public class ReportController {

	@Autowired
	private ReportService reportService;

	@Autowired
	private CaseRepository caseRepository;

	// Endpoint to generate case reports
	@GetMapping("/cases")
	@Operation(summary = "Generate reports on cases and results")
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

	// Endpoint to generate AI-powered case report using Gemini and return as JSON (all cases)
	@GetMapping("/generate-gemini")
	@Operation(summary = "Generate AI-powered case report using Gemini and return as JSON")
	public ResponseEntity<?> generateGeminiReport() throws Exception {
		List<Case> cases = caseRepository.findAll();
		StringBuilder caseData = new StringBuilder();
		for (Case c : cases) {
			caseData.append("Case ID: ").append(c.getId())
					.append(", Category: ").append(c.getCategory())
					.append(", Status: ").append(c.getStatus())
					.append(", Description: ").append(c.getDescription())
					.append("\n");
		}
		String geminiSummary = callGeminiAIWithSummary(caseData.toString());
		JSONObject response = new JSONObject();
		response.put("summary", geminiSummary);
		response.put("date", java.time.LocalDate.now().toString());
		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(response.toString());
	}

	// Endpoint to generate AI-powered report for a particular case using Gemini and return as JSON
	@GetMapping("/case/{caseId}/generate-gemini")
	@Operation(summary = "Generate AI-powered report for a particular case using Gemini and return as JSON")
	public ResponseEntity<?> generateGeminiReportForCase(@PathVariable Integer caseId) throws Exception {
		Case c = caseRepository.findById(caseId)
				.orElseThrow(() -> new ReportNotFoundException("Case not found with ID: " + caseId));
		StringBuilder caseData = new StringBuilder();
		caseData.append("Case ID: ").append(c.getId())
				.append(", Category: ").append(c.getCategory())
				.append(", Status: ").append(c.getStatus())
				.append(", Description: ").append(c.getDescription())
				.append("\n");
		String geminiSummary = callGeminiAIWithSummary(caseData.toString());
		JSONObject response = new JSONObject();
		response.put("summary", geminiSummary);
		response.put("date", java.time.LocalDate.now().toString());
		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(response.toString());
	}

	// Gemini AI integration using provided API key
	private String callGeminiAIWithSummary(String input) throws Exception {
		String apiKey = ""; // <-- Use your working API key
		String endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey;
		URL url = new URL(endpoint);
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setRequestMethod("POST");
		conn.setRequestProperty("Content-Type", "application/json");
		conn.setDoOutput(true);
		JSONObject requestBody = new JSONObject();
		JSONArray contents = new JSONArray();
		JSONObject content = new JSONObject();
		// Use a more instructive prompt for Gemini
		String prompt = "You are a legal assistant AI. Given the following case details, generate a professional, well-structured paragraph summarizing the case for court records. Use all the data provided.\n\nCase Details:\n" + input;
		content.put("parts", new JSONArray().put(new JSONObject().put("text", prompt)));
		contents.put(content);
		requestBody.put("contents", contents);
		try (OutputStream os = conn.getOutputStream()) {
			byte[] inputBytes = requestBody.toString().getBytes("utf-8");
			os.write(inputBytes, 0, inputBytes.length);
		}
		StringBuilder response = new StringBuilder();
		int responseCode = conn.getResponseCode();
		BufferedReader br;
		if (responseCode >= 200 && responseCode < 300) {
			br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));
		} else {
			// Print error stream for debugging
			br = new BufferedReader(new InputStreamReader(conn.getErrorStream(), "utf-8"));
			String errorLine;
			StringBuilder errorResponse = new StringBuilder();
			while ((errorLine = br.readLine()) != null) {
				errorResponse.append(errorLine.trim());
			}
			throw new RuntimeException("Gemini API error: " + errorResponse.toString());
		}
		String responseLine;
		while ((responseLine = br.readLine()) != null) {
			response.append(responseLine.trim());
		}
		JSONObject jsonResponse = new JSONObject(response.toString());
		String aiText = "";
		if (jsonResponse.has("candidates")) {
			JSONArray candidates = jsonResponse.getJSONArray("candidates");
			if (candidates.length() > 0) {
				JSONObject candidate = candidates.getJSONObject(0);
				if (candidate.has("content")) {
					JSONObject contentObj = candidate.getJSONObject("content");
					JSONArray parts = contentObj.getJSONArray("parts");
					if (parts.length() > 0) {
						aiText = parts.getJSONObject(0).getString("text");
					}
				}
			}
		}
		// Add extra summary sentences
		StringBuilder finalText = new StringBuilder();
		finalText.append("Case Report Summary:\n");
		finalText.append(aiText).append("\n\n");
		finalText.append("---\n");
		finalText.append("This report was generated on ").append(java.time.LocalDate.now());
		finalText.append("For more details, contact the court administration.\n");
		return finalText.toString();
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
