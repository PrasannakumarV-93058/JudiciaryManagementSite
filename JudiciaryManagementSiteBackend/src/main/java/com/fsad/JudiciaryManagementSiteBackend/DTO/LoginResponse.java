package com.fsad.JudiciaryManagementSiteBackend.DTO;

public class LoginReponse {

	private String token;

	public LoginResponse(String token) {
		this.token = token;
	}

	// Getter
	public String getToken() {
		return token;
	}
}

