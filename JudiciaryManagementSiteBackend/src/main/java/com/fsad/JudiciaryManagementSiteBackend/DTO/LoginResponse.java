package com.fsad.JudiciaryManagementSiteBackend.DTO;

import lombok.Data;

@Data
public class LoginResponse {

	private String token;

	public LoginResponse(String token) {
		this.token = token;
	}

	// Getter
	public String getToken() {
		return token;
	}
}

