package com.fsad.JudiciaryManagementSiteBackend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fsad.JudiciaryManagementSiteBackend.Entity.Hearing;

public interface HearingRepository extends JpaRepository<Hearing, Integer> {
	List<Hearing> findByCourtCase_Id(Integer caseId);
}
