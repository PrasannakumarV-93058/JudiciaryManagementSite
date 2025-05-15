package com.fsad.JudiciaryManagementSiteBackend.Service;

import com.fsad.JudiciaryManagementSiteBackend.Entity.Case;
import com.fsad.JudiciaryManagementSiteBackend.Repository.CaseRepository;
import com.fsad.JudiciaryManagementSiteBackend.DTO.CaseStatusUpdate;
import com.fsad.JudiciaryManagementSiteBackend.DTO.Proceedings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CaseService {

	@Autowired
	private CaseRepository caseRepository;

	// Method to create a new case
	public Case createCase(Case newCase) {
		// Additional validation or business logic can go here if needed
		return caseRepository.save(newCase);
	}

	// Method to update an existing case
	public Case updateCase(Integer caseId, Case updatedCase) {
		Optional<Case> existingCaseOpt = caseRepository.findById(caseId);

		if (existingCaseOpt.isPresent()) {
			Case existingCase = existingCaseOpt.get();

			// Update fields based on the provided 'updatedCase'
			existingCase.setCategory(updatedCase.getCategory());
			existingCase.setStatus(updatedCase.getStatus());
			existingCase.setStartDate(updatedCase.getStartDate());
			existingCase.setNextHearing(updatedCase.getNextHearing());
			existingCase.setJudge(updatedCase.getJudge()); // Updating judge, lawyer, etc.
			existingCase.setLawyer(updatedCase.getLawyer());
			existingCase.setPlaintiff(updatedCase.getPlaintiff());
			existingCase.setOpponent(updatedCase.getOpponent());

			// Save the updated case
			return caseRepository.save(existingCase);
		} else {
			throw new RuntimeException("Case not found with id: " + caseId);
		}
	}

	// Method to upload proceedings for a case
	public Case uploadProceedings(Integer caseId, Proceedings proceedings) {
		Optional<Case> caseOpt = caseRepository.findById(caseId);

		if (caseOpt.isPresent()) {
			Case caseEntity = caseOpt.get();

			// You may want to associate the proceedings with the case. For now, we assume you're just logging it.
			// Add the logic for storing proceedings in a database or any other storage solution.

			// For this example, we will just print the proceedings or return case as is
			// Add the actual proceedings logic here
			System.out.println("Proceedings for case " + caseId + ": " + proceedings.getDescription());

			return caseEntity;
		} else {
			throw new RuntimeException("Case not found with id: " + caseId);
		}
	}

	// Method to update case status and judgment
	public Case updateCaseStatus(Integer caseId, CaseStatusUpdate statusUpdate) {
		Optional<Case> caseOpt = caseRepository.findById(caseId);

		if (caseOpt.isPresent()) {
			Case caseEntity = caseOpt.get();

			// Update the status and judgment
			caseEntity.setStatus(statusUpdate.getStatus());
			caseEntity.setEndDate(statusUpdate.getJudgment() != null ? caseEntity.getEndDate() : null);
			// Assuming that a judgment could affect the 'endDate', you can add your logic here

			// Save the updated case status
			return caseRepository.save(caseEntity);
		} else {
			throw new RuntimeException("Case not found with id: " + caseId);
		}
	}
}
