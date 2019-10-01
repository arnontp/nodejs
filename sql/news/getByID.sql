SELECT n.NewsID as id,nc.Name as category, n.Cover as cover, n.Title as title,
    n.Details as detail, n.Start as start, n.Expire as expire,
    n.Seen as seen, convert(varchar, n.CreateDate, 20)  as date,
	(
		SELECT TOP 3 tag.Name + ',' AS [text()]
		FROM news_tag tag		
		WHERE tag.NewsID = n.NewsID
		ORDER BY tag.TagID
		FOR XML PATH ('')
	) as tag
FROM news n
LEFT JOIN news_category nc 
ON n.CategoryID = nc.CategoryID
Where Active = 1 AND n.NewsID = @NewsID