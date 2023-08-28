package com.bookingsystem.service;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.bookingsystem.model.OrderDetailsDao;
import com.bookingsystem.model.OrderDetailsDto;
import com.bookingsystem.repository.OrderDetailsRepository;



@Service
public class OrderDetailsService {
	@Autowired
	private OrderDetailsRepository orderDetailsDao;
	
	public List<OrderDetailsDao> getOrderDetails()
	{
		List<OrderDetailsDao> listOrderDetails= (List<OrderDetailsDao>) orderDetailsDao.findAll();
		return listOrderDetails;
	}
	
	public List<OrderDetailsDao> getOrderDetailsBySCMId(long scmId)
	{
		List<OrderDetailsDao> listOrderDetails= (List<OrderDetailsDao>) orderDetailsDao.findAllByScmId(scmId);
		return listOrderDetails;
	}
	
	public OrderDetailsDao save(OrderDetailsDto orderDetails) {
		OrderDetailsDao newOrderDetailsDao = new OrderDetailsDao();
		newOrderDetailsDao.setOrderDate(orderDetails.getOrderDate());
		newOrderDetailsDao.setCreationDate(orderDetails.getCreationDate());
		newOrderDetailsDao.setUpdationDate(orderDetails.getUpdationDate());
		newOrderDetailsDao.setCreatedBy(orderDetails.getCreatedBy());
	    newOrderDetailsDao.setUpdatedBy(orderDetails.getUpdatedBy());
	    newOrderDetailsDao.setPaymentAmount(orderDetails.getPaymentAmount());
	    newOrderDetailsDao.setPaymentId(orderDetails.getPaymentId());
	    newOrderDetailsDao.setPaymentstatus(orderDetails.getPaymentstatus());
	    newOrderDetailsDao.setPaymentType(orderDetails.getPaymentType());
	    newOrderDetailsDao.setScmId(orderDetails.getScmId());
	    
		return orderDetailsDao.save(newOrderDetailsDao);
	}
	
	public Optional<OrderDetailsDao> delete(long scmId ) {
		Optional<OrderDetailsDao>  newOrderDetailsDao= orderDetailsDao.findByScmId(scmId);
		orderDetailsDao.deleteByScmId(scmId);
		return newOrderDetailsDao;
	}

}
