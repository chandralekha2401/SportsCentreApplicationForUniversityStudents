package com.bookingsystem.repository;
import org.springframework.data.repository.CrudRepository;
import com.bookingsystem.model.ManagementDao;

public interface ManagementRepository extends CrudRepository<ManagementDao, Long> {
	ManagementDao findByUniversityIdAndEmail(Integer universityId,String email);
}

