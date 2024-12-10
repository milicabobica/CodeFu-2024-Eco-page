package mk.ukim.finki.wp.lab.repository;


import mk.ukim.finki.wp.lab.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Long> {
}

