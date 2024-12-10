package mk.ukim.finki.wp.lab.web.controller;

import mk.ukim.finki.wp.lab.model.Report;
import mk.ukim.finki.wp.lab.service.MailService;
import mk.ukim.finki.wp.lab.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ReportController {

    @Autowired
    private ReportService reportService;
    @Autowired
    private MailService   mailService;

    @GetMapping("/")
    public String showForm(Model model) {
        model.addAttribute("reports", reportService.getAllReports());
        return "reportForm";
    }

    @PostMapping("/submit")
    public String submitReport(
            @RequestParam String description,
            @RequestParam String location,
            @RequestParam String imageUrl,
            Model model) {
        reportService.saveReport(description, location, imageUrl);
        model.addAttribute("message", "Пријавата е успешно зачувана!");
        model.addAttribute("reports", reportService.getAllReports());

        // Sendingg
        String emailSubject = "New Pollution Report";
        String emailText = "Description: " + description + "\nLocation: " + location + "\nImage URL: " + imageUrl;
        mailService.sendMail("andreevskabojana@example.com", emailSubject, emailText);

        model.addAttribute("message", "Пријавата е успешно зачувана и испратена!");
        return "reportForm";
    }
}
