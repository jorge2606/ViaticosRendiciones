USE [VR]
GO
/****** Object:  UserDefinedFunction [dbo].[GetAgentsSolicitationBySupervisor]    Script Date: 28/1/2019 11:37:47 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER FUNCTION [dbo].[GetAgentsSolicitationBySupervisor] 
(	
	@SupervisorId uniqueidentifier = null,
	@AgentId nvarchar(128) = null,
	@FirstName nvarchar(128) = null,
	@LastName nvarchar(128) = null,
	@Dni int = null,
	@SortBy nvarchar(128) = 'LASTNAME ASC'
)
RETURNS TABLE 
AS
RETURN 
(
	SELECT 
	SS.Id,
	FullName = U.LastName + ' ' + U.FirstName,
	SS.CreateDate,
	SS.Motive,
	Localities = SUBSTRING((SELECT ', '+ Name AS [text()]
                        FROM 
						(SELECT D.SolicitationSubsidyId,
								Name = (CASE WHEN CityId IS NOT NULL THEN (SELECT Name FROM Cities WHERE Id = D.CityID) ELSE (SELECT Name FROM Countries WHERE Id = D.CountryID) END)
							FROM dbo.Destinies D 
		                    WHERE D.SolicitationSubsidyId = SS.Id) Dest 
                        For XML PATH ('')
                        ), 2, 1000),
	SS.Total,
	[Description] = ST.Description,
	Row = ROW_NUMBER() OVER (ORDER BY         
			(CASE UPPER(@SortBy)
			    WHEN 'FIRSTNAME ASC' THEN U.FirstName
				WHEN 'LASTNAME ASC' THEN U.LastName
			END) ASC,
			(CASE UPPER(@SortBy)
				 WHEN 'FIRSTNAME DESC' THEN U.FirstName
				 WHEN 'LASTNAME DESC' THEN U.LastName
			END) DESC)
	FROM SolicitationSubsidies SS 
	INNER JOIN AspNetUsers U 
	ON U.Id = SS.UserId 
	INNER JOIN States ST 
	ON ST.Id IN (SELECT TOP 1 StateId FROM SolicitationStates WHERE SS.Id = SolicitationSubsidyId ORDER BY ChangeDate DESC ) 
	INNER JOIN SupervisorUserAgents SUA
	ON SUA.AgentId = U.Id
	WHERE (@SupervisorId = null OR SUA.SupervisorId = @SupervisorId)
		OR  (@AgentId = null OR SUA.AgentId = @AgentId)
)
