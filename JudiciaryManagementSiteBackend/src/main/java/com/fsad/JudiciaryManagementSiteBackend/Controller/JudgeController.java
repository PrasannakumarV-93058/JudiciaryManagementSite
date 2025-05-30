package com.fsad.JudiciaryManagementSiteBackend.Controller;

import com.fsad.JudiciaryManagementSiteBackend.DTO.IdFetchDTO;
import com.fsad.JudiciaryManagementSiteBackend.Entity.Case;
import com.fsad.JudiciaryManagementSiteBackend.Entity.Hearing;
import com.fsad.JudiciaryManagementSiteBackend.Repository.JudgeRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/judges")
@Tag(name = "Judge Controller", description = "APIs for Judge operations")
public class JudgeController {

	@Autowired
	private JudgeRepository judgeRepository;

	@PreAuthorize("hasRole('CLERK')")
	@GetMapping
	public List<IdFetchDTO> getAllJudges() {
		return judgeRepository.getAllJudges();
	}

	@PreAuthorize("hasRole('CLERK')")
	@GetMapping("/{judgeId}/cases")
	@Operation(summary = "Get all cases assigned to a judge")
	public List<Case> getCasesByJudge(@PathVariable Integer judgeId) {
		return judgeRepository.getCasesByJudgeId(judgeId);
	}

	@PreAuthorize("hasRole('CLERK')")
	@GetMapping("/{judgeId}/cases/{caseId}")
	@Operation(summary = "Get details of a specific case assigned to a judge")
	public Case getCaseDetails(@PathVariable Integer judgeId, @PathVariable Integer caseId) {
		return judgeRepository.getCaseDetailsForJudge(judgeId, caseId);
	}

	@PreAuthorize("hasRole('CLERK')")
	@PostMapping("/{judgeId}/cases/{caseId}/schedule-hearing")
	@Operation(summary = "Schedule next hearing for a pending case")
	public Case scheduleNextHearing(@PathVariable Integer judgeId, @PathVariable Integer caseId,
									@RequestBody Hearing hearingRequest) {
		return judgeRepository.scheduleNextHearing(judgeId, caseId, hearingRequest);
	}
}
