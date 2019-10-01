SELECT ev.EVentID as id,
ev.Title as title,
ev.Detail as detail,
convert(varchar, ev.CreateDate, 20) as date ,
ev.Type as type FROM events ev
WHERE ev.EventID = @EventID