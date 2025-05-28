package com.fsad.JudiciaryManagementSiteBackend.Service;

import com.fsad.JudiciaryManagementSiteBackend.DTO.CaseDisplayDTO;
import com.fsad.JudiciaryManagementSiteBackend.DTO.UserDisplayDTO;
import com.fsad.JudiciaryManagementSiteBackend.Entity.Case;
import com.fsad.JudiciaryManagementSiteBackend.Entity.User;
import com.fsad.JudiciaryManagementSiteBackend.Repository.CaseRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ReportServiceTest {

    private CaseRepository caseRepository;
    private ReportService reportService;

    @BeforeEach
    void setUp() {
        caseRepository = mock(CaseRepository.class);
        reportService = new ReportService();
        // Inject mock repository using reflection or setter
        // Since no setter, use reflection here:
        try {
            var field = ReportService.class.getDeclaredField("caseRepository");
            field.setAccessible(true);
            field.set(reportService, caseRepository);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    void testGenerateCaseDisplayReports_withData() {
        // Prepare test data
        User judge = User.builder().id(1).fullName("Judge Judy").role("Judge").email("judge@example.com").build();
        User advocate = User.builder().id(2).fullName("Advocate A").role("Advocate").email("advocate@example.com")
                .build();
        User client = User.builder().id(3).fullName("Client C").role("Client").email("client@example.com").build();

        Case caseEntity = Case.builder()
                .id(100)
                .category("Criminal")
                .status("Open")
                .startDate(LocalDateTime.of(2024, 1, 10, 10, 30))
                .nextHearing(LocalDateTime.of(2024, 6, 15, 9, 0))
                .judge(judge)
                .advocates(List.of(advocate))
                .clients(List.of(client))
                .build();

        when(caseRepository.findAll()).thenReturn(List.of(caseEntity));

        List<CaseDisplayDTO> reports = reportService.generateCaseDisplayReports();

        assertNotNull(reports);
        assertEquals(1, reports.size());

        CaseDisplayDTO dto = reports.get(0);
        assertEquals(100, dto.getId());
        assertEquals("Criminal", dto.getCategory());
        assertEquals("Open", dto.getStatus());
        assertEquals(LocalDateTime.of(2024, 1, 10, 10, 30), dto.getStartDate());
        assertEquals(LocalDateTime.of(2024, 6, 15, 9, 0), dto.getNextHearing());
        assertEquals("Judge Judy", dto.getJudgeName());

        // Validate advocates mapping
        assertNotNull(dto.getAdvocates());
        assertEquals(1, dto.getAdvocates().size());
        UserDisplayDTO advocateDTO = dto.getAdvocates().get(0);
        assertEquals(2, advocateDTO.getId());
        assertEquals("Advocate A", advocateDTO.getFullName());
        assertEquals("Advocate", advocateDTO.getRole());
        assertEquals("advocate@example.com", advocateDTO.getEmail());

        // Validate clients mapping
        assertNotNull(dto.getClients());
        assertEquals(1, dto.getClients().size());
        UserDisplayDTO clientDTO = dto.getClients().get(0);
        assertEquals(3, clientDTO.getId());
        assertEquals("Client C", clientDTO.getFullName());
        assertEquals("Client", clientDTO.getRole());
        assertEquals("client@example.com", clientDTO.getEmail());
    }

    @Test
    void testGenerateCaseDisplayReports_emptyList() {
        when(caseRepository.findAll()).thenReturn(Collections.emptyList());

        List<CaseDisplayDTO> reports = reportService.generateCaseDisplayReports();

        assertNotNull(reports);
        assertTrue(reports.isEmpty(), "Reports list should be empty");
    }

    @Test
    void testGenerateCaseDisplayReports_nullJudgeAndEmptyUsers() {
        Case caseEntity = Case.builder()
                .id(101)
                .category("Civil")
                .status("Closed")
                .startDate(LocalDateTime.now())
                .nextHearing(null)
                .judge(null)
                .advocates(Collections.emptyList())
                .clients(Collections.emptyList())
                .build();

        when(caseRepository.findAll()).thenReturn(List.of(caseEntity));

        List<CaseDisplayDTO> reports = reportService.generateCaseDisplayReports();

        assertNotNull(reports);
        assertEquals(1, reports.size());

        CaseDisplayDTO dto = reports.get(0);
        assertNull(dto.getJudgeName(), "Judge name should be null when judge is null");
        assertNotNull(dto.getAdvocates());
        assertTrue(dto.getAdvocates().isEmpty());
        assertNotNull(dto.getClients());
        assertTrue(dto.getClients().isEmpty());
    }
}
