# Entity-Relationship Model for Delivery System

## Entities and Their Relationships

### Cliente

- id (PK)
- nombre
- apellido
- email
- telefono
- direccion

### Pedido

- id (PK)
- cliente_id (FK)
- fecha_pedido
- estado (pendiente, en_proceso, entregado, cancelado)
- metodo_pago
- total
- notas_entrega
- confirmado_entrega
- confirmado_pago

### DetallePedido

- id (PK)
- pedido_id (FK)
- producto_id (FK)
- cantidad
- precio_unitario
- subtotal

### Producto

- id (PK)
- categoria_id (FK)
- nombre
- descripcion
- precio
- disponible

### Categoria

- id (PK)
- nombre (platillo, bebida)
- descripcion

### ReporteError

- id (PK)
- pedido_id (FK)
- tipo_error
- descripcion
- accion_tomada
- resuelto
- fecha_reporte

## Relaciones

1. Cliente -> Pedido (1:N)

   - Un cliente puede tener muchos pedidos
   - Un pedido pertenece a un solo cliente

2. Pedido -> DetallePedido (1:N)

   - Un pedido puede tener muchos detalles
   - Un detalle pertenece a un solo pedido

3. Producto -> DetallePedido (1:N)

   - Un producto puede estar en muchos detalles
   - Un detalle corresponde a un solo producto

4. Categoria -> Producto (1:N)

   - Una categoría puede tener muchos productos
   - Un producto pertenece a una sola categoría

5. Pedido -> ReporteError (1:N)
   - Un pedido puede tener muchos reportes de error
   - Un reporte de error pertenece a un solo pedido

## Consideraciones

- Los estados del pedido permiten seguimiento del ciclo de vida
- Los productos tienen un flag de disponibilidad
- Los reportes de error ayudan al control de calidad
- Las categorías iniciales son "platillo" y "bebida"
