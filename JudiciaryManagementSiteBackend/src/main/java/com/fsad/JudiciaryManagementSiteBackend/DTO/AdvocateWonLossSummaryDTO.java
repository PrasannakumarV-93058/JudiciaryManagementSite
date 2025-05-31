package com.fsad.JudiciaryManagementSiteBackend.DTO;

public class AdvocateWonLossSummaryDTO {
    private int totalCases;
    private int casesWon;
    private int casesLost;

    public AdvocateWonLossSummaryDTO(int totalCases, int casesWon, int casesLost) {
        this.totalCases = totalCases;
        this.casesWon = casesWon;
        this.casesLost = casesLost;
    }

    public int getTotalCases() {
        return totalCases;
    }

    public void setTotalCases(int totalCases) {
        this.totalCases = totalCases;
    }

    public int getCasesWon() {
        return casesWon;
    }

    public void setCasesWon(int casesWon) {
        this.casesWon = casesWon;
    }

    public int getCasesLost() {
        return casesLost;
    }

    public void setCasesLost(int casesLost) {
        this.casesLost = casesLost;
    }
}
