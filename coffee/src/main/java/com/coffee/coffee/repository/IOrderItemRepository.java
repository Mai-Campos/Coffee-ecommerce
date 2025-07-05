package com.coffee.coffee.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.coffee.coffee.models.OrderItem;

public interface IOrderItemRepository extends JpaRepository<OrderItem, Long> {}
