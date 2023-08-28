package com.bookingsystem.controller;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.bookingsystem.model.OrderDetailsDto;
import com.bookingsystem.service.OrderDetailsService;


@RestController
@CrossOrigin(origins = "http://localhost:3000",allowCredentials = "true")
public class OrderDetailsController {

	@Autowired
	private OrderDetailsService orderDetailsService;
	
	@RequestMapping(value = "/od/all", method = RequestMethod.GET)
    public ResponseEntity<?> getAllOrderDetails(HttpServletRequest request) {
        return ResponseEntity.ok(orderDetailsService.getOrderDetails());
    }
	
	@RequestMapping(value = "/od/scmid", method = RequestMethod.GET)
    public ResponseEntity<?> getOrderDetailsBySCMId(HttpServletRequest request) {
		final String scmid = request.getParameter("scmid");
        return ResponseEntity.ok(orderDetailsService.getOrderDetailsBySCMId(Long.parseLong(scmid)));
    }
	
	@RequestMapping(value = "/od/save", method = RequestMethod.POST)
	public ResponseEntity<?> saveOrderDetails(@RequestBody OrderDetailsDto oDDto) throws Exception {
		oDDto.setCreationDate(new Date());
		oDDto.setOrderDate(new Date());
		return ResponseEntity.ok(orderDetailsService.save(oDDto));
	}
	
	@RequestMapping(value = "/od/delete", method = RequestMethod.POST)
    public ResponseEntity<?> deleteOrderDetail(HttpServletRequest request) {
		final String scmid = request.getParameter("scmid");
		return ResponseEntity.ok(orderDetailsService.delete(Long.parseLong(scmid)));
	}
}
