package com.fsad.JudiciaryManagementSiteBackend.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "cases")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Case {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String category;
	private String status;
	private LocalDateTime startDate;
	private LocalDateTime endDate;
	private LocalDateTime nextHearing;
	private LocalDateTime createdAt;

	@ManyToOne
	@JoinColumn(name = "judge_id")
	private User judge;

	@ManyToOne
	@JoinColumn(name = "lawyer_id")
	private User lawyer;

	@ManyToOne
	@JoinColumn(name = "prosecutor_id")
	private User prosecutor;

	@ManyToOne
	@JoinColumn(name = "plaintiff_id")
	private User plaintiff;

	@ManyToOne
	@JoinColumn(name = "opponent_id")
	private User opponent;

	@ManyToMany
	@JoinTable(
			name = "case_advocates",
			joinColumns = @JoinColumn(name = "case_id"),
			inverseJoinColumns = @JoinColumn(name = "user_id")
	)
	private List<User> advocates;

	@ManyToMany
	@JoinTable(
			name = "case_clients",
			joinColumns = @JoinColumn(name = "case_id"),
			inverseJoinColumns = @JoinColumn(name = "user_id")
	)
	private List<User> clients;
}
