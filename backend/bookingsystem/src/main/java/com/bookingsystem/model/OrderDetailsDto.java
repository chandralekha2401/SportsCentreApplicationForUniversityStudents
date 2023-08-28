package com.bookingsystem.model;

import java.util.Date;

public class OrderDetailsDto {

	
    private Date orderDate;
	
    private String paymentId;
	
    private String paymentType;
	
	private long scmId;
	
    private Integer paymentAmount;

    private String paymentstatus;
	    
    private Date creationDate;
        
    private Date updationDate;

    private String createdBy;
        
    private String updatedBy;


	public Date getOrderDate() {
		return orderDate;
	}


	public void setOrderDate(Date orderDate) {
		this.orderDate = orderDate;
	}


	public String getPaymentId() {
		return paymentId;
	}


	public void setPaymentId(String paymentId) {
		this.paymentId = paymentId;
	}


	public String getPaymentType() {
		return paymentType;
	}


	public void setPaymentType(String paymentType) {
		this.paymentType = paymentType;
	}


	


	public long getScmId() {
		return scmId;
	}


	public void setScmId(long scmId) {
		this.scmId = scmId;
	}


	public Integer getPaymentAmount() {
		return paymentAmount;
	}


	public void setPaymentAmount(Integer paymentAmount) {
		this.paymentAmount = paymentAmount;
	}


	public String getPaymentstatus() {
		return paymentstatus;
	}


	public void setPaymentstatus(String paymentstatus) {
		this.paymentstatus = paymentstatus;
	}


	public Date getCreationDate() {
		return creationDate;
	}


	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}


	public Date getUpdationDate() {
		return updationDate;
	}


	public void setUpdationDate(Date updationDate) {
		this.updationDate = updationDate;
	}


	public String getCreatedBy() {
		return createdBy;
	}


	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}


	public String getUpdatedBy() {
		return updatedBy;
	}


	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}
    
    

}
