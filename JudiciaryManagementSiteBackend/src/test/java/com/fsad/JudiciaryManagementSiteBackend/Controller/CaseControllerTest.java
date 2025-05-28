package com.fsad.JudiciaryManagementSiteBackend.Controller;

import com.fsad.JudiciaryManagementSiteBackend.DTO.CaseDisplayDTO;
import com.fsad.JudiciaryManagementSiteBackend.DTO.NextHearingUpdateDTO;
import com.fsad.JudiciaryManagementSiteBackend.DTO.UserDisplayDTO;
import com.fsad.JudiciaryManagementSiteBackend.Entity.Case;
import com.fsad.JudiciaryManagementSiteBackend.Entity.User;
import com.fsad.JudiciaryManagementSiteBackend.Repository.CaseRepository;
import com.fsad.JudiciaryManagementSiteBackend.Repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class CaseControllerTest {

    @InjectMocks
    private CaseController caseController;

    @Mock
    private UserRepository userRepository;

    @Mock
    private CaseRepository caseRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    private User mockUser(int id, String name, String role, String email) {
        return User.builder()
                .id(id)
                .username(name.toLowerCase().replaceAll("\\s+", ""))
                .fullName(name)
                .role(role)
                .email(email)
                .password("secret")
                .phone("1234567890")
                .createdAt(LocalDateTime.now())
                .build();
    }

    @Test
    void testGetAllCasesWithDisplay() {
        User judge = mockUser(1, "Judge Judy", "JUDGE", "judge@court.com");
        User lawyer = mockUser(2, "Advocate A", "ADVOCATE", "advA@law.com");
        User prosecutor = mockUser(3, "Advocate B", "ADVOCATE", "advB@law.com");
        User plaintiff = mockUser(4, "Client A", "CLIENT", "clientA@client.com");
        User opponent = mockUser(5, "Client B", "CLIENT", "clientB@client.com");

        Case c = new Case();
        c.setId(101);
        c.setCategory("Criminal");
        c.setStatus("Open");
        c.setStartDate(LocalDateTime.of(2023, 1, 1, 10, 0));
        c.setNextHearing(LocalDateTime.of(2024, 1, 1, 10, 0));
        c.setJudge(judge);
        c.setLawyer(lawyer);
        c.setProsecutor(prosecutor);
        c.setPlaintiff(plaintiff);
        c.setOpponent(opponent);

        when(caseRepository.findAll()).thenReturn(List.of(c));

        List<CaseDisplayDTO> result = caseController.getAllCasesWithDisplay();

        assertEquals(1, result.size());
        assertEquals("Judge Judy", result.get(0).getJudgeName());
        assertEquals(2, result.get(0).getAdvocates().size());
        assertEquals(2, result.get(0).getClients().size());
    }

    @Test
    void testGetUserByCaseIdAndRole_Success() {
        User lawyer = mockUser(2, "Advocate A", "ADVOCATE", "advA@law.com");
        Case c = new Case();
        c.setLawyer(lawyer);

        when(caseRepository.findById(101)).thenReturn(Optional.of(c));

        UserDisplayDTO dto = caseController.getUserByCaseIdAndRole(101, "lawyer");

        assertEquals("ADVOCATE", dto.getRole());
        assertEquals("Advocate A", dto.getFullName());
    }

    @Test
    void testGetUserByCaseIdAndRole_InvalidRole() {
        Case c = new Case();
        when(caseRepository.findById(101)).thenReturn(Optional.of(c));

        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class,
                () -> caseController.getUserByCaseIdAndRole(101, "INVALID"));

        assertTrue(ex.getMessage().contains("Invalid role"));
    }

    @Test
    void testCreateCase_Success() {
        User judge = mockUser(1, "Judge Judy", "JUDGE", "judge@court.com");

        Case inputCase = new Case();
        inputCase.setId(1);
        inputCase.setCategory("Civil");
        inputCase.setStatus("Open");
        inputCase.setJudge(User.builder().id(1).build());

        when(userRepository.findById(1)).thenReturn(Optional.of(judge));
        when(caseRepository.save(any(Case.class))).thenAnswer(inv -> inv.getArgument(0));

        Case result = caseController.createCase(inputCase);

        assertEquals("Civil", result.getCategory());
        assertEquals("Open", result.getStatus());
        assertEquals("Judge Judy", result.getJudge().getFullName());
    }

    @Test
    void testCreateCase_MissingFields() {
        Case inputCase = new Case(); // missing category and status
        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class,
                () -> caseController.createCase(inputCase));
        assertTrue(ex.getMessage().contains("Category and Status"));
    }

    @Test
    void testUpdateNextHearingDate_Success() {
        Case existingCase = new Case();
        existingCase.setId(101);
        existingCase.setNextHearing(LocalDateTime.of(2023, 1, 1, 10, 0));

        when(caseRepository.findById(101)).thenReturn(Optional.of(existingCase));
        when(caseRepository.save(any(Case.class))).thenAnswer(inv -> inv.getArgument(0));

        NextHearingUpdateDTO dto = new NextHearingUpdateDTO();
        dto.setNextHearing(LocalDateTime.of(2025, 12, 1, 10, 0));

        Case updated = caseController.updateNextHearingDate(101, dto);

        assertEquals(LocalDateTime.of(2025, 12, 1, 10, 0), updated.getNextHearing());
    }

    @Test
    void testUpdateNextHearingDate_CaseNotFound() {
        when(caseRepository.findById(999)).thenReturn(Optional.empty());

        NextHearingUpdateDTO dto = new NextHearingUpdateDTO();
        dto.setNextHearing(LocalDateTime.now());

        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class,
                () -> caseController.updateNextHearingDate(999, dto));
        assertTrue(ex.getMessage().contains("Case not found"));
    }

    @Test
    void testGetUserByCaseIdAndRole_Lawyer() {
        User lawyer = mockUser(2, "Advocate A", "ADVOCATE", "lawyer@example.com");
        Case c = new Case();
        c.setLawyer(lawyer);

        when(caseRepository.findById(1)).thenReturn(Optional.of(c));

        UserDisplayDTO dto = caseController.getUserByCaseIdAndRole(1, "LAWYER");

        assertEquals(lawyer.getId(), dto.getId());
        assertEquals("ADVOCATE", dto.getRole());
        assertEquals("Advocate A", dto.getFullName());
    }

    @Test
    void testGetUserByCaseIdAndRole_Prosecutor() {
        User prosecutor = mockUser(3, "Prosecutor B", "ADVOCATE", "prosecutor@example.com");
        Case c = new Case();
        c.setProsecutor(prosecutor);

        when(caseRepository.findById(2)).thenReturn(Optional.of(c));

        UserDisplayDTO dto = caseController.getUserByCaseIdAndRole(2, "PROSECUTOR");

        assertEquals(prosecutor.getId(), dto.getId());
        assertEquals("ADVOCATE", dto.getRole());
        assertEquals("Prosecutor B", dto.getFullName());
    }

    @Test
    void testGetUserByCaseIdAndRole_Plaintiff() {
        User plaintiff = mockUser(4, "Client C", "CLIENT", "plaintiff@example.com");
        Case c = new Case();
        c.setPlaintiff(plaintiff);

        when(caseRepository.findById(3)).thenReturn(Optional.of(c));

        UserDisplayDTO dto = caseController.getUserByCaseIdAndRole(3, "PLAINTIFF");

        assertEquals(plaintiff.getId(), dto.getId());
        assertEquals("CLIENT", dto.getRole());
        assertEquals("Client C", dto.getFullName());
    }

    @Test
    void testGetUserByCaseIdAndRole_Opponent() {
        User opponent = mockUser(5, "Client D", "CLIENT", "opponent@example.com");
        Case c = new Case();
        c.setOpponent(opponent);

        when(caseRepository.findById(4)).thenReturn(Optional.of(c));

        UserDisplayDTO dto = caseController.getUserByCaseIdAndRole(4, "OPPONENT");

        assertEquals(opponent.getId(), dto.getId());
        assertEquals("CLIENT", dto.getRole());
        assertEquals("Client D", dto.getFullName());
    }

    @Test
    void testGetUserByCaseIdAndRole_Judge() {
        User judge = mockUser(6, "Judge Judy", "JUDGE", "judge@example.com");
        Case c = new Case();
        c.setJudge(judge);

        when(caseRepository.findById(5)).thenReturn(Optional.of(c));

        UserDisplayDTO dto = caseController.getUserByCaseIdAndRole(5, "JUDGE");

        assertEquals(judge.getId(), dto.getId());
        assertEquals("JUDGE", dto.getRole());
        assertEquals("Judge Judy", dto.getFullName());
    }

    @Test
    void testGetUserByCaseIdAndRole_InvalidRole_ThrowsException() {
        Case c = new Case();  // no users needed
        when(caseRepository.findById(6)).thenReturn(Optional.of(c));

        Exception ex = assertThrows(IllegalArgumentException.class, () ->
                caseController.getUserByCaseIdAndRole(6, "DEFENDANT"));

        assertTrue(ex.getMessage().contains("Invalid role"));
    }

    @Test
    void testGetUserByCaseIdAndRole_NullUserForValidRole_ThrowsException() {
        Case c = new Case();  // no prosecutor assigned
        when(caseRepository.findById(7)).thenReturn(Optional.of(c));

        Exception ex = assertThrows(IllegalArgumentException.class, () ->
                caseController.getUserByCaseIdAndRole(7, "PROSECUTOR"));

        assertTrue(ex.getMessage().contains("User not found for the given role"));
    }

    @Test
    void testGetUserByCaseIdAndRole_CaseNotFound_ThrowsException() {
        when(caseRepository.findById(999)).thenReturn(Optional.empty());

        Exception ex = assertThrows(IllegalArgumentException.class, () ->
                caseController.getUserByCaseIdAndRole(999, "JUDGE"));

        assertTrue(ex.getMessage().contains("Case not found"));
    }

}
