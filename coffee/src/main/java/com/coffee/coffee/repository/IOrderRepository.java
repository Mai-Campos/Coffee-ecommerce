package com.coffee.coffee.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.coffee.coffee.models.Order;

public interface IOrderRepository extends JpaRepository<Order, Long> {}
