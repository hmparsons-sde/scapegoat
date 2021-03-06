USE [master]
GO
/****** Object:  Database [Scapegoat]    Script Date: 11/16/2021 8:02:15 PM ******/
CREATE DATABASE [Scapegoat]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Scapegoat', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.NSSSQLSERVER\MSSQL\DATA\Scapegoat.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Scapegoat_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.NSSSQLSERVER\MSSQL\DATA\Scapegoat_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [Scapegoat] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Scapegoat].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Scapegoat] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Scapegoat] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Scapegoat] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Scapegoat] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Scapegoat] SET ARITHABORT OFF 
GO
ALTER DATABASE [Scapegoat] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Scapegoat] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Scapegoat] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Scapegoat] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Scapegoat] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Scapegoat] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Scapegoat] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Scapegoat] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Scapegoat] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Scapegoat] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Scapegoat] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Scapegoat] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Scapegoat] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Scapegoat] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Scapegoat] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Scapegoat] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Scapegoat] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Scapegoat] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [Scapegoat] SET  MULTI_USER 
GO
ALTER DATABASE [Scapegoat] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Scapegoat] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Scapegoat] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Scapegoat] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Scapegoat] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Scapegoat] SET QUERY_STORE = OFF
GO
USE [Scapegoat]
GO
/****** Object:  Table [dbo].[OrderItems]    Script Date: 11/16/2021 8:02:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderItems](
	[OrderId] [uniqueidentifier] NOT NULL,
	[ProductId] [uniqueidentifier] NOT NULL,
	[Quantity] [int] NOT NULL,
 CONSTRAINT [PK_OrderItems] PRIMARY KEY CLUSTERED 
(
	[OrderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 11/16/2021 8:02:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[Id] [uniqueidentifier] NOT NULL,
	[UserId] [uniqueidentifier] NOT NULL,
	[Status] [varchar](50) NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[TotalCost] [decimal](18, 0) NOT NULL,
	[PaymentId] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED 
(
	[PaymentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PaymentType]    Script Date: 11/16/2021 8:02:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PaymentType](
	[PaymentMethod] [int] NOT NULL,
	[AccountNumber] [varchar](50) NOT NULL,
	[UserId] [uniqueidentifier] NOT NULL,
	[Id] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_PaymentType_1] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Products]    Script Date: 11/16/2021 8:02:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Products](
	[ProductId] [uniqueidentifier] NOT NULL,
	[ProductType] [int] NOT NULL,
	[Description] [varchar](50) NOT NULL,
	[MerchantId] [uniqueidentifier] NOT NULL,
	[Price] [money] NOT NULL,
	[Size] [varchar](50) NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[ProductImage] [varchar](max) NULL,
 CONSTRAINT [PK_Products] PRIMARY KEY CLUSTERED 
(
	[ProductId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 11/16/2021 8:02:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Id] [uniqueidentifier] NOT NULL,
	[UserType] [int] NOT NULL,
	[CustomerTier] [int] NOT NULL,
	[FirstName] [varchar](50) NOT NULL,
	[LastName] [varchar](50) NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[AddressLine1] [varchar](50) NULL,
	[AddressLine2] [varchar](50) NULL,
	[PostalCode] [varchar](50) NULL,
	[CityName] [varchar](50) NULL,
	[State] [varchar](50) NULL,
	[Country] [varchar](50) NULL,
	[FirebaseKey] [varchar](50) NULL,
	[IsAdmin] [bit] NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[OrderItems] ([OrderId], [ProductId], [Quantity]) VALUES (N'6383ac5b-e98e-41aa-9072-06e552e0dd2f', N'f6fd976d-b379-4fdf-8a1d-ebc87d071b44', 1)
INSERT [dbo].[OrderItems] ([OrderId], [ProductId], [Quantity]) VALUES (N'7a46d6d1-d385-4d83-9f5c-3433fec31982', N'f6fd976d-b379-4fdf-8a1d-ebc87d071b44', 1)
INSERT [dbo].[OrderItems] ([OrderId], [ProductId], [Quantity]) VALUES (N'fa7782a5-b169-495f-8c7d-76d2e7b7c18e', N'db7a4e2a-8dcb-49d6-b69c-1c12d5cdacad', 3)
INSERT [dbo].[OrderItems] ([OrderId], [ProductId], [Quantity]) VALUES (N'91a295c4-dfa3-4462-8017-8f213531bd47', N'27f57974-6070-4e76-a2be-86e3bed004f8', 4)
INSERT [dbo].[OrderItems] ([OrderId], [ProductId], [Quantity]) VALUES (N'0a7b2808-6b85-4e81-b4d3-f62de5c6851e', N'bf6bab33-1898-409c-b729-cf46d9d56f45', 2)
GO
INSERT [dbo].[Products] ([ProductId], [ProductType], [Description], [MerchantId], [Price], [Size], [CreatedAt], [ProductImage]) VALUES (N'db7a4e2a-8dcb-49d6-b69c-1c12d5cdacad', 0, N'smol fainting goat', N'88467a0b-966e-4941-a6da-8ee49474e76d', 30.0000, N'small', CAST(N'2021-10-16T15:13:27.607' AS DateTime), N'https://lh3.googleusercontent.com/proxy/GAKVkd665uuq84uz-jvMN3bxV7RIyHH0gpcMnQ9xR4VbL076QhPiBPvsdkz0fmNc6H9dRkLUrU4n9L1yQMhW46QqjwYKeEFhHEukam7DX5jMALyMdYO6Ex1RneL4E7CUG9RN6VVscPxoMWPy6X1D-wFiStAoysqwy90')
INSERT [dbo].[Products] ([ProductId], [ProductType], [Description], [MerchantId], [Price], [Size], [CreatedAt], [ProductImage]) VALUES (N'42f04e67-7106-4ccd-9050-6a44d26153b3', 1, N'Yoga Goats (herd of 4)', N'88467a0b-966e-4941-a6da-8ee49474e76d', 52.9900, N'1', CAST(N'2021-11-16T00:00:00.000' AS DateTime), N'https://www.goatjoy.com/wp-content/uploads/2018/05/IMG_0872.jpg')
INSERT [dbo].[Products] ([ProductId], [ProductType], [Description], [MerchantId], [Price], [Size], [CreatedAt], [ProductImage]) VALUES (N'ea484122-3c0e-414d-addb-6d01233128b7', 0, N'Kissy Goat!', N'ab9b290a-2f35-4335-bd21-fd49bdd7f261', 50.0000, N'small', CAST(N'2021-11-17T01:01:12.513' AS DateTime), N'https://media.gettyimages.com/photos/goat-picture-id165847424?s=612x612')
INSERT [dbo].[Products] ([ProductId], [ProductType], [Description], [MerchantId], [Price], [Size], [CreatedAt], [ProductImage]) VALUES (N'27f57974-6070-4e76-a2be-86e3bed004f8', 1, N'five goats', N'88467a0b-966e-4941-a6da-8ee49474e76d', 100.0000, N'medium', CAST(N'2021-10-16T15:16:26.380' AS DateTime), N'https://www.beginningfarmers.org/wp-content/uploads/2015/03/pin.jpg')
INSERT [dbo].[Products] ([ProductId], [ProductType], [Description], [MerchantId], [Price], [Size], [CreatedAt], [ProductImage]) VALUES (N'00f86ac9-bbfa-43ec-b436-c173022d1aac', 2, N'ten goats for a medium yard', N'ab9b290a-2f35-4335-bd21-fd49bdd7f261', 200.0000, N'large', CAST(N'2021-10-16T15:17:04.830' AS DateTime), N'https://www.mathabah.org/wp-content/uploads/2020/07/Goats-Farm.jpg')
INSERT [dbo].[Products] ([ProductId], [ProductType], [Description], [MerchantId], [Price], [Size], [CreatedAt], [ProductImage]) VALUES (N'bf6bab33-1898-409c-b729-cf46d9d56f45', 4, N'football field grazers', N'ab9b290a-2f35-4335-bd21-fd49bdd7f261', 400.0000, N'xxlarge', CAST(N'2021-10-16T15:18:33.650' AS DateTime), N'http://neooc.com/wp-content/uploads/2015/08/Goats-running.jpg')
INSERT [dbo].[Products] ([ProductId], [ProductType], [Description], [MerchantId], [Price], [Size], [CreatedAt], [ProductImage]) VALUES (N'f6fd976d-b379-4fdf-8a1d-ebc87d071b44', 3, N'15 goats of great strength', N'88467a0b-966e-4941-a6da-8ee49474e76d', 300.0000, N'xlarge', CAST(N'2021-10-16T15:17:42.667' AS DateTime), N'https://www.rescue.org/sites/default/files/styles/window_width_breakpoints_theme_rescue_large_2x/public/image/12278/e-image/grazing_goats_2_5.19_kate_wright.jpg?itok=68ZwgPmC&timestamp=1563314704')
GO
INSERT [dbo].[Users] ([Id], [UserType], [CustomerTier], [FirstName], [LastName], [CreatedAt], [AddressLine1], [AddressLine2], [PostalCode], [CityName], [State], [Country], [FirebaseKey], [IsAdmin]) VALUES (N'4671c5ae-fbbf-4532-9a14-3b83460c0473', 2, 4, N'Holly TEST', N'Parsons', CAST(N'2021-11-15T01:19:26.387' AS DateTime), N'1114 Calvin Ave', N'', N'37206', N'Nashville', N'TN', N'United States', NULL, 0)
INSERT [dbo].[Users] ([Id], [UserType], [CustomerTier], [FirstName], [LastName], [CreatedAt], [AddressLine1], [AddressLine2], [PostalCode], [CityName], [State], [Country], [FirebaseKey], [IsAdmin]) VALUES (N'83f3d150-972b-45b3-b0ab-3e9870f334bf', 0, 0, N'Katy', N'Fry', CAST(N'2021-10-16T14:59:15.157' AS DateTime), N'123 Alphabet Lane', NULL, N'37206', N'Nashville', N'TN', N'USA', N'COrgnCkIpyQ3oELMw9XGgPCPbEO2', 1)
INSERT [dbo].[Users] ([Id], [UserType], [CustomerTier], [FirstName], [LastName], [CreatedAt], [AddressLine1], [AddressLine2], [PostalCode], [CityName], [State], [Country], [FirebaseKey], [IsAdmin]) VALUES (N'7eaa5f78-5d27-46d4-85e8-3fd05c8775bc', 1, 2, N'Bert & Ernie', N'Smith', CAST(N'2021-11-04T02:59:10.183' AS DateTime), N'55 Ocean Avenue', N'Apt. 1', N'90210', N'Los Angeles', N'CA', N'USA', NULL, 0)
INSERT [dbo].[Users] ([Id], [UserType], [CustomerTier], [FirstName], [LastName], [CreatedAt], [AddressLine1], [AddressLine2], [PostalCode], [CityName], [State], [Country], [FirebaseKey], [IsAdmin]) VALUES (N'88467a0b-966e-4941-a6da-8ee49474e76d', 1, 1, N'Mitchell', N'Crumbley', CAST(N'2021-10-16T15:00:26.670' AS DateTime), N'44 Rainbow Road', N'Ste. 300', N'01991B', N'Montreal', N'Quebec', N'Canada', N'xdeIwgUJtDWxVM9hyr6A08cQBbn1', 1)
INSERT [dbo].[Users] ([Id], [UserType], [CustomerTier], [FirstName], [LastName], [CreatedAt], [AddressLine1], [AddressLine2], [PostalCode], [CityName], [State], [Country], [FirebaseKey], [IsAdmin]) VALUES (N'363dfee2-4289-46f1-8ffd-a99eb8090726', 1, 1, N'Jackson', N'Parsons', CAST(N'2021-11-06T00:08:31.117' AS DateTime), N'1114 Calvin Ave', N'', N'37206', N'Nashville', N'Tennessee', N'United States', NULL, 0)
INSERT [dbo].[Users] ([Id], [UserType], [CustomerTier], [FirstName], [LastName], [CreatedAt], [AddressLine1], [AddressLine2], [PostalCode], [CityName], [State], [Country], [FirebaseKey], [IsAdmin]) VALUES (N'1faccd29-9d56-4dfe-afd6-acf0376ce91d', 0, 2, N'Sean', N'Rossettie', CAST(N'2021-10-16T14:59:57.990' AS DateTime), N'55 Nile River', NULL, NULL, N'Cairo', NULL, N'Egypt', N'1HaWQTUM7OgCNiNpKrKx6vj374l1', 1)
INSERT [dbo].[Users] ([Id], [UserType], [CustomerTier], [FirstName], [LastName], [CreatedAt], [AddressLine1], [AddressLine2], [PostalCode], [CityName], [State], [Country], [FirebaseKey], [IsAdmin]) VALUES (N'1015569f-7fef-41f0-9302-f0379e28324b', 1, 3, N'John', N'Beck', CAST(N'2021-10-20T00:35:40.620' AS DateTime), N'201 4th Ave North', N'Suite 1600', N'37219', N'Nashville', N'TN', N'USA', NULL, 0)
INSERT [dbo].[Users] ([Id], [UserType], [CustomerTier], [FirstName], [LastName], [CreatedAt], [AddressLine1], [AddressLine2], [PostalCode], [CityName], [State], [Country], [FirebaseKey], [IsAdmin]) VALUES (N'ab9b290a-2f35-4335-bd21-fd49bdd7f261', 0, 1, N'Holly', N'Parsons', CAST(N'2021-10-16T14:59:33.470' AS DateTime), N'1114 Calvin Avenue', N'Ste. of Love', N'37206', N'Nashville', N'TN', N'USA', N'8Nvdzli40kXG5RBZutkdgchrvpl1', 1)
GO
/****** Object:  Index [IX_Products]    Script Date: 11/16/2021 8:02:16 PM ******/
CREATE NONCLUSTERED INDEX [IX_Products] ON [dbo].[Products]
(
	[ProductId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[OrderItems] ADD  CONSTRAINT [DF_OrderItems_OrderId]  DEFAULT (newid()) FOR [OrderId]
GO
ALTER TABLE [dbo].[Orders] ADD  CONSTRAINT [DF_Orders_Id]  DEFAULT (newid()) FOR [Id]
GO
ALTER TABLE [dbo].[Orders] ADD  CONSTRAINT [DF_Orders_UserId]  DEFAULT (newid()) FOR [UserId]
GO
ALTER TABLE [dbo].[Orders] ADD  CONSTRAINT [DF_Orders_PaymentId]  DEFAULT (newid()) FOR [PaymentId]
GO
ALTER TABLE [dbo].[PaymentType] ADD  CONSTRAINT [DF_PaymentType_UserId]  DEFAULT (newid()) FOR [UserId]
GO
ALTER TABLE [dbo].[PaymentType] ADD  CONSTRAINT [DF_PaymentType_PaymentTypeId]  DEFAULT (newid()) FOR [Id]
GO
ALTER TABLE [dbo].[Products] ADD  CONSTRAINT [DF_Products_ProductId]  DEFAULT (newid()) FOR [ProductId]
GO
ALTER TABLE [dbo].[Products] ADD  CONSTRAINT [DF_Products_CreatedAt]  DEFAULT (getutcdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_Id]  DEFAULT (newid()) FOR [Id]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_CreatedAt]  DEFAULT (getutcdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_IsAdmin]  DEFAULT ((0)) FOR [IsAdmin]
GO
ALTER TABLE [dbo].[OrderItems]  WITH CHECK ADD  CONSTRAINT [FK_OrderItems_Products] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Products] ([ProductId])
GO
ALTER TABLE [dbo].[OrderItems] CHECK CONSTRAINT [FK_OrderItems_Products]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_OrderItems] FOREIGN KEY([Id])
REFERENCES [dbo].[OrderItems] ([OrderId])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_OrderItems]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Users]
GO
ALTER TABLE [dbo].[PaymentType]  WITH CHECK ADD  CONSTRAINT [FK_PaymentType_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[PaymentType] CHECK CONSTRAINT [FK_PaymentType_Users]
GO
ALTER TABLE [dbo].[Products]  WITH CHECK ADD  CONSTRAINT [FK_Products_Users] FOREIGN KEY([MerchantId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Products] CHECK CONSTRAINT [FK_Products_Users]
GO
USE [master]
GO
ALTER DATABASE [Scapegoat] SET  READ_WRITE 
GO
