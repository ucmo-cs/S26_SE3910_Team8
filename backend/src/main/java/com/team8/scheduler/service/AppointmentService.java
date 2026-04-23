package com.team8.scheduler.service;

import com.team8.scheduler.dto.AppointmentDetailDto;
import com.team8.scheduler.entity.Appointment;
import com.team8.scheduler.entity.User;
import com.team8.scheduler.repository.AppointmentRepository;
import com.team8.scheduler.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;

    public AppointmentService(AppointmentRepository appointmentRepository, UserRepository userRepository) {
        this.appointmentRepository = appointmentRepository;
        this.userRepository = userRepository;
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public List<AppointmentDetailDto> getAllAppointmentsWithDetails() {
        return appointmentRepository.findAll().stream()
                .map(a -> new AppointmentDetailDto(
                        a.getId(),
                        a.getAppointmentDateTime() != null ? a.getAppointmentDateTime().toString() : null,
                        a.getServiceName(),
                        a.getBranchId(),
                        a.getNotes(),
                        a.getStatus(),
                        a.getUser().getFirstName(),
                        a.getUser().getLastName(),
                        a.getUser().getEmail(),
                        a.getUser().getPhoneNumber()
                ))
                .toList();
    }

    public Appointment getAppointmentById(Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Appointment not found with id: " + id));
    }

    public List<Appointment> getAppointmentsByUserId(Long userId) {
        return appointmentRepository.findByUserId(userId);
    }

    public Appointment createAppointment(Long userId, Appointment appointment) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));
        appointment.setUser(user);
        return appointmentRepository.save(appointment);
    }

    public Appointment updateAppointment(Long id, Appointment updatedAppointment, Long userId) {
        Appointment existing = getAppointmentById(id);

        existing.setAppointmentDateTime(updatedAppointment.getAppointmentDateTime());
        existing.setServiceName(updatedAppointment.getServiceName());
        existing.setBranchId(updatedAppointment.getBranchId());
        existing.setStatus(updatedAppointment.getStatus());
        existing.setNotes(updatedAppointment.getNotes());

        if (userId != null) {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));
            existing.setUser(user);
        }

        return appointmentRepository.save(existing);
    }

    public void deleteAppointment(Long id) {
        Appointment appointment = getAppointmentById(id);
        appointmentRepository.delete(appointment);
    }
}
