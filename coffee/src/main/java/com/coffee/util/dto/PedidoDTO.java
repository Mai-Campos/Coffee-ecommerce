package com.coffee.util.dto;

import java.util.List;

public class PedidoDTO {
    private String address;
    private List<ItemDTO> products;
    
    

    public String getAddress() {
        return address;
    }



    public void setAddress(String address) {
        this.address = address;
    }



    public List<ItemDTO> getProducts() {
        return products;
    }



    public void setProducts(List<ItemDTO> products) {
        this.products = products;
    }



    public static class ItemDTO {
        private Long productId;
        private Integer quantity;
        public Long getProductId() {
            return productId;
        }
        public void setProductId(Long productId) {
            this.productId = productId;
        }
        public Integer getQuantity() {
            return quantity;
        }
        public void setQuantity(Integer quantity) {
            this.quantity = quantity;
        }
       
        
    }
}
