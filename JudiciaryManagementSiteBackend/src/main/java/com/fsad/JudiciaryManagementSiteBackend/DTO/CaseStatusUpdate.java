package com.fsad.JudiciaryManagementSiteBackend.DTO;

public class CaseStatusUpdate {
	private String status;
	private String judgment;

	// Constructors, Getters, and Setters
	public CaseStatusUpdate(String status, String judgment) {
		this.status = status;
		this.judgment = judgment;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getJudgment() {
		return judgment;
	}

	public void setJudgment(String judgment) {
		this.judgment = judgment;
	}
}
