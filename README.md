# ☕ Coffee First - Ecommerce de Cafés

CaféWeb es una plataforma web de comercio electrónico enfocada en la venta de cafés especiales. Permite a los usuarios explorar productos, agregarlos al carrito y realizar pedidos. También ofrece funcionalidades internas para administradores como registrar nuevos empleados y para empleados como la gestión de productos y pedidos.

---

## 🚀 Tecnologías Utilizadas

### Frontend
- HTML
- CSS
- Tailwind CSS
- JavaScript

### Backend
- Java 17+
- Spring Boot
- Spring Security
- Spring Data JPA
- MySQL 

---

## 🧰 Funcionalidades

### Usuarios
- Registro e inicio de sesión
- Visualización de productos
- Agregar al carrito
- Realizar pedidos

### Empleados/Admin
- Autenticación segura con Spring Security
- Panel de administración
- Agregar, editar o eliminar productos
- Gestión de pedidos de clientes

---

## 🧑‍💻 Cómo Ejecutar el Proyecto
1. Clonar el repositorio

2. Crear la base de datos</br>
Crea una base de datos MySQL

3. Configurar el archivo application.properties</br>
Abre el archivo src/main/resources/application.properties y ajusta los valores de tu base de datos:</br>
spring.datasource.url=jdbc:mysql://localhost:3306/nombre_de_tu_bd</br>
spring.datasource.username=tu_usuario</br>
spring.datasource.password=tu_contraseña</br>
spring.jpa.hibernate.ddl-auto=update</br>
spring.jpa.show-sql=true</br>
Asegúrate de que el servidor MySQL esté corriendo.

4. Ejecutar el backend</br>
Desde el directorio raíz del proyecto:</br>
./mvnw spring-boot:run</br>
O bien, puedes ejecutar la clase principal desde tu IDE

5. Acceder a la aplicación</br>
Abre tu navegador y entra a:</br>
http://localhost:8080/index.html

## 🔐 Seguridad
- Autenticación con Spring Security
- Roles: USER, EMPLOYEE, ADMIN
- Rutas protegidas y controladas por rol

## 🧑‍💼 Contribuciones
Este proyecto es de práctica. ¡Se aceptan mejoras y sugerencias!

# 👩‍🏫 Guía de Usuario

## Cliente
### 1. Registro e Inicio de Sesión
- Haz clic en "Iniciar sesion en el header o en el enlace del footer".
- Haz click en crear una cuenta debajo del formulario de inicio de sesion si  no tienes una cuenta.
- Ingresa tu nombre, correo, y contraseña segura.
- Luego podrás iniciar sesión con tus credenciales.

### 2. Navegar y Comprar
- Desde la página principal, explora los productos.
- Haz clic en "Agregar al carrito" para seleccionar productos.
- Al finalizar, ve al carrito y presiona "Realizar pedido".

- ## 🧑‍🔧Empleados / Administradores

### 1. Iniciar Sesión
- El programa tiene un administrador por defecto con fines de prueba con usuario admin y contraseña Admin.123
- inicia sesión con ese usuario

### 2. Gestiones
 Acceder desde la url del navegador a las siguientes rutas:
- /create-employee.html --- para crear empleados (Solo el admin puede acceder)
- /coffes-admin.html --- para gestionar productos
- /orders-admin -- para gestionar pedidos

### 3. Seguridad
- Cada rol tiene acceso solo a las funcionalidades correspondientes.
- No se permite el acceso de usuarios sin autenticación.




