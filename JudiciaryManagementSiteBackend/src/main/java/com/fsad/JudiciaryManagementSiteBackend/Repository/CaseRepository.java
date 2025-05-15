package com.fsad.JudiciaryManagementSiteBackend.Repository;

import com.fsad.JudiciaryManagementSiteBackend.Entity.Case;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CaseRepository extends JpaRepository<Case, Integer> {
    @Query("SELECT c FROM Case c WHERE c.lawyer.id = :userId OR c.prosecutor.id = :userId OR c.plaintiff.id = :userId OR c.opponent.id = :userId")
    List<Case> findCasesByUserId(@Param("userId") Integer userId);

}
