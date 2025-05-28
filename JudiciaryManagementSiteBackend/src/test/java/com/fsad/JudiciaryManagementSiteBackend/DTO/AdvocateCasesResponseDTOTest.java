package com.fsad.JudiciaryManagementSiteBackend.DTO;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class AdvocateCasesResponseDTOTest {

    @Test
    public void testBuilderAndGetters() {
        // Prepare dummy UserDisplayDTO objects for advocates and clients
        UserDisplayDTO advocate1 = new UserDisplayDTO(1, "John Doe", "ADVOCATE", "john@example.com");
        UserDisplayDTO client1 = new UserDisplayDTO(2, "Alice Smith", "CLIENT", "alice@example.com");

        // Prepare dummy CaseResponseDTO objects
        CaseResponseDTO case1 = CaseResponseDTO.builder()
                .id(101)
                .category("Criminal")
                .status("Open")
                .startDate(LocalDateTime.of(2024, 4, 20, 10, 0))
                .nextHearing(LocalDateTime.of(2024, 5, 10, 9, 30))
                .judgeName("Judge Judy")
                .advocates(List.of(advocate1))
                .clients(List.of(client1))
                .build();

        CaseResponseDTO case2 = CaseResponseDTO.builder()
                .id(102)
                .category("Civil")
                .status("Closed")
                .startDate(LocalDateTime.of(2023, 11, 15, 14, 0))
                .nextHearing(null) // no next hearing
                .judgeName("Judge Mathis")
                .advocates(List.of(advocate1))
                .clients(List.of(client1))
                .build();

        List<CaseResponseDTO> cases = List.of(case1, case2);

        // Build AdvocateCasesResponseDTO using the advocate and cases
        AdvocateCasesResponseDTO responseDTO = AdvocateCasesResponseDTO.builder()
                .advocate(advocate1)
                .cases(cases)
                .build();

        // Assertions
        assertNotNull(responseDTO);
        assertEquals(advocate1, responseDTO.getAdvocate());
        assertEquals(cases, responseDTO.getCases());
        assertEquals(2, responseDTO.getCases().size());

        // Test setters as well
        UserDisplayDTO newAdvocate = new UserDisplayDTO(3, "Jane Smith", "ADVOCATE", "jane@example.com");
        responseDTO.setAdvocate(newAdvocate);
        assertEquals(newAdvocate, responseDTO.getAdvocate());

        CaseResponseDTO case3 = CaseResponseDTO.builder()
                .id(103)
                .category("Family")
                .status("Pending")
                .startDate(LocalDateTime.now())
                .nextHearing(LocalDateTime.now().plusDays(10))
                .judgeName("Judge Amy")
                .advocates(List.of(newAdvocate))
                .clients(List.of(client1))
                .build();

        responseDTO.setCases(List.of(case3));
        assertEquals(1, responseDTO.getCases().size());
        assertEquals(case3, responseDTO.getCases().get(0));
    }
}
