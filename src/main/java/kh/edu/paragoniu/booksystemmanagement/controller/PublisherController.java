package kh.edu.paragoniu.booksystemmanagement.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kh.edu.paragoniu.booksystemmanagement.entity.Publisher;
import kh.edu.paragoniu.booksystemmanagement.service.PublisherService;

@RestController
@RequestMapping("/api/publishers")
public class PublisherController {

    @Autowired
    private PublisherService publisherService;

    @PostMapping
    public ResponseEntity<Publisher> createPublisher(@RequestBody Publisher publisher) {
        Publisher createdPublisher = publisherService.createPublisher(publisher);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPublisher);
    }

    @GetMapping
    public ResponseEntity<List<Publisher>> getAllPublishers() {
        List<Publisher> publishers = publisherService.getAllPublishers();
        return ResponseEntity.ok(publishers);
    }

    @GetMapping("/{publisherId}")
    public ResponseEntity<Publisher> getPublisherById(@PathVariable Integer publisherId) {
        Optional<Publisher> publisher = publisherService.getPublisherById(publisherId);
        if (publisher.isPresent()) {
            return ResponseEntity.ok(publisher.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{publisherId}")
    public ResponseEntity<Publisher> updatePublisher(@PathVariable Integer publisherId,
            @RequestBody Publisher publisherDetails) {
        Publisher updatedPublisher = publisherService.updatePublisher(publisherId, publisherDetails);
        if (updatedPublisher != null) {
            return ResponseEntity.ok(updatedPublisher);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{publisherId}")
    public ResponseEntity<Void> deletePublisher(@PathVariable Integer publisherId) {
        boolean deleted = publisherService.deletePublisher(publisherId);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
