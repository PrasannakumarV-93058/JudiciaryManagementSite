package com.fsad.JudiciaryManagementSiteBackend.DTO;


import java.time.LocalDateTime;

public class Proceedings {
	private LocalDateTime date;
	private String description;

	// Constructors, Getters, and Setters
	public Proceedings(LocalDateTime date, String description) {
		this.date = date;
		this.description = description;
	}

	public LocalDateTime getDate() {
		return date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}
