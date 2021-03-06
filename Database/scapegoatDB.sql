USE [master]
GO
/****** Object:  Database [Scapegoat]    Script Date: 10/16/2021 12:07:15 PM ******/
CREATE DATABASE [Scapegoat]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Scapegoat', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\Scapegoat.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Scapegoat_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\Scapegoat_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [Scapegoat] SET COMPATIBILITY_LEVEL = 150
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
ALTER DATABASE [Scapegoat] SET AUTO_RemovedFromDB_STATISTICS ON 
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
ALTER DATABASE [Scapegoat] SET AUTO_RemovedFromDB_STATISTICS_ASYNC OFF 
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
ALTER DATABASE [Scapegoat] SET RECOVERY FULL 
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
EXEC sys.sp_db_vardecimal_storage_format N'Scapegoat', N'ON'
GO
ALTER DATABASE [Scapegoat] SET QUERY_STORE = OFF
GO
USE [Scapegoat]
GO
/****** Object:  Table [dbo].[OrderItems]    Script Date: 10/16/2021 12:07:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderItems](
	[ProductId] [uniqueidentifier] NOT NULL,
	[quantity] [int] NOT NULL,
	[Id] [uniqueidentifier] NOT NULL,
	[OrderId] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_OrderItems] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 10/16/2021 12:07:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[Id] [uniqueidentifier] NOT NULL,
	[UserId] [uniqueidentifier] NOT NULL,
	[Status] [varchar](50) NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[TotalCost] [decimal](18, 2) NOT NULL,
	[PaymentId] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_Orders_1] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PaymentType]    Script Date: 10/16/2021 12:07:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PaymentType](
	[Id] [uniqueidentifier] NOT NULL,
	[PaymentMethod] [int] NOT NULL,
	[AccountNumber] [varchar](50) NOT NULL,
	[UserId] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_PaymentType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Products]    Script Date: 10/16/2021 12:07:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Products](
	[ProductId] [uniqueidentifier] NOT NULL,
	[ProductType] [int] NOT NULL,
	[Description] [varchar](200) NOT NULL,
	[MerchantId] [uniqueidentifier] NOT NULL,
	[Price] [decimal](18, 2) NOT NULL,
	[Size] [varchar](50) NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
 CONSTRAINT [PK_Products] PRIMARY KEY CLUSTERED 
(
	[ProductId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 10/16/2021 12:07:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Id] [uniqueidentifier] NULL,
	[UserType] [int] NULL,
	[CustomerTier] [int] NULL,
	[FirstName] [varchar](50) NULL,
	[LastName] [varchar](50) NULL,
	[CreatedAt] [datetime] NULL,
	[AddressLine1] [varchar](50) NULL,
	[AddressLine2] [varchar](50) NULL,
	[PostalCode] [varchar](50) NULL,
	[CityName] [varchar](50) NULL,
	[State] [varchar](50) NULL,
	[Country] [varchar](50) NULL,
	[FirebaseKey] [varchar](50) NULL,
	[IsAdmin] [bit] NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[OrderItems] ([ProductId], [quantity], [Id], [OrderId]) VALUES (N'52ba5cc6-6663-4757-9b94-7579d1508d10', 1, N'9e5a5573-ab86-4032-9643-2061dd7d6bbc', N'f89c0e1e-531c-4a24-9944-fe04d788ba59')
INSERT [dbo].[OrderItems] ([ProductId], [quantity], [Id], [OrderId]) VALUES (N'a0b5a299-f09c-41af-b840-4f82122d8be3', 1, N'8649fd51-ac9d-48a6-8622-3cf49bb0fc2c', N'5b41c5a8-a4b2-4e95-bdf5-22391b6593a8')
INSERT [dbo].[OrderItems] ([ProductId], [quantity], [Id], [OrderId]) VALUES (N'a0b5a299-f09c-41af-b840-4f82122d8be3', 1, N'a5e73cba-4afa-4a85-a5ba-c6ac54aa32fe', N'8bf97bf4-fba1-4c60-88e1-8337d74ffc0b')
INSERT [dbo].[OrderItems] ([ProductId], [quantity], [Id], [OrderId]) VALUES (N'32ab3d8d-fe23-465e-a977-b56e6243332b', 3, N'd003fcaf-30d8-4e11-ab22-caff4c2c7282', N'edefd24d-5919-4b94-91c6-f1a6f4bc82b3')
INSERT [dbo].[Orders] ([Id], [UserId], [Status], [CreatedAt], [TotalCost], [PaymentId]) VALUES (N'5b41c5a8-a4b2-4e95-bdf5-22391b6593a8', N'f8f520b6-a464-4aba-8d64-45c62810b526', N'pending', CAST(N'2021-10-16T16:57:58.527' AS DateTime), CAST(100.00 AS Decimal(18, 2)), N'98eb4a8e-3137-4fa3-8553-7a15df528af1')
INSERT [dbo].[Orders] ([Id], [UserId], [Status], [CreatedAt], [TotalCost], [PaymentId]) VALUES (N'8bf97bf4-fba1-4c60-88e1-8337d74ffc0b', N'145beb4f-54a0-41de-8de8-1e6adb3a38f3', N'pending', CAST(N'2021-10-16T16:55:55.943' AS DateTime), CAST(100.00 AS Decimal(18, 2)), N'1e69f53b-5d44-4712-be10-708a5b6a007d')
INSERT [dbo].[Orders] ([Id], [UserId], [Status], [CreatedAt], [TotalCost], [PaymentId]) VALUES (N'edefd24d-5919-4b94-91c6-f1a6f4bc82b3', N'57f49c39-e844-45ad-b242-bc84315c4055', N'shipped', CAST(N'2021-10-16T16:57:22.677' AS DateTime), CAST(75.00 AS Decimal(18, 2)), N'5868cf34-fd33-4582-994a-7266cfa9904b')
INSERT [dbo].[Orders] ([Id], [UserId], [Status], [CreatedAt], [TotalCost], [PaymentId]) VALUES (N'f89c0e1e-531c-4a24-9944-fe04d788ba59', N'e5c22e5e-6ff2-4750-9e90-a3414fda2ba0', N'processed', CAST(N'2021-10-16T16:56:47.300' AS DateTime), CAST(200.00 AS Decimal(18, 2)), N'755ca766-efe8-4e90-8d64-246296c6a3a2')
INSERT [dbo].[PaymentType] ([Id], [PaymentMethod], [AccountNumber], [UserId]) VALUES (N'755ca766-efe8-4e90-8d64-246296c6a3a2', 3, N'234-89012', N'e5c22e5e-6ff2-4750-9e90-a3414fda2ba0')
INSERT [dbo].[PaymentType] ([Id], [PaymentMethod], [AccountNumber], [UserId]) VALUES (N'1e69f53b-5d44-4712-be10-708a5b6a007d', 0, N'1234-89057', N'145beb4f-54a0-41de-8de8-1e6adb3a38f3')
INSERT [dbo].[PaymentType] ([Id], [PaymentMethod], [AccountNumber], [UserId]) VALUES (N'5868cf34-fd33-4582-994a-7266cfa9904b', 0, N'123789-123789', N'57f49c39-e844-45ad-b242-bc84315c4055')
INSERT [dbo].[PaymentType] ([Id], [PaymentMethod], [AccountNumber], [UserId]) VALUES (N'98eb4a8e-3137-4fa3-8553-7a15df528af1', 1, N'346-19234', N'f8f520b6-a464-4aba-8d64-45c62810b526')
INSERT [dbo].[Products] ([ProductId], [ProductType], [Description], [MerchantId], [Price], [Size], [CreatedAt]) VALUES (N'177ee662-eaf2-4994-a75d-17966795b8b4', 3, N'25 goats for your large yard', N'57f49c39-e844-45ad-b242-bc84315c4055', CAST(300.00 AS Decimal(18, 2)), N'small', CAST(N'2021-10-16T15:17:47.933' AS DateTime))
INSERT [dbo].[Products] ([ProductId], [ProductType], [Description], [MerchantId], [Price], [Size], [CreatedAt]) VALUES (N'e581c4e8-09b3-4243-8c64-41491587ab80', 0, N'a small brown goat to eat your grass', N'145beb4f-54a0-41de-8de8-1e6adb3a38f3', CAST(30.00 AS Decimal(18, 2)), N'small', CAST(N'2021-10-16T15:12:50.413' AS DateTime))
INSERT [dbo].[Products] ([ProductId], [ProductType], [Description], [MerchantId], [Price], [Size], [CreatedAt]) VALUES (N'a0b5a299-f09c-41af-b840-4f82122d8be3', 1, N'five goats for your small yard', N'145beb4f-54a0-41de-8de8-1e6adb3a38f3', CAST(100.00 AS Decimal(18, 2)), N'medium', CAST(N'2021-10-16T15:15:11.080' AS DateTime))
INSERT [dbo].[Products] ([ProductId], [ProductType], [Description], [MerchantId], [Price], [Size], [CreatedAt]) VALUES (N'52ba5cc6-6663-4757-9b94-7579d1508d10', 2, N'ten goats for your medium yard', N'57f49c39-e844-45ad-b242-bc84315c4055', CAST(200.00 AS Decimal(18, 2)), N'large', CAST(N'2021-10-16T15:17:10.120' AS DateTime))
INSERT [dbo].[Products] ([ProductId], [ProductType], [Description], [MerchantId], [Price], [Size], [CreatedAt]) VALUES (N'32ab3d8d-fe23-465e-a977-b56e6243332b', 0, N'small goat for yoga and hugs', N'145beb4f-54a0-41de-8de8-1e6adb3a38f3', CAST(20.00 AS Decimal(18, 2)), N'medum', CAST(N'2021-10-16T15:19:27.230' AS DateTime))
INSERT [dbo].[Users] ([Id], [UserType], [CustomerTier], [FirstName], [LastName], [CreatedAt], [AddressLine1], [AddressLine2], [PostalCode], [CityName], [State], [Country], [FirebaseKey], [IsAdmin] ) VALUES (N'145beb4f-54a0-41de-8de8-1e6adb3a38f3', 1, 1, N'Mitchell', N'Crumbley', CAST(N'2021-10-16T14:58:20.057' AS DateTime), N'44 Rainbow Road', N'Ste. 300', N'01991B', N'Montreal', N'Quebec', N'Canada', N'xdeIwgUJtDWxVM9hyr6A08cQBbn1', 1)
INSERT [dbo].[Users] ([Id], [UserType], [CustomerTier], [FirstName], [LastName], [CreatedAt], [AddressLine1], [AddressLine2], [PostalCode], [CityName], [State], [Country], [FirebaseKey], [IsAdmin]) VALUES (N'f8f520b6-a464-4aba-8d64-45c62810b526', 0, 2, N'Sean', N'Rossettie', CAST(N'2021-10-16T14:59:02.060' AS DateTime), N'55 Nile River', NULL, NULL, N'Cairo', NULL, N'Egypt', N'1HaWQTUM7OgCNiNpKrKx6vj374l1', 1)
INSERT [dbo].[Users] ([Id], [UserType], [CustomerTier], [FirstName], [LastName], [CreatedAt], [AddressLine1], [AddressLine2], [PostalCode], [CityName], [State], [Country], [FirebaseKey], [IsAdmin]) VALUES (N'e5c22e5e-6ff2-4750-9e90-a3414fda2ba0', 1, 3, N'Holly', N'Parsons', CAST(N'2021-10-16T15:00:05.577' AS DateTime), N'1114 Calvin Avenue', N'Ste. of Love', N'37206', N'Nashville', N'TN', N'USA', N'8Nvdzli40kXG5RBZutkdgchrvpl1', 1)
INSERT [dbo].[Users] ([Id], [UserType], [CustomerTier], [FirstName], [LastName], [CreatedAt], [AddressLine1], [AddressLine2], [PostalCode], [CityName], [State], [Country], [FirebaseKey], [IsAdmin]) VALUES (N'57f49c39-e844-45ad-b242-bc84315c4055', 0, 0, N'Katy', N'Fry', CAST(N'2021-10-16T14:57:39.650' AS DateTime), N'123 Alphabet Lane', NULL, N'37206', N'Nashville', N'TN', N'USA', N'COrgnCkIpyQ3oELMw9XGgPCPbEO2', 1)
ALTER TABLE [dbo].[OrderItems] ADD  CONSTRAINT [DF_OrderItems_Id]  DEFAULT (newid()) FOR [Id]
GO
ALTER TABLE [dbo].[Orders] ADD  CONSTRAINT [DF_Orders_Id]  DEFAULT (newid()) FOR [Id]
GO
ALTER TABLE [dbo].[Orders] ADD  CONSTRAINT [DF_Orders_CreatedAt]  DEFAULT (getutcdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[PaymentType] ADD  CONSTRAINT [DF_PaymentType_Id]  DEFAULT (newid()) FOR [Id]
GO
ALTER TABLE [dbo].[Products] ADD  CONSTRAINT [DF_Products_ProductId]  DEFAULT (newid()) FOR [ProductId]
GO
ALTER TABLE [dbo].[Products] ADD  CONSTRAINT [DF_Products_CreatedAt]  DEFAULT (getutcdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_Id]  DEFAULT (newid()) FOR [Id]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_CreatedAt]  DEFAULT (getutcdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[OrderItems]  WITH CHECK ADD  CONSTRAINT [FK_OrderItems_Orders] FOREIGN KEY([OrderId])
REFERENCES [dbo].[Orders] ([Id])
GO
ALTER TABLE [dbo].[OrderItems] CHECK CONSTRAINT [FK_OrderItems_Orders]
GO
ALTER TABLE [dbo].[OrderItems]  WITH CHECK ADD  CONSTRAINT [FK_OrderItems_Products1] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Products] ([ProductId])
GO
ALTER TABLE [dbo].[OrderItems] CHECK CONSTRAINT [FK_OrderItems_Products1]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Users] FOREIGN KEY([PaymentId])
REFERENCES [dbo].[PaymentType] ([Id])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Users]
GO
ALTER TABLE [dbo].[PaymentType]  WITH CHECK ADD  CONSTRAINT [FK_PaymentType_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[PaymentType] CHECK CONSTRAINT [FK_PaymentType_Users]
GO
ALTER TABLE [dbo].[Products]  WITH CHECK ADD  CONSTRAINT [FK_Products_Users1] FOREIGN KEY([MerchantId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Products] CHECK CONSTRAINT [FK_Products_Users1]
GO
USE [master]
GO
ALTER DATABASE [Scapegoat] SET  READ_WRITE 
GO
