using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using scapegoat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace scapegoat.DataAccess
{
    public class OrdersRepository
    {
        readonly string _connectionString;
        public OrdersRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("Scapegoat");
        }

        internal IEnumerable<OrderJoin> GetAll()
        {
            using var db = new SqlConnection(_connectionString);

            var sqlString = @"select *
                                from orders o
                                join users u
                                on o.UserId = u.Id";

            var orders = db.Query<OrderJoin, User, OrderJoin>(sqlString, Map, splitOn: "id");

            var itemsQuery = @"select * from OrderItems";

            var lineItems = db.Query<OrderItemJoin>(itemsQuery);

            var productQuery = @"select * from Products";

            var itemProducts = db.Query<Product>(productQuery);


            foreach (var order in orders)
            {
               order.LineItems = lineItems.Where(li => li.OrderId == order.Id);
                
                foreach (var lineItem in lineItems)
                {
                    lineItem.Product = itemProducts.Where(ip => ip.ProductId == lineItem.ProductId);

                }
              
            }

            return orders;
        }

        internal void Remove(Guid id)
        {
            using var db = new SqlConnection(_connectionString);
            //first delete the order Items from the order
            var orderItemsQuery = @"Delete From OrderItems Where OrderId = @id";

            db.Execute(orderItemsQuery, new { id });
            //then delete the order itself
            var sql = @"Delete From Orders Where Id = @id";

            db.Execute(sql, new { id });
        }

        internal OrderJoin GetById(Guid id)
        {
            using var db = new SqlConnection(_connectionString);

            var sqlString = @"select *
                                from orders o
                                join users u
                                on o.UserId = u.Id
                                where o.id = @Id";

            var order = db.Query<OrderJoin, User, OrderJoin>(sqlString, Map, new { id }, splitOn: "id");

            var firstOrder = order.FirstOrDefault();

            var itemsQuery = @"select * from OrderItems where OrderId = @Id";

            var lineItems = db.Query<OrderItemJoin>(itemsQuery, firstOrder);

            firstOrder.LineItems = lineItems;

            var thisOrderItems = firstOrder.LineItems;

            var runningTotal = 0m;

            foreach (var item in thisOrderItems)
            {
                var thisProductTotalCost = 0m;
                var productQuery = @"select * from Products where ProductId = @ProductId";

                var thisItemId = item.ProductId;

               var itemProduct = db.Query<Product>(productQuery, new {ProductId = thisItemId });

                item.Product = itemProduct;

                var thisProduct = item.Product;

                foreach (var prod in thisProduct) {
                  thisProductTotalCost = prod.Price * item.Quantity;
                }

                runningTotal += thisProductTotalCost;
            }

            firstOrder.TotalCost = runningTotal;
            var updateTotal = @"update Orders Set
                                        TotalCost = @TotalCost
                                     output inserted.*
                                     Where id = @id";

            var updatedOrder = db.QuerySingleOrDefault<OrderJoin>(updateTotal, firstOrder);

            if (updatedOrder == null) return null;

            return firstOrder;
        }

        internal IEnumerable<OrderJoin> GetMonthlyOrders(Guid userId)
        {
            using var db = new SqlConnection(_connectionString);

            var sqlString = @"select p.ProductId as Id, p.MerchantId, oi.ProductId as Id, oi.OrderId, o.*, u.*
                                from Products p
                                join OrderItems oi
                                on p.ProductId = oi.ProductId
                                join Orders o
                                on oi.OrderId = o.Id
                                join Users u 
                                on o.UserId = u.Id
                                where p.MerchantId = @UserId
                                and year(o.CreatedAt)=@CurrentYear AND month(o.CreatedAt)=@CurrentMonth";

            var currentMonth = DateTime.Now.Month;
            var currentYear = DateTime.Now.Year;

            var orders = db.Query<OrderJoin, User, OrderJoin>(sqlString, Map, new { UserId = userId, CurrentYear = currentYear, CurrentMonth = currentMonth }, splitOn: "id") ;

            foreach (var order in orders)
            {
                var itemsQuery = @"select * from OrderItems where OrderId = @Id";

                var lineItems = db.Query<OrderItemJoin>(itemsQuery, order);

                order.LineItems = lineItems;

                var thisOrderItems = order.LineItems;

                var runningTotal = 0m;

                foreach (var item in thisOrderItems)
                {
                    var thisProductTotalCost = 0m;
                    var productQuery = @"select * from Products where ProductId = @ProductId AND MerchantId = @UserId";

                    var thisItemId = item.ProductId;

                    var itemProduct = db.Query<Product>(productQuery, new { ProductId = thisItemId, UserId = userId });

                    item.Product = itemProduct;

                    var thisProduct = item.Product;

                    foreach (var prod in thisProduct)
                    {
                        thisProductTotalCost = prod.Price * item.Quantity;
                    }

                    runningTotal += thisProductTotalCost;
                }

                order.TotalCost = runningTotal;
                var updateTotal = @"update Orders Set
                                        TotalCost = @TotalCost
                                     output inserted.*
                                     Where id = @id";

                var updatedOrder = db.QuerySingleOrDefault<OrderJoin>(updateTotal, order);
            }

            return orders;
        }

        internal IEnumerable<Order> GetCustomerPending(Guid userId)
        {
            using var db = new SqlConnection(_connectionString);

            var sqlString = @"select *
                                from orders o
                                where o.userId = @userId AND o.status = 'pending'";

            var pendingOrders = db.Query<Order>(sqlString, new { userId });

            return pendingOrders;
        }

        internal IEnumerable<OrderJoin> GetCustomerShipped(Guid userId)
        {
            using var db = new SqlConnection(_connectionString);

            var sqlString = @"select *
                                from orders o
                                join users u
                                on o.UserId = u.Id
                                where o.userId = @userId AND o.status = 'completed'";

            var orders = db.Query<OrderJoin, User, OrderJoin>(sqlString, Map, new { UserId = userId }, splitOn: "id");

            foreach (var order in orders)
            {
                var itemsQuery = @"select * from OrderItems where OrderId = @Id";

                var lineItems = db.Query<OrderItemJoin>(itemsQuery, order);

                order.LineItems = lineItems;

                var thisOrderItems = order.LineItems;

                var runningTotal = 0m;

                foreach (var item in thisOrderItems)
                {
                    var thisProductTotalCost = 0m;
                    var productQuery = @"select * from Products where ProductId = @ProductId";

                    var thisItemId = item.ProductId;

                    var itemProduct = db.Query<Product>(productQuery, new { ProductId = thisItemId });

                    item.Product = itemProduct;

                    var thisProduct = item.Product;

                    foreach (var prod in thisProduct)
                    {
                        thisProductTotalCost = prod.Price * item.Quantity;
                    }

                    runningTotal += thisProductTotalCost;
                }

                order.TotalCost = runningTotal;
                var updateTotal = @"update Orders Set
                                        TotalCost = @TotalCost
                                     output inserted.*
                                     Where id = @id";

                var updatedOrder = db.QuerySingleOrDefault<OrderJoin>(updateTotal, order);
            }

            return orders;
        }

        internal OrderJoin GetByUserId(Guid userId)
        {
            using var db = new SqlConnection(_connectionString);

            var sqlString = @"select *
                                from orders o
                                join users u
                                on o.UserId = u.Id
                                where o.userId = @userId";

            var orders = db.Query<OrderJoin, User, OrderJoin>(sqlString, Map, new { UserId = userId }, splitOn: "id");

            foreach (var order in orders)
            {
                var itemsQuery = @"select * from OrderItems where OrderId = @Id";

                var lineItems = db.Query<OrderItemJoin>(itemsQuery, order);

                order.LineItems = lineItems;

                var thisOrderItems = order.LineItems;

                var runningTotal = 0m;

                foreach (var item in thisOrderItems)
                {
                    var thisProductTotalCost = 0m;
                    var productQuery = @"select * from Products where ProductId = @ProductId";

                    var thisItemId = item.ProductId;

                    var itemProduct = db.Query<Product>(productQuery, new { ProductId = thisItemId });

                    item.Product = itemProduct;

                    var thisProduct = item.Product;

                    foreach (var prod in thisProduct)
                    {
                        thisProductTotalCost = prod.Price * item.Quantity;
                    }

                    runningTotal += thisProductTotalCost;
                }

                order.TotalCost = runningTotal;
                var updateTotal = @"update Orders Set
                                        TotalCost = @TotalCost
                                     output inserted.*
                                     Where id = @id";

                var updatedOrder = db.QuerySingleOrDefault<OrderJoin>(updateTotal, order);
            }

            return orders.FirstOrDefault();
        }

        internal OrderJoin GetFullPendingOrder(Guid userId)
        {
            using var db = new SqlConnection(_connectionString);

            var sqlString = @"select *
                                from orders o
                                join users u
                                on o.UserId = u.Id
                                where o.userId = @userId AND o.status = 'pending'";

            var orders = db.Query<OrderJoin, User, OrderJoin>(sqlString, Map, new { UserId = userId }, splitOn: "id");

            foreach (var order in orders)
            {
                var itemsQuery = @"select * from OrderItems where OrderId = @Id";

                var lineItems = db.Query<OrderItemJoin>(itemsQuery, order);

                order.LineItems = lineItems;

                var thisOrderItems = order.LineItems;

                var runningTotal = 0m;

                foreach (var item in thisOrderItems)
                {
                    var thisProductTotalCost = 0m;
                    var productQuery = @"select * from Products where ProductId = @ProductId";

                    var thisItemId = item.ProductId;

                    var itemProduct = db.Query<Product>(productQuery, new { ProductId = thisItemId });

                    item.Product = itemProduct;

                    var thisProduct = item.Product;

                    foreach (var prod in thisProduct)
                    {
                        thisProductTotalCost = prod.Price * item.Quantity;
                    }

                    runningTotal += thisProductTotalCost;
                }

                order.TotalCost = runningTotal;
                var updateTotal = @"update Orders Set
                                        TotalCost = @TotalCost
                                     output inserted.*
                                     Where id = @id";

                var updatedOrder = db.QuerySingleOrDefault<OrderJoin>(updateTotal, order);
            }

            return orders.FirstOrDefault();
        }

        internal IEnumerable<OrderJoin> GetAllUserCarts(Guid userId)
        {
            using var db = new SqlConnection(_connectionString);

            var sqlString = @"select p.ProductId as Id, p.MerchantId, oi.ProductId as Id, oi.OrderId, o.*, u.*
                                from Products p
                                join OrderItems oi
                                on p.ProductId = oi.ProductId
                                join Orders o
                                on oi.OrderId = o.Id
                                join Users u 
                                on o.UserId = u.Id
                                where p.MerchantId = @UserId";

            var orders = db.Query<OrderJoin, User, OrderJoin>(sqlString, Map, new { UserId = userId }, splitOn: "id");

            foreach (var order in orders)
            {
                var itemsQuery = @"select * from OrderItems where OrderId = @Id";

                var lineItems = db.Query<OrderItemJoin>(itemsQuery, order);

                order.LineItems = lineItems;

                var thisOrderItems = order.LineItems;

                var runningTotal = 0m;

                foreach (var item in thisOrderItems)
                {
                    var thisProductTotalCost = 0m;
                    var productQuery = @"select * from Products where ProductId = @ProductId AND MerchantId = @UserId";

                    var thisItemId = item.ProductId;

                    var itemProduct = db.Query<Product>(productQuery, new { ProductId = thisItemId, UserId = userId });

                    item.Product = itemProduct;

                    var thisProduct = item.Product;

                    foreach (var prod in thisProduct)
                    {
                        thisProductTotalCost = prod.Price * item.Quantity;
                    }

                    runningTotal += thisProductTotalCost;
                }

                order.TotalCost = runningTotal;
                var updateTotal = @"update Orders Set
                                        TotalCost = @TotalCost
                                     output inserted.*
                                     Where id = @id";

                var updatedOrder = db.QuerySingleOrDefault<OrderJoin>(updateTotal, order);
            }

            return orders;
        }

        internal void Add(Order newOrder)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"insert into Orders(UserId, Status)
                                    output inserted.Id
                                    values(@UserId, @Status)";


            var id = db.ExecuteScalar<Guid>(sql, newOrder);
            newOrder.Id = id;
        }

        internal Order Update(Guid id, Order order)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"update Orders Set
                                     Status = @Status
                                     output inserted.*
                                     Where id = @id";


            order.Id = id;
            var updatedOrder = db.QuerySingleOrDefault<Order>(sql, order);
            return updatedOrder;

        }

        //TODO: update all methods to get any needed data off other tables
        //TODO: add delete method

        OrderJoin Map(OrderJoin order, User user)
        {
            order.User = user;
            return order;
        }

    }
}
