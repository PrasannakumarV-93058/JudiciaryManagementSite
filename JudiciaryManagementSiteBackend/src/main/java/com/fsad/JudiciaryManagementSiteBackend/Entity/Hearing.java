package com.fsad.JudiciaryManagementSiteBackend.Entity;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "hearings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Hearing {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "case_id")
	private Case case_id;

	private LocalDateTime nextHearingDate;

	private Integer numberOfHearings;

	@ManyToOne
	@JoinColumn(name = "court_case_id", referencedColumnName = "id")
	private Case courtCase;

	@Lob
	private String hearingDates; // JSON or comma-separated dates

	@Lob
	private String summary;
}
