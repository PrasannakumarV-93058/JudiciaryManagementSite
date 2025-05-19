package com.fsad.JudiciaryManagementSiteBackend.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class IdFetchDTO {
	private Integer id;
	private String fullName;
}
