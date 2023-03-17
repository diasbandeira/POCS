using microservicesMongoDB.Entities;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace catalogo.API.Data
{
    public class CatalogContextSeed
    {
        public static void SeedData(IMongoCollection<Product> productCollection)
        {
            bool existProduct = productCollection.Find(p => true).Any();
            if (!existProduct)
            {
                productCollection.InsertManyAsync(GetMyProducts());
            }
        }

        private static IEnumerable<Product> GetMyProducts()
        {
            return new List<Product>()
            {
                new Product
                {
                    Id = "1212212121121",
                    Name = "Iphone 1",
                    Description = "Descrição Iphone 1",
                    Image = "iphone1.png",
                    Price = "901.50M",
                    Category = "Smart Phone"
                },
                new Product
                {
                    Id = "1212212121122",
                    Name = "Iphone 1",
                    Description = "Descrição Iphone 2",
                    Image = "iphone1.png",
                    Price = "902.50M",
                    Category = "Smart Phone"
                }
                ,
                new Product
                {
                    Id = "1212212121123",
                    Name = "Iphone 1",
                    Description = "Descrição Iphone 3",
                    Image = "iphone1.png",
                    Price = "903.50M",
                    Category = "Smart Phone"
                }
            };
        }
    }
}
