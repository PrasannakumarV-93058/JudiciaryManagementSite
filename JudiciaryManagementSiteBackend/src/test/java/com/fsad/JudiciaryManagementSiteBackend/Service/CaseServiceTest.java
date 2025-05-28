package com.fsad.JudiciaryManagementSiteBackend.Service;

import com.fsad.JudiciaryManagementSiteBackend.DTO.CaseStatusUpdate;
import com.fsad.JudiciaryManagementSiteBackend.DTO.Proceedings;
import com.fsad.JudiciaryManagementSiteBackend.Entity.Case;
import com.fsad.JudiciaryManagementSiteBackend.Entity.User;
import com.fsad.JudiciaryManagementSiteBackend.Repository.CaseRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CaseServiceTest {

    private CaseRepository caseRepository;
    private CaseService caseService;

    @BeforeEach
    void setUp() {
        caseRepository = mock(CaseRepository.class);
        caseService = new CaseService();
        // Directly inject mock repo (package-private)
        caseService.caseRepository = caseRepository;
    }

    @Test
    void testCreateCase() {
        Case newCase = Case.builder()
                .category("Civil")
                .status("Open")
                .startDate(LocalDateTime.now())
                .build();

        when(caseRepository.save(newCase)).thenReturn(newCase);

        Case savedCase = caseService.createCase(newCase);

        assertNotNull(savedCase);
        assertEquals("Civil", savedCase.getCategory());
        verify(caseRepository, times(1)).save(newCase);
    }

    @Test
    void testUpdateExistingCase() {
        Integer caseId = 1;

        // Create mock users
        User judge = new User();
        User lawyer = new User();
        User plaintiff = new User();
        User opponent = new User();

        Case existingCase = Case.builder()
                .category("Criminal")
                .status("Pending")
                .startDate(LocalDateTime.now().minusDays(5))
                .nextHearing(LocalDateTime.now().plusDays(7))
                .judge(judge)
                .lawyer(lawyer)
                .plaintiff(plaintiff)
                .opponent(opponent)
                .build();

        Case updatedCase = Case.builder()
                .category("Civil")
                .status("Open")
                .startDate(LocalDateTime.now())
                .nextHearing(LocalDateTime.now().plusDays(10))
                .judge(judge)
                .lawyer(lawyer)
                .plaintiff(plaintiff)
                .opponent(opponent)
                .build();

        when(caseRepository.findById(caseId)).thenReturn(Optional.of(existingCase));
        when(caseRepository.save(existingCase)).thenReturn(existingCase);

        Case result = caseService.updateCase(caseId, updatedCase);

        assertNotNull(result);
        assertEquals("Civil", result.getCategory());
        assertEquals("Open", result.getStatus());
        assertEquals(updatedCase.getStartDate(), result.getStartDate());
        assertEquals(updatedCase.getNextHearing(), result.getNextHearing());
        assertEquals(judge, result.getJudge());
        assertEquals(lawyer, result.getLawyer());
        assertEquals(plaintiff, result.getPlaintiff());
        assertEquals(opponent, result.getOpponent());

        verify(caseRepository).findById(caseId);
        verify(caseRepository).save(existingCase);
    }

    @Test
    void testUpdateNonExistentCase() {
        when(caseRepository.findById(999)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class, () -> {
            caseService.updateCase(999, new Case());
        });

        assertEquals("Case not found with id: 999", ex.getMessage());
    }

    @Test
    void testUploadProceedingsForExistingCase() {
        Integer caseId = 2;
        Case caseEntity = new Case();
        LocalDateTime now = LocalDateTime.now();
        Proceedings proceedings = new Proceedings(now, "Initial Hearing");
        proceedings.setDescription("Initial Hearing Completed");

        when(caseRepository.findById(caseId)).thenReturn(Optional.of(caseEntity));

        Case result = caseService.uploadProceedings(caseId, proceedings);

        assertNotNull(result);
        verify(caseRepository).findById(caseId);
    }

    @Test
    void testUploadProceedingsForNonExistentCase() {
        when(caseRepository.findById(999)).thenReturn(Optional.empty());

        LocalDateTime now = LocalDateTime.now();
        Proceedings proceedings = new Proceedings(now, "Some proceedings");
        proceedings.setDescription("Some proceedings");

        RuntimeException ex = assertThrows(RuntimeException.class, () -> {
            caseService.uploadProceedings(999, proceedings);
        });

        assertEquals("Case not found with id: 999", ex.getMessage());
    }

    @Test
    void testUpdateCaseStatusAndJudgment() {
        Integer caseId = 3;
        Case caseEntity = Case.builder()
                .status("Pending")
                .endDate(null)
                .build();

        CaseStatusUpdate statusUpdate = new CaseStatusUpdate("status", "judgment");
        statusUpdate.setStatus("Closed");
        statusUpdate.setJudgment("Judgment in favor of plaintiff");

        when(caseRepository.findById(caseId)).thenReturn(Optional.of(caseEntity));
        when(caseRepository.save(caseEntity)).thenReturn(caseEntity);

        Case result = caseService.updateCaseStatus(caseId, statusUpdate);

        assertNotNull(result);
        assertEquals("Closed", result.getStatus());
        // Since your original code sets endDate to null if judgment is not null, test
        // that behavior:
        assertNull(result.getEndDate());

        verify(caseRepository).findById(caseId);
        verify(caseRepository).save(caseEntity);
    }

    @Test
    void testUpdateCaseStatusForNonExistentCase() {
        when(caseRepository.findById(888)).thenReturn(Optional.empty());

        CaseStatusUpdate update = new CaseStatusUpdate("status", "judgment");
        update.setStatus("Closed");
        update.setJudgment("Judgment rendered");

        RuntimeException ex = assertThrows(RuntimeException.class, () -> {
            caseService.updateCaseStatus(888, update);
        });

        assertEquals("Case not found with id: 888", ex.getMessage());
    }
}
