CREATE DATABASE bd_SiteCliente;

USE bd_SiteCliente;

CREATE TABLE ItemsCardapio (
ItemId INT PRIMARY KEY AUTO_INCREMENT,
Nome Varchar(40) NOT NULL,
Preço DECIMAL(5,2) NOT NULL,
ServePessoas INT NOT NULL,
LinkImagem VARCHAR(500) NOT NULL
);

CREATE TABLE Cliente (
ClienteId INT PRIMARY KEY AUTO_INCREMENT,
Nome Varchar(40) NOT NULL,
Cpf Varchar(20) NOT NULL UNIQUE,
Senha Varchar(50) NOT NULL
);

INSERT INTO ItemsCardapio (Nome, Preço, ServePessoas, LinkImagem) VALUES 
('Sushi Variado', 69.90, 2, 'https://institucional.ifood.com.br/wp-content/uploads/2023/10/iFN_pratos-veggie-copiar-1-1024x692-1.webp'),
('Temaki', 28.50, 1, 'https://static.itdg.com.br/images/640-400/774375583e3775acf3328a7c7a0a0470/303152-original.jpg'),
('Temaki Grelhado', 30.00, 1, 'https://receitas123.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2023/06/temaki-grelhado.png.webp'),
('Sashimi', 55.00, 1, 'https://www.manusmenu.com/wp-content/uploads/2016/06/salmon-sashimi-served-with-ponzu-and-wasabi.webp'),
('Yakisoba', 39.90, 2, 'https://cdn.oceanserver.com.br/lojas/fastnfit/uploads_produto/yakisoba-de-carne-691ddfa8306c8.jpg'),
('Sunomono', 15.00, 1, 'https://static.itdg.com.br/images/640-400/0cf37bc6c25dac13ae808734ae0e5bb6/sunomono.jpg'),
('Bento Box', 48.00, 1, 'https://m.media-amazon.com/images/I/913RgeT2ekL._AC_UF350,350_QL80_.jpg'),
('Uramaki Salmão', 24.00, 1, 'https://www.sabornamesa.com.br/media/k2/items/cache/111f98f6130992942a4edb8b01d8011a_XL.jpg'),
('Uramaki Skin', 22.00, 1, 'https://mambodelivery.vtexassets.com/arquivos/ids/183208/uramaki-skin-200g.jpg?v=637883981207270000'),
('Uramaki Califórnia', 20.00, 1, 'https://i.ytimg.com/vi/gu45Kk-gpS8/maxresdefault.jpg'),
('Uramaki Ebi (Camarão)', 32.00, 1, 'https://static-images.ifood.com.br/image/upload/t_high/pratos/57ad5084-a39e-4140-99eb-25f53c122e12/202309170838_28W6_i.jpg'),
('Uramaki Especial do Chef', 35.00, 1, 'https://static-images.ifood.com.br/image/upload/t_high/pratos/57ad5084-a39e-4140-99eb-25f53c122e12/202309170837_TW88_i.jpg');

INSERT INTO Cliente (Nome, Cpf, Senha) VALUES ("Teste","0000000","oi");
INSERT INTO Cliente (Nome, Cpf, Senha) VALUES ("Teste2","00000001","oi");

CREATE TABLE Pedido (
    PedidoId INT PRIMARY KEY AUTO_INCREMENT,
    DataPedido DATETIME DEFAULT CURRENT_TIMESTAMP,
    Status VARCHAR(20) DEFAULT 'Aberto' NOT NULL, 
    ClienteId INT NOT NULL,
    CONSTRAINT FK_Pedido_Cliente FOREIGN KEY (ClienteId) REFERENCES Cliente(ClienteId)
);

CREATE TABLE ItemPedido (
    ItemPedidoId INT PRIMARY KEY AUTO_INCREMENT,
    Quantidade INT NOT NULL DEFAULT 1,
    Preço DECIMAL(5,2) NOT NULL,
	PedidoId INT NOT NULL,
    ItemId INT NOT NULL,
    CONSTRAINT FK_ItemPedido_Cliente FOREIGN KEY (PedidoId) REFERENCES Pedido(PedidoId),
    CONSTRAINT FK_ItemPedido_ItemsCardapio FOREIGN KEY (ItemId) REFERENCES ItemsCardapio(ItemId)
);