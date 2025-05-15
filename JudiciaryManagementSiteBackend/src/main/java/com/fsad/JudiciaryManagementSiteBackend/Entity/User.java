package com.fsad.JudiciaryManagementSiteBackend.Entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String username;

	private String fullName;

	private String email;

	private String password;

	private String role; // Example: JUDGE, ADVOCATE(LAWYER, PROSECUTOR), CLERK, CLIENT(PLAINTIFF, OPPONENT)

	private String phone;

	private LocalDateTime createdAt;

}
