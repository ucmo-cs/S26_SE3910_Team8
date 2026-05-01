package com.team8.scheduler.dto;

public record AppointmentDetailDto(
        Long id,
        String appointmentDateTime,
        String serviceName,
        String branchId,
        String notes,
        String status,
        String firstName,
        String lastName,
        String email,
        String phoneNumber
) {}
