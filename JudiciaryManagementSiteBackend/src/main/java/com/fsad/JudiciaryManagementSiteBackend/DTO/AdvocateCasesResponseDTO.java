package com.fsad.JudiciaryManagementSiteBackend.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class AdvocateCasesResponseDTO {
	private UserDisplayDTO advocate;
	private List<CaseResponseDTO> cases;
}
