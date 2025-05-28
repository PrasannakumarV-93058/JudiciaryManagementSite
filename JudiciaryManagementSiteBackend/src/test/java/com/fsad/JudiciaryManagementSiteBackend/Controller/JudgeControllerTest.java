package com.fsad.JudiciaryManagementSiteBackend.Controller;

import com.fsad.JudiciaryManagementSiteBackend.DTO.IdFetchDTO;
import com.fsad.JudiciaryManagementSiteBackend.Entity.Case;
import com.fsad.JudiciaryManagementSiteBackend.Entity.Hearing;
import com.fsad.JudiciaryManagementSiteBackend.Repository.JudgeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class JudgeControllerTest {

    @Mock
    private JudgeRepository judgeRepository;

    @InjectMocks
    private JudgeController judgeController;

    private Case mockCase;
    private Hearing mockHearing;
    private IdFetchDTO mockIdDTO;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);

        mockCase = new Case();
        mockCase.setId(1);
        mockCase.setCategory("Civil");

        mockHearing = new Hearing();
        // mockHearing.setHearingDate(LocalDateTime.now());
        mockHearing.setSummary("Initial hearing");

        mockIdDTO = new IdFetchDTO(101, "Judge Judy");
    }

    @Test
    public void testGetAllJudges() {
        when(judgeRepository.getAllJudges()).thenReturn(List.of(mockIdDTO));
        List<IdFetchDTO> result = judgeController.getAllJudges();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Judge Judy", result.get(0).getFullName());

        verify(judgeRepository, times(1)).getAllJudges();
    }

    @Test
    public void testGetCasesByJudge() {
        when(judgeRepository.getCasesByJudgeId(1)).thenReturn(List.of(mockCase));
        List<Case> result = judgeController.getCasesByJudge(1);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Civil", result.get(0).getCategory());

        verify(judgeRepository, times(1)).getCasesByJudgeId(1);
    }

    @Test
    public void testGetCaseDetails() {
        when(judgeRepository.getCaseDetailsForJudge(1, 1)).thenReturn(mockCase);
        Case result = judgeController.getCaseDetails(1, 1);

        assertNotNull(result);
        assertEquals(1, result.getId());

        verify(judgeRepository, times(1)).getCaseDetailsForJudge(1, 1);
    }

    @Test
    public void testScheduleNextHearing() {
        when(judgeRepository.scheduleNextHearing(1, 1, mockHearing)).thenReturn(mockCase);
        Case result = judgeController.scheduleNextHearing(1, 1, mockHearing);

        assertNotNull(result);
        assertEquals(1, result.getId());

        verify(judgeRepository, times(1)).scheduleNextHearing(1, 1, mockHearing);
    }
}
