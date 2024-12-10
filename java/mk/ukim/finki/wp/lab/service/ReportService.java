package mk.ukim.finki.wp.lab.service;

import mk.ukim.finki.wp.lab.model.Report;
import mk.ukim.finki.wp.lab.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    public void saveReport(String description, String location, String imageUrl) {
        Report report = new Report();
        report.setDescription(description);
        report.setLocation(location);
        report.setTimestamp(LocalDateTime.now());
        report.setImageUrl(imageUrl);
        reportRepository.save(report);
    }

    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }

    public Report getReportById(Long id) {
        return reportRepository.findById(id).orElse(null);
    }
}
