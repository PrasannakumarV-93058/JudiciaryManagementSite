package com.fsad.JudiciaryManagementSiteBackend.Controller;

import com.fsad.JudiciaryManagementSiteBackend.DTO.CaseDisplayDTO;
import com.fsad.JudiciaryManagementSiteBackend.DTO.UserDisplayDTO;
import com.fsad.JudiciaryManagementSiteBackend.Repository.CaseRepository;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/cases")
public class CaseController {

	@Autowired
	private CaseRepository caseRepository;

	@Operation(summary = "Get all cases with unified role display")
	@GetMapping("/display")
	public List<CaseDisplayDTO> getAllCasesWithDisplay() {
		return caseRepository.findAll().stream().map(c -> {
			List<UserDisplayDTO> advocates = List.of(
					new UserDisplayDTO(
							c.getLawyer().getId(),
							c.getLawyer().getFullName(),
							"ADVOCATE",
							c.getLawyer().getEmail()
					),
					new UserDisplayDTO(
							c.getProsecutor().getId(),
							c.getProsecutor().getFullName(),
							"ADVOCATE",
							c.getProsecutor().getEmail()
					)
			);

			List<UserDisplayDTO> clients = List.of(
					new UserDisplayDTO(
							c.getPlaintiff().getId(),
							c.getPlaintiff().getFullName(),
							"CLIENT",
							c.getPlaintiff().getEmail()
					),
					new UserDisplayDTO(
							c.getOpponent().getId(),
							c.getOpponent().getFullName(),
							"CLIENT",
							c.getOpponent().getEmail()
					)
			);

			return new CaseDisplayDTO(
					c.getId(),
					c.getCategory(),
					c.getStatus(),
					c.getStartDate(),
					c.getNextHearing(),
					c.getJudge() != null ? c.getJudge().getFullName() : "Not Assigned",
					advocates,
					clients
			);
		}).collect(Collectors.toList());
	}
}
