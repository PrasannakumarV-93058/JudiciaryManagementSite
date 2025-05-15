package com.fsad.JudiciaryManagementSiteBackend.Repository;

import com.fsad.JudiciaryManagementSiteBackend.Entity.Case;
import com.fsad.JudiciaryManagementSiteBackend.Entity.Hearing;
import com.fsad.JudiciaryManagementSiteBackend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JudgeRepository extends JpaRepository<User, Integer> {

    @Query("SELECT c FROM Case c WHERE c.judge.id = :judgeId")
    List<Case> getCasesByJudgeId(@Param("judgeId") Integer judgeId);

    @Query("SELECT c FROM Case c WHERE c.judge.id = :judgeId AND c.id = :caseId")
    Case getCaseDetailsForJudge(@Param("judgeId") Integer judgeId, @Param("caseId") Integer caseId);

    @Query("UPDATE Case c SET c.nextHearing = :nextHearing WHERE c.judge.id = :judgeId AND c.id = :caseId")
    Case scheduleNextHearing(@Param("judgeId") Integer judgeId, @Param("caseId") Integer caseId, @Param("nextHearing") Hearing hearingRequest);
}