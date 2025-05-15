package com.fsad.JudiciaryManagementSiteBackend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDisplayDTO {
	private Integer id;
	private String fullName;
	private String role; // Display name: ADVOCATE / CLIENT / JUDGE / CLERK
	private String email;
}
