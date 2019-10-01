SELECT ev.EventID as id, ev.Title as title,
    ev.Description as description,
    ev.Detail as detail,
    ev.Photo as photo,
    CONCAT(
        convert(varchar, ev.DateStart, 105),' ',
        convert(char(5), ev.DateStart,  108)  
    )  as start,
    CONCAT(
        convert(varchar, ev.DateExpire, 105),' ',
        convert(char(5), ev.DateExpire,  108)  
    )  as expire,
    ev.detail as detail, 
    CONCAT(
        convert(varchar, ev.CreateDate, 105),' ',
        convert(char(5), ev.CreateDate,  108)  
    ) as date,    
    ev.Location as location, 
    CONCAT(
    CASE WHEN ( @lat is null )
    THEN 0
    ELSE
       cast(
            dbo.fnCalcDistanceKM(
                ev.lat,
                @lat,
                ev.long,
                @long
            )as decimal(10,2)
        )
    END,'km') as distanct 
FROM events ev 
WHERE ev.EventID = @EventID AND ev.Active = 1
