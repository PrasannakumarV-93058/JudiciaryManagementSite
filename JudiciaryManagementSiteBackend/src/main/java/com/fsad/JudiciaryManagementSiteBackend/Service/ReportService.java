package com.fsad.JudiciaryManagementSiteBackend.Service;

import com.fsad.JudiciaryManagementSiteBackend.DTO.CaseDisplayDTO;
import com.fsad.JudiciaryManagementSiteBackend.DTO.UserDisplayDTO;
import com.fsad.JudiciaryManagementSiteBackend.Entity.Case;
import com.fsad.JudiciaryManagementSiteBackend.Entity.User;
import com.fsad.JudiciaryManagementSiteBackend.Repository.CaseRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReportService {

	@Autowired
	private CaseRepository caseRepository;



	// Method to generate a list of case reports
	public List<CaseDisplayDTO> generateCaseDisplayReports() {
		List<Case> cases = caseRepository.findAll();

		// Convert each Case entity to a CaseDisplayDTO
		return cases.stream()
				.map(caseEntity -> new CaseDisplayDTO(
						caseEntity.getId(),
						caseEntity.getCategory(),
						caseEntity.getStatus(),
						caseEntity.getStartDate(),
						caseEntity.getNextHearing(),
						caseEntity.getJudge() != null ? caseEntity.getJudge().getFullName() : null,
						mapUsersToDisplayDTO(caseEntity.getAdvocates()), // List of UserDisplayDTO for advocates
						mapUsersToDisplayDTO(caseEntity.getClients())   // List of UserDisplayDTO for clients
				))
				.collect(Collectors.toList());
	}

	private List<UserDisplayDTO> mapUsersToDisplayDTO(List<User> users) {
		return users.stream()
				.map(user -> new UserDisplayDTO(user.getId(), user.getFullName(), user.getRole(), user.getEmail()))
				.collect(Collectors.toList());
	}
}
