package com.fsad.JudiciaryManagementSiteBackend.Controller;

import com.fsad.JudiciaryManagementSiteBackend.Entity.Case;
import com.fsad.JudiciaryManagementSiteBackend.Entity.User;
import com.fsad.JudiciaryManagementSiteBackend.Service.CaseService;
import com.fsad.JudiciaryManagementSiteBackend.Service.UserService;
import com.fsad.JudiciaryManagementSiteBackend.DTO.CaseStatusUpdate;
import com.fsad.JudiciaryManagementSiteBackend.DTO.Proceedings;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/clerks")
@Tag(name = "Clerk Controller", description = "APIs for Clerk operations")
public class ClerkController {

	@Autowired
	private CaseService caseService;

	@Autowired
	private UserService userService;

	@PreAuthorize("hasRole('CLERK')")
	@PostMapping("/cases")
	@Operation(summary = "Create a new case")
	public Case createCase(@RequestBody Case newCase) {
		return caseService.createCase(newCase);
	}

	@PreAuthorize("hasRole('CLERK')")
	@PutMapping("/cases/{caseId}")
	@Operation(summary = "Update case information")
	public Case updateCase(@PathVariable Integer caseId, @RequestBody Case updatedCase) {
		return caseService.updateCase(caseId, updatedCase);
	}

	@PreAuthorize("hasRole('CLERK')")
	@PostMapping("/judges")
	@Operation(summary = "Add or update judge details")
	public User addOrUpdateJudge(@RequestBody User judge) {
		return userService.addOrUpdateJudge(judge);
	}

	@PreAuthorize("hasRole('CLERK')")
	@PostMapping("/lawyers")
	@Operation(summary = "Add or update lawyer details")
	public User addOrUpdateLawyer(@RequestBody User lawyer) {
		return userService.addOrUpdateLawyer(lawyer);
	}

	@PreAuthorize("hasRole('CLERK')")
	@PostMapping("/cases/{caseId}/proceedings")
	@Operation(summary = "Upload day-wise proceedings for a case")
	public Case uploadProceedings(@PathVariable Integer caseId, @RequestBody Proceedings proceedings) {
		return caseService.uploadProceedings(caseId, proceedings);
	}

	@PreAuthorize("hasRole('CLERK')")
	@PutMapping("/cases/{caseId}/status")
	@Operation(summary = "Update status and judgment of a case")
	public Case updateCaseStatus(@PathVariable Integer caseId, @RequestBody CaseStatusUpdate statusUpdate) {
		return caseService.updateCaseStatus(caseId, statusUpdate);
	}
}
