package kh.edu.paragoniu.booksystemmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import kh.edu.paragoniu.booksystemmanagement.entity.Author;

public interface AuthorRepository extends JpaRepository<Author, Integer> {

    
} 