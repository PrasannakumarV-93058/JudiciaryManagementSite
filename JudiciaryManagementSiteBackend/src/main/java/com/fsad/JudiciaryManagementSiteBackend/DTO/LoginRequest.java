package com.fsad.JudiciaryManagementSiteBackend.DTO;


import lombok.Data;

@Data
public class LoginRequest {
	private String username;
	private String password;
}
