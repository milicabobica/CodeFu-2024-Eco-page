package mk.ukim.finki.wp.lab.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    private String location;

    private LocalDateTime timestamp;

    @Lob
    private String imageUrl;

    public Report() {}

    public Report(String description, String location, LocalDateTime timestamp, String imageUrl) {
        this.description = description;
        this.location = location;
        this.timestamp = timestamp;
        this.imageUrl = imageUrl;
    }

}
