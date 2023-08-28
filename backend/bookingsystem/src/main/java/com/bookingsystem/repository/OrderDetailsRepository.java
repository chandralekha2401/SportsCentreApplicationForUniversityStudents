package com.bookingsystem.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import com.bookingsystem.model.OrderDetailsDao;

public interface OrderDetailsRepository extends CrudRepository<OrderDetailsDao,Long>{

	List<OrderDetailsDao> findAllByScmId(long scmId);

	Optional<OrderDetailsDao> findByScmId(long scmId);

	void deleteByScmId(long scmId);
	
	
}