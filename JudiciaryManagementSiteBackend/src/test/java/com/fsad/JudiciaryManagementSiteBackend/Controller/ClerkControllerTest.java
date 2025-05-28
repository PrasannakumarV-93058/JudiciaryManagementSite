package com.fsad.JudiciaryManagementSiteBackend.Controller;

import com.fsad.JudiciaryManagementSiteBackend.DTO.CaseStatusUpdate;
import com.fsad.JudiciaryManagementSiteBackend.DTO.Proceedings;
import com.fsad.JudiciaryManagementSiteBackend.Entity.Case;
import com.fsad.JudiciaryManagementSiteBackend.Entity.User;
import com.fsad.JudiciaryManagementSiteBackend.Service.CaseService;
import com.fsad.JudiciaryManagementSiteBackend.Service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import static org.mockito.Mockito.*;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

import org.mockito.MockitoAnnotations;
import org.springframework.cglib.core.Local;

public class ClerkControllerTest {

    @Mock
    private CaseService caseService;

    @Mock
    private UserService userService;

    @InjectMocks
    private ClerkController clerkController;

    private Case sampleCase;
    private User sampleUser;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        sampleCase = new Case();
        sampleCase.setId(1);
        sampleCase.setCategory("Criminal");

        sampleUser = new User();
        sampleUser.setId(101);
        sampleUser.setUsername("judge01");
        sampleUser.setRole("JUDGE");
    }

    @Test
    public void testCreateCase() {
        when(caseService.createCase(sampleCase)).thenReturn(sampleCase);
        Case result = clerkController.createCase(sampleCase);
        assertEquals(sampleCase, result);
        verify(caseService, times(1)).createCase(sampleCase);
    }

    @Test
    public void testUpdateCase() {
        Case updated = new Case();
        updated.setId(1);
        updated.setCategory("Civil");

        when(caseService.updateCase(eq(1), any(Case.class))).thenReturn(updated);

        Case result = clerkController.updateCase(1, updated);
        assertEquals("Civil", result.getCategory());
        verify(caseService, times(1)).updateCase(1, updated);
    }

    @Test
    public void testAddOrUpdateJudge() {
        when(userService.addOrUpdateJudge(sampleUser)).thenReturn(sampleUser);
        User result = clerkController.addOrUpdateJudge(sampleUser);
        assertEquals("judge01", result.getUsername());
        verify(userService, times(1)).addOrUpdateJudge(sampleUser);
    }

    @Test
    public void testAddOrUpdateLawyer() {
        sampleUser.setRole("LAWYER");
        when(userService.addOrUpdateLawyer(sampleUser)).thenReturn(sampleUser);
        User result = clerkController.addOrUpdateLawyer(sampleUser);
        assertEquals("LAWYER", result.getRole());
        verify(userService, times(1)).addOrUpdateLawyer(sampleUser);
    }

    @Test
    public void testUploadProceedings() {
        LocalDateTime now= LocalDateTime.now();
        Proceedings proceedings = new Proceedings(now, "Initial Hearing");

        Case updatedCase = new Case();
        updatedCase.setId(1);

        when(caseService.uploadProceedings(eq(1), any(Proceedings.class))).thenReturn(updatedCase);

        Case result = clerkController.uploadProceedings(1, proceedings);
        assertEquals(1, result.getId());
        verify(caseService, times(1)).uploadProceedings(1, proceedings);
    }

    @Test
    public void testUpdateCaseStatus() {
        CaseStatusUpdate statusUpdate = new CaseStatusUpdate("Closed", "Case dismissed");

        Case updated = new Case();
        updated.setId(1);
        updated.setStatus("Closed");

        when(caseService.updateCaseStatus(eq(1), any(CaseStatusUpdate.class))).thenReturn(updated);

        Case result = clerkController.updateCaseStatus(1, statusUpdate);
        assertEquals("Closed", result.getStatus());
        verify(caseService, times(1)).updateCaseStatus(1, statusUpdate);
    }
}
