package com.fsad.JudiciaryManagementSiteBackend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
public class CaseDisplayDTO {

	private Integer id;
	private String category;
	private String status;
	private LocalDateTime startDate;
	private LocalDateTime nextHearing;
	private String judgeName;
	private List<UserDisplayDTO> advocates;
	private List<UserDisplayDTO> clients;

}
