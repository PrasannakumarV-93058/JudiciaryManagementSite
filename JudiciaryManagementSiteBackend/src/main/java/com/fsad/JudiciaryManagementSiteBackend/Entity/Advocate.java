package com.fsad.JudiciaryManagementSiteBackend.Entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "advocates")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Advocate {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	// References a user
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user_id;

	// References a case
	@ManyToOne
	@JoinColumn(name = "case_id")
	private Case courtCase;

	// Client (also a user)
	@ManyToOne
	@JoinColumn(name = "client_id")
	private User client;

	private Integer experienceYears;

	private Integer casesWon;

	private String result;

	private String currentCaseStatus;
}
