/*
 Navicat Premium Data Transfer

 Source Server         : SqlServer
 Source Server Type    : SQL Server
 Source Server Version : 14001000
 Source Host           : localhost:1433
 Source Catalog        : STARTER
 Source Schema         : dbo

 Target Server Type    : SQL Server
 Target Server Version : 14001000
 File Encoding         : 65001

 Date: 08/10/2019 19:02:41
*/


-- ----------------------------
-- Table structure for users
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[users]') AND type IN ('U'))
	DROP TABLE [dbo].[users]
GO

CREATE TABLE [dbo].[users] (
  [UserID] int  IDENTITY(1,1) NOT NULL,
  [Username] varchar(20) COLLATE Thai_CI_AS  NULL,
  [Password] varchar(max) COLLATE Thai_CI_AS  NULL,
  [Salt] varchar(max) COLLATE Thai_CI_AS  NULL,
  [FirstName] varchar(50) COLLATE Thai_CI_AS  NULL,
  [LastName] varchar(50) COLLATE Thai_CI_AS  NULL,
  [Email] varchar(50) COLLATE Thai_CI_AS  NULL,
  [Active] tinyint DEFAULT ((1)) NULL,
  [CreateDate] datetime DEFAULT (getdate()) NULL,
  [CreateBy] varchar(50) COLLATE Thai_CI_AS  NULL,
  [ModifyDate] datetime  NULL,
  [ModifyBy] varchar(50) COLLATE Thai_CI_AS  NULL
)
GO

ALTER TABLE [dbo].[users] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Records of users
-- ----------------------------
SET IDENTITY_INSERT [dbo].[users] ON
GO

INSERT INTO [dbo].[users] ([UserID], [Username], [Password], [Salt], [FirstName], [LastName], [Email], [Active], [CreateDate], [CreateBy], [ModifyDate], [ModifyBy]) VALUES (N'137', N'admin', N'$2b$10$F29Rxu1C0dWK0R4N3xR.tOrKm.N5wPPmopSnEr9l/S1amSkZlvxQq', N'$2b$10$F29Rxu1C0dWK0R4N3xR.tO', N'อานนท์', N'ประจญกล้า', N'n.arnont@gmail.com', N'1', N'1900-01-01 00:01:28.210', NULL, NULL, NULL)
GO

INSERT INTO [dbo].[users] ([UserID], [Username], [Password], [Salt], [FirstName], [LastName], [Email], [Active], [CreateDate], [CreateBy], [ModifyDate], [ModifyBy]) VALUES (N'138', N'user02', N'$2b$16$V3wFQTbOR2dnO1WeJ.5kBeTfacc4/ndrStOQgtPFnEQwR3UFEU4Qy', N'$2b$16$V3wFQTbOR2dnO1WeJ.5kBe', N'อานนท์', N'ประจญกล้า', N'n.arnont@gmail.com', N'1', N'1900-01-01 00:01:28.213', NULL, NULL, NULL)
GO

INSERT INTO [dbo].[users] ([UserID], [Username], [Password], [Salt], [FirstName], [LastName], [Email], [Active], [CreateDate], [CreateBy], [ModifyDate], [ModifyBy]) VALUES (N'139', N'user03', N'$2b$16$V3wFQTbOR2dnO1WeJ.5kBeTfacc4/ndrStOQgtPFnEQwR3UFEU4Qy', N'$2b$16$V3wFQTbOR2dnO1WeJ.5kBe', N'อานนท์', N'ประจญกล้า', N'n.arnont@gmail.com', N'1', N'1900-01-01 00:01:28.217', NULL, NULL, NULL)
GO

SET IDENTITY_INSERT [dbo].[users] OFF
GO


-- ----------------------------
-- Primary Key structure for table users
-- ----------------------------
ALTER TABLE [dbo].[users] ADD CONSTRAINT [PK__users__1788CCAC088E3273] PRIMARY KEY CLUSTERED ([UserID])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO

