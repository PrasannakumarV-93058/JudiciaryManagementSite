package com.fsad.JudiciaryManagementSiteBackend.Controller;

import com.fsad.JudiciaryManagementSiteBackend.DTO.CaseDisplayDTO;
import com.fsad.JudiciaryManagementSiteBackend.DTO.UserDisplayDTO;
import com.fsad.JudiciaryManagementSiteBackend.Entity.Case;
import com.fsad.JudiciaryManagementSiteBackend.Entity.User;
import com.fsad.JudiciaryManagementSiteBackend.Repository.CaseRepository;
import com.fsad.JudiciaryManagementSiteBackend.Repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/cases")
public class CaseController {

	@Autowired
	private UserRepository userRepository;

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

	@Operation(summary = "Get user details by case ID and role")
	@GetMapping("/{caseId}/user")
	public UserDisplayDTO getUserByCaseIdAndRole(
			@PathVariable Integer caseId,
			@RequestParam String role
	) {
		return caseRepository.findById(caseId).map(c -> {
			return switch (role.toUpperCase()) {
				case "LAWYER" -> mapUserToDTO(c.getLawyer(), "ADVOCATE");
				case "PROSECUTOR" -> mapUserToDTO(c.getProsecutor(), "ADVOCATE");
				case "PLAINTIFF" -> mapUserToDTO(c.getPlaintiff(), "CLIENT");
				case "OPPONENT" -> mapUserToDTO(c.getOpponent(), "CLIENT");
				case "JUDGE" -> mapUserToDTO(c.getJudge(), "JUDGE");
				default -> throw new IllegalArgumentException("Invalid role. Use LAWYER, PROSECUTOR, PLAINTIFF, OPPONENT, or JUDGE.");
			};
		}).orElseThrow(() -> new IllegalArgumentException("Case not found with ID: " + caseId));
	}

	private UserDisplayDTO mapUserToDTO(User user, String role) {
		if (user == null) {
			throw new IllegalArgumentException("User not found for the given role.");
		}
		return new UserDisplayDTO(user.getId(), user.getFullName(), role, user.getEmail());
	}

//	@PostMapping("/createcase")
//	@Operation(summary = "Create a new case")
//	public Case createCase(@RequestBody Case caseDisplayDTO) {
//		return caseRepository.save(caseDisplayDTO);
//	}

	@PostMapping("/createcase")
	@Operation(summary = "Create a new case")
	public Case createCase(@RequestBody Case caseRequest) {
		// Log the incoming request
		System.out.println("Received Case: " + caseRequest);

		caseRequest.setJudge(fetchUserById(caseRequest.getJudge()));
		caseRequest.setLawyer(fetchUserById(caseRequest.getLawyer()));
		caseRequest.setProsecutor(fetchUserById(caseRequest.getProsecutor()));
		caseRequest.setPlaintiff(fetchUserById(caseRequest.getPlaintiff()));
		caseRequest.setOpponent(fetchUserById(caseRequest.getOpponent()));
		// Validate required fields
		if (caseRequest.getCategory() == null || caseRequest.getStatus() == null) {
			throw new IllegalArgumentException("Category and Status are required fields.");
		}

		// Save the case
		return caseRepository.save(caseRequest);
	}

	private User fetchUserById(User user) {
		return user == null ? null :
				userRepository.findById(user.getId())
						.orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + user.getId()));
	}

}
