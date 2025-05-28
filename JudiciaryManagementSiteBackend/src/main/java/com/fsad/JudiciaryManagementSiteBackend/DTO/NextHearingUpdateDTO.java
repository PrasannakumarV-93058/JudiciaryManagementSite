package com.fsad.JudiciaryManagementSiteBackend.DTO;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class NextHearingUpdateDTO {
    private LocalDateTime nextHearing;
}
