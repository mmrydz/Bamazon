DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nifty Easter Egg Carousel", "Home, Garden & Tools", 12.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nordic Ware Baby Bunny Cake Pan", "Home, Garden & Tools", 30.50, 76);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Creative Co-op Ceramic Bunny Rabbits Ring Holder", "Home, Garden & Tools", 8.65, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Happylifehere Bunny Ears Hair Clips ", "Clothing, Shoes Jewelry & Watches", 7.99, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("MARY POPPINS RETURNS", "Movies, Music & Games", 24.99, 64);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Martin Smith UK-222-A Soprano Ukulele, Natural", "Electronics, Computers & Office", 19.99, 19);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gaiam Yoga Mat", "Sports & Outdoors", 17.58, 5;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Captain Marvel Vol. 3: Alis Volat Propriis", "Books & Audible", 4.99, 499);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mario Badescu Facial Spray with Rosewater & Facial Spray with Green Tea Duo", "Beauty & Health", 14.00, 38);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mario Badescu Drying Lotion - 1 oz", "Beauty & Health", 17.00, 36);

SELECT top_albums.year, top_albums.position, top_albums.artist, top5000.song, top_albums.album
FROM top_albums
INNER JOIN top5000 ON top_albums.year = top5000.year AND top_albums.artist = top5000.artist
WHERE top_albums.artist = 'Queen'
ORDER BY top_albums.year;

SELECT * FROM top5000;
SELECT * from top_albums;