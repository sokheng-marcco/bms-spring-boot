package kh.edu.paragoniu.booksystemmanagement.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.edu.paragoniu.booksystemmanagement.entity.Publisher;
import kh.edu.paragoniu.booksystemmanagement.repository.PublisherRepository;

@Service
public class PublisherService {

    @Autowired
    private PublisherRepository publisherRepository;

    public Publisher createPublisher(Publisher publisher) {
        return publisherRepository.save(publisher);
    }

    public List<Publisher> getAllPublishers() {
        return publisherRepository.findAll();
    }

    public Optional<Publisher> getPublisherById(Integer publisherId) {
        return publisherRepository.findById(publisherId);
    }

    public Publisher updatePublisher(Integer publisherId, Publisher publisherDetails) {
        Optional<Publisher> existingPublisher = publisherRepository.findById(publisherId);
        if (existingPublisher.isPresent()) {
            Publisher publisher = existingPublisher.get();
            if (publisherDetails.getName() != null) {
                publisher.setName(publisherDetails.getName());
            }
            return publisherRepository.save(publisher);
        }
        return null;
    }

    public boolean deletePublisher(Integer publisherId) {
        if (publisherRepository.existsById(publisherId)) {
            publisherRepository.deleteById(publisherId);
            return true;
        }
        return false;
    }
}
