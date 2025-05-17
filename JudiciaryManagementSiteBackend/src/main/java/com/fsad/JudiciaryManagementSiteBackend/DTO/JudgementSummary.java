package com.fsad.JudiciaryManagementSiteBackend.DTO;

import java.util.Date;



public class JudgementSummary {

	private Long judgementId;
	private String summary;
	private Date judgementDate;

	// Constructor
	public JudgementSummary(Long judgementId, String summary, Date judgementDate) {
		this.judgementId = judgementId;
		this.summary = summary;
		this.judgementDate = judgementDate;
	}

	// Getters and Setters
	public Long getJudgementId() {
		return judgementId;
	}

	public void setJudgementId(Long judgementId) {
		this.judgementId = judgementId;
	}

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public Date getJudgementDate() {
		return judgementDate;
	}

	public void setJudgementDate(Date judgementDate) {
		this.judgementDate = judgementDate;
	}
}
